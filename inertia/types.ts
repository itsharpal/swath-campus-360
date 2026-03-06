import { type Data } from '@generated/data'
import { type PropsWithChildren } from 'react'
import { type JSONDataTypes } from '@adonisjs/core/types/transformers'

export type InertiaProps<T extends JSONDataTypes = {}> = PropsWithChildren<Data.SharedProps & T>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'home': {}

    'buildings/index': {
      buildings: any
    }

    'buildings/create': {}

    'buildings/show': {
      building: any
    }

    'buildings/edit': {
      building: any
    }

    'buildings/dashboard': {
      building: any
      stats: any
    }
  }
}
