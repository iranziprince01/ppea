'use client'

import { useState } from 'react'

interface AuthorImageProps {
  src: string
  alt: string
  name: string
}

export default function AuthorImage({ src, alt, name }: AuthorImageProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-primary-600 text-xl font-bold">
          {name ? name.split(' ').map((n: string) => n[0]).join('') : 'A'}
        </span>
      )}
    </div>
  )
}
