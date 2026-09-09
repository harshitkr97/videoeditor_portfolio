import { useEffect, useState } from 'react'
import Icon from './Icon'
import { API_BASE_URL } from '../lib/config'

export default function Contact({ designer }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status !== 'sent') return undefined
    const timer = window.setTimeout(() => setStatus('idle'), 5000)
    return () => window.clearTimeout(timer)
  }, [status])

  async function submitContactForm(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    setStatus('sending')
    setMessage('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || ''),
          email: String(form.get('email') || ''),
          details: String(form.get('details') || ''),
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(data?.error || 'Could not send your message.')
      formElement.reset()
      setStatus('sent')
      setMessage('Thanks! Your message has been sent.')
    } catch (error) {
      setStatus('error')
      setMessage(error?.message || 'Could not send your message. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-14 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Tell me about your project</h2>
            <p className="mt-3 text-sm text-white/70">Send your brief and deadline. I&apos;ll reply with pricing, timeline, and a clear deliverables list.</p>
            <div className="mt-6 space-y-3">
              <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80 transition hover:bg-black/25" href={`mailto:${designer.email}?subject=Project%20Inquiry`}>
                <span className="inline-flex items-center gap-2"><Icon name="mail" className="h-5 w-5 text-cyan-300" />{designer.email}</span>
                <Icon name="arrow" className="h-4 w-4 text-white/70" />
              </a>
              <div className="grid gap-3 sm:grid-cols-3">
                {['Instagram', 'Behance', 'YouTube'].map((label) => (
                  <a key={label} href={designer[label.toLowerCase()]} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-white/80 transition hover:bg-black/25">{label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <form className="grid gap-3" onSubmit={submitContactForm}>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block"><span className="text-xs font-medium text-white/70">Your name</span><input name="name" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/60" placeholder="Full name" /></label>
                <label className="block"><span className="text-xs font-medium text-white/70">Email</span><input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/60" placeholder="you@example.com" /></label>
              </div>
              <label className="block"><span className="text-xs font-medium text-white/70">Project details</span><textarea name="details" rows={6} required className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/60" placeholder="What do you need? (reel edit, poster set, thumbnails...) Include deadline + references." /></label>
              <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                {status === 'sending' ? 'Sending...' : 'Send message'} <Icon name="arrow" className="h-4 w-4" />
              </button>
              {status === 'error' ? <p className="text-xs text-red-300">{message}</p> : <p className="text-xs text-white/55">Your details will be sent directly and will not open an email app.</p>}
            </form>
          </div>
        </div>
      </div>
      {status === 'sent' ? (
        <div role="status" className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-300/30 bg-emerald-950 px-5 py-4 text-sm font-medium text-emerald-50 shadow-2xl shadow-black/40">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 font-bold text-emerald-950">✓</span>
          <span>Thank you! Your details were submitted successfully.</span>
        </div>
      ) : null}
    </section>
  )
}
