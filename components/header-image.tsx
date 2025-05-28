"use client"

import Image from "next/image"
import { useState } from "react"

export function HeaderImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  const [error, setError] = useState(false)

  return (
    <>
      {error ? (
        <div className="flex items-center justify-center bg-[#121212] text-[#D4AF37] w-full h-full">
          {alt.charAt(0)}
        </div>
      ) : (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </>
  )
}
