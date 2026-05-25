import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const EMBED_COLOR = 15210796

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { user_id, question, discord_thread_id, user_email } = body

  if (!user_id || !question?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data: inserted, error: dbError } = await supabase
    .from('questions')
    .insert({ user_id, question: question.trim() })
    .select()
    .single()

  if (dbError) {
    console.error('[questions] db error:', dbError.message)
    return NextResponse.json({ error: 'Failed to save your question. Please try again.' }, { status: 500 })
  }

  // Discord webhook (non-fatal)
  let webhookUrl = process.env.DISCORD_QA_WEBHOOK_URL
  if (webhookUrl) {
    if (discord_thread_id) {
      webhookUrl = `${webhookUrl}?thread_id=${discord_thread_id}`
    }
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: 'New Driver Question',
            color: EMBED_COLOR,
            fields: [
              { name: 'From', value: user_email || user_id, inline: true },
              { name: 'Question', value: question.trim() },
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'DTS Academy' },
          }],
        }),
      })
      if (!webhookRes.ok) {
        console.error('[questions] discord webhook failed:', webhookRes.status)
      }
    } catch (err) {
      console.error('[questions] discord webhook error:', err.message)
    }
  }

  return NextResponse.json({ ok: true, question: inserted })
}
