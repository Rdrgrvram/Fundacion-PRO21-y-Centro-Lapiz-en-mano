import Image from 'next/image'

interface TeamMemberProps {
  name: string
  role: string
  specialty: string
  bio: string
  photo?: string
}

export default function TeamMember({ name, role, specialty, bio, photo }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
        {photo ? (
          <Image src={photo} alt={`Foto de ${name}`} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400">👤</div>
        )}
      </div>
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-primary text-sm font-medium">{role}</p>
      <p className="text-gray-500 text-xs mt-1">{specialty}</p>
      <p className="text-gray-600 text-sm mt-3">{bio}</p>
    </div>
  )
}
