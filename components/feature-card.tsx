import { Zap, Shield, RefreshCw, Headphones } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "zap":
        return <Zap className="h-8 w-8 text-[hsl(var(--primary))]" />
      case "shield":
        return <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
      case "refresh-cw":
        return <RefreshCw className="h-8 w-8 text-[hsl(var(--primary))]" />
      case "headphones":
        return <Headphones className="h-8 w-8 text-[hsl(var(--primary))]" />
      default:
        return <Zap className="h-8 w-8 text-[hsl(var(--primary))]" />
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 text-center group transition-all duration-300">
      <div className="mb-6 flex justify-center">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary)/0.8)]/20 group-hover:from-[hsl(var(--primary))]/30 group-hover:to-[hsl(var(--primary)/0.8)]/30 transition-all duration-300">
          {getIcon()}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 heading-premium">{title}</h3>
      <p className="text-premium">{description}</p>
    </div>
  )
}
