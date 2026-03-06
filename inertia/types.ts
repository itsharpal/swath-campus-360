import { type Data } from '@generated/data'
import { type PropsWithChildren } from 'react'
import { type JSONDataTypes } from '@adonisjs/core/types/transformers'

export type InertiaProps<T extends JSONDataTypes = {}> = PropsWithChildren<Data.SharedProps & T>

import '@adonisjs/inertia/types'

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    [key: string]: any
  }
}
