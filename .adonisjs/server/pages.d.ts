import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/register': ExtractProps<(typeof import('../../inertia/pages/auth/register.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'buildings/create': ExtractProps<(typeof import('../../inertia/pages/buildings/create.tsx'))['default']>
    'buildings/dashboard': ExtractProps<(typeof import('../../inertia/pages/buildings/dashboard.tsx'))['default']>
    'buildings/edit': ExtractProps<(typeof import('../../inertia/pages/buildings/edit.tsx'))['default']>
    'buildings/floors': ExtractProps<(typeof import('../../inertia/pages/buildings/floors.tsx'))['default']>
    'buildings/index': ExtractProps<(typeof import('../../inertia/pages/buildings/index.tsx'))['default']>
    'buildings/show': ExtractProps<(typeof import('../../inertia/pages/buildings/show.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'floors/create': ExtractProps<(typeof import('../../inertia/pages/floors/create.tsx'))['default']>
    'floors/edit': ExtractProps<(typeof import('../../inertia/pages/floors/edit.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
  }
}
