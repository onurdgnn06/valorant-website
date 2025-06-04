import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Image
        src="/logo.png"
        alt="ValorantPro Logo"
        width={64}
        height={64}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}