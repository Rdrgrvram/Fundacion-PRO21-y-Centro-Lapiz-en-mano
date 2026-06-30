'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const PROGRAMS = ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes', 'Información general']

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-2xl mb-2">✅</p>
        <p className="font-semibold text-green-800">¡Mensaje enviado! Nos comunicaremos pronto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name" type="text" placeholder="Tu nombre *" required value={form.name} onChange={handleChange}
          className="input"
        />
        <input
          name="email" type="email" placeholder="Correo electrónico *" required value={form.email} onChange={handleChange}
          className="input"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="phone" type="tel" placeholder="Teléfono / WhatsApp" value={form.phone} onChange={handleChange}
          className="input"
        />
        <select name="program" value={form.program} onChange={handleChange} className="input">
          <option value="">Programa de interés</option>
          {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <textarea
        name="message" placeholder="Tu mensaje *" required rows={5} value={form.message} onChange={handleChange}
        className="input resize-none"
      />
      {status === 'error' && (
        <p className="text-red-600 text-sm">Hubo un error. Por favor intenta de nuevo o contáctanos por WhatsApp.</p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  )
}
