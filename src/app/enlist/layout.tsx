import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Enlist | Wolfpack Defence',
  description: 'Join the Wolfpack or log in to your account.',
}

export default function EnlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen relative">
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          Wolfpack Defence
        </Link>
      </div>
      <div className="flex items-center justify-center py-12 px-4 lg:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="https://utfs.io/f/209a0d33-d84b-46a2-93f5-23b52157f0f3-blada4.jpg"
          alt="Tactical gear background"
          layout="fill"
          objectFit="cover"
          className="dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}