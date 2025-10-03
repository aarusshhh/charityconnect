import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm relative',
        className,
      )}
      {...props}
    >
      {/* Animated circles with adjusted z-index and opacity */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-3xl animate-pulse z-[-1] opacity-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl animate-pulse delay-1000 z-[-1] opacity-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-3xl animate-pulse delay-2000 z-[-1] opacity-10" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-gradient-to-r from-lime-500 to-green-500 rounded-full blur-3xl animate-pulse delay-500 z-[-1] opacity-10" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-3xl animate-pulse delay-1500 z-[-1] opacity-10" />
      
      {props.children}
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
