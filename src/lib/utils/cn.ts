/**
 * Merges class names. Drop-in for clsx/tailwind-merge.
 * Install `clsx` + `tailwind-merge` and swap out if you want full merge semantics:
 *
 *   import { clsx, type ClassValue } from 'clsx'
 *   import { twMerge } from 'tailwind-merge'
 *   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
