import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean
  as?: 'button' | 'a'
  loading?: boolean
  disabled?: boolean
}

type ButtonAsButtonProps = ButtonBaseProps &
  React.ComponentProps<'button'> & {
    as?: 'button'
  }

type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, 'as'> & {
    as: 'a'
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

function Button({
  className,
  variant,
  size,
  asChild = false,
  as = 'button',
  loading = false,
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : as === 'a' ? Link : as
  const isDisabled = Boolean(disabled) || loading
  const isAnchor = !asChild && as === 'a'

  return (
    <Comp
      data-slot="button"
      aria-busy={loading || undefined}
      aria-disabled={isAnchor && isDisabled ? true : undefined}
      tabIndex={isAnchor && isDisabled ? -1 : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      onClick={
        isAnchor && isDisabled
          ? (event: React.MouseEvent) => {
              event.preventDefault()
              event.stopPropagation()
            }
          : onClick
      }
      disabled={asChild || as === 'button' ? isDisabled : undefined}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
