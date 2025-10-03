import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  const [colors, setColors] = React.useState<string[]>([])

  React.useEffect(() => {
    const generateRandomColor = () => {
      const hue = Math.floor(Math.random() * 360)
      const saturation = 60 + Math.floor(Math.random() * 30)
      const lightness = 50 + Math.floor(Math.random() * 20)
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const generateGradient = () => {
      const color1 = generateRandomColor()
      const color2 = generateRandomColor()
      return `linear-gradient(to right, ${color1}, ${color2})`
    }

    setColors([
      generateGradient(),
      generateGradient(),
      generateGradient()
    ])
  }, [])

  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm relative overflow-hidden',
        className,
      )}
      {...props}
    >
      <div 
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse" 
        style={{ background: colors[0] || 'transparent' }}
      />
      <div 
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" 
        style={{ background: colors[1] || 'transparent', animationDelay: '1s' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse" 
        style={{ background: colors[2] || 'transparent', animationDelay: '2s' }}
      />
      
      <div className="relative z-10">
        {props.children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
