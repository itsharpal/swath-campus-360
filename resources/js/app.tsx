import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import React from 'react'

createInertiaApp({
  resolve: (name: string) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true }) as Record<
      string,
      { default: React.ComponentType<any> }
    >

    return pages[`./pages/${name}.tsx`].default
  },

  setup({ el, App, props }: any) {
    createRoot(el).render(<App {...props} />)
  },
})