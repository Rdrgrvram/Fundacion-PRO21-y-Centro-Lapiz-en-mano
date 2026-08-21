import { EXTENDED_PALETTE } from '@/lib/palette'
import type { Testimonial } from '@/lib/content'

// Testimonio de una familia del programa, entre los pasos de inscripción y el
// CTA final — refuerza confianza justo antes de pedir el contacto.
export default function ProgramTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const style = EXTENDED_PALETTE[testimonial.color]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`max-w-2xl mx-auto text-center bg-gray-50 rounded-3xl p-8 md:p-10 border-t-4 ${style.border}`}>
          <div className={`w-14 h-14 ${style.bg} rounded-full flex items-center justify-center text-3xl mx-auto mb-5`}>
            {testimonial.icon}
          </div>
          <p className="text-gray-700 text-lg leading-relaxed italic mb-5">&ldquo;{testimonial.body}&rdquo;</p>
          <span className={`font-bold ${style.text}`}>{testimonial.family}</span>
        </div>
      </div>
    </section>
  )
}
