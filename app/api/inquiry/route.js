import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// #E8192C in decimal
const EMBED_COLOR = 15210796

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { user_id, email, discord_handle, improve, goals, experience, car_series } = body

  if (!user_id || !improve?.trim() || !goals?.trim() || !experience?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // --- Supabase insert ---
  const { error: dbError } = await supabase.from('inquiries').insert({
    user_id,
    email: email ?? null,
    discord_handle: discord_handle ?? null,
    improve: improve.trim(),
    goals: goals.trim(),
    experience: experience.trim(),
    car_series: car_series?.trim() || null,
  })

  if (dbError) {
    console.error('[inquiry] db error:', dbError.message)
    return NextResponse.json({ error: 'Failed to save your application. Please try again.' }, { status: 500 })
  }

  // --- Discord webhook (non-fatal) ---
  let discordFailed = false
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (webhookUrl) {
    try {
      const fields = [
        { name: 'Discord', value: discord_handle || 'Unknown', inline: true },
        { name: 'Email', value: email || 'Unknown', inline: true },
        { name: 'What to improve', value: improve.trim() },
        { name: 'Goals', value: goals.trim() },
        { name: 'Experience', value: experience.trim() },
      ]
      if (car_series?.trim()) {
        fields.push({ name: 'Car / Series', value: car_series.trim() })
      }

      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: 'New Coaching Inquiry',
            color: EMBED_COLOR,
            fields,
            timestamp: new Date().toISOString(),
            footer: { text: 'DTS Academy' },
          }],
        }),
      })

      if (!webhookRes.ok) {
        console.error('[inquiry] discord webhook failed:', webhookRes.status)
        discordFailed = true
      }
    } catch (err) {
      console.error('[inquiry] discord webhook error:', err.message)
      discordFailed = true
    }
  }

  return NextResponse.json({ ok: true, ...(discordFailed && { warning: 'Saved, but Discord notification failed.' }) })
}
