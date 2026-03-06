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
    'admin/users/components/user_form': ExtractProps<(typeof import('../../inertia/pages/admin/users/components/user_form.tsx'))['default']>
    'admin/users/create': ExtractProps<(typeof import('../../inertia/pages/admin/users/create.tsx'))['default']>
    'admin/users/edit': ExtractProps<(typeof import('../../inertia/pages/admin/users/edit.tsx'))['default']>
    'admin/users/index': ExtractProps<(typeof import('../../inertia/pages/admin/users/index.tsx'))['default']>
    'admin/users/show': ExtractProps<(typeof import('../../inertia/pages/admin/users/show.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/register': ExtractProps<(typeof import('../../inertia/pages/auth/register.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'complaints/create': ExtractProps<(typeof import('../../inertia/pages/complaints/create.tsx'))['default']>
    'complaints/index': ExtractProps<(typeof import('../../inertia/pages/complaints/index.tsx'))['default']>
    'complaints/my': ExtractProps<(typeof import('../../inertia/pages/complaints/my.tsx'))['default']>
    'complaints/resolve': ExtractProps<(typeof import('../../inertia/pages/complaints/resolve.tsx'))['default']>
    'complaints/show': ExtractProps<(typeof import('../../inertia/pages/complaints/show.tsx'))['default']>
    'complaints/track': ExtractProps<(typeof import('../../inertia/pages/complaints/track.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'job_card/index': ExtractProps<(typeof import('../../inertia/pages/job_card/index.tsx'))['default']>
    'job_card/show': ExtractProps<(typeof import('../../inertia/pages/job_card/show.tsx'))['default']>
    'job_card/zone_history': ExtractProps<(typeof import('../../inertia/pages/job_card/zone_history.tsx'))['default']>
  }
}
