import Badge from '@/components/ui/Badge'

interface TestimonialProps {
  family: string
  program: string
  body: string
}

export default function Testimonial({ family, program, body }: TestimonialProps) {
  return (
    <blockquote className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <p className="text-gray-700 italic leading-relaxed">"{body}"</p>
      <footer className="flex items-center justify-between mt-auto">
        <span className="font-semibold text-gray-900">{family}</span>
        <Badge color="primary">{program}</Badge>
      </footer>
    </blockquote>
  )
}
