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
    'analytics/buildings': ExtractProps<(typeof import('../../inertia/pages/analytics/buildings.tsx'))['default']>
    'analytics/categories': ExtractProps<(typeof import('../../inertia/pages/analytics/categories.tsx'))['default']>
    'analytics/heatmap': ExtractProps<(typeof import('../../inertia/pages/analytics/heatmap.tsx'))['default']>
    'analytics/peak_hours': ExtractProps<(typeof import('../../inertia/pages/analytics/peak_hours.tsx'))['default']>
    'analytics/supervisors': ExtractProps<(typeof import('../../inertia/pages/analytics/supervisors.tsx'))['default']>
    'analytics/trends': ExtractProps<(typeof import('../../inertia/pages/analytics/trends.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/register': ExtractProps<(typeof import('../../inertia/pages/auth/register.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'buildings/create': ExtractProps<(typeof import('../../inertia/pages/buildings/create.tsx'))['default']>
    'buildings/dashboard': ExtractProps<(typeof import('../../inertia/pages/buildings/dashboard.tsx'))['default']>
    'buildings/edit': ExtractProps<(typeof import('../../inertia/pages/buildings/edit.tsx'))['default']>
    'buildings/floors': ExtractProps<(typeof import('../../inertia/pages/buildings/floors.tsx'))['default']>
    'buildings/index': ExtractProps<(typeof import('../../inertia/pages/buildings/index.tsx'))['default']>
    'buildings/show': ExtractProps<(typeof import('../../inertia/pages/buildings/show.tsx'))['default']>
    'complaints/create': ExtractProps<(typeof import('../../inertia/pages/complaints/create.tsx'))['default']>
    'complaints/index': ExtractProps<(typeof import('../../inertia/pages/complaints/index.tsx'))['default']>
    'complaints/my': ExtractProps<(typeof import('../../inertia/pages/complaints/my.tsx'))['default']>
    'complaints/resolve': ExtractProps<(typeof import('../../inertia/pages/complaints/resolve.tsx'))['default']>
    'complaints/show': ExtractProps<(typeof import('../../inertia/pages/complaints/show.tsx'))['default']>
    'complaints/track': ExtractProps<(typeof import('../../inertia/pages/complaints/track.tsx'))['default']>
    'dashboard/admin': ExtractProps<(typeof import('../../inertia/pages/dashboard/admin.tsx'))['default']>
    'dashboard/supervisor': ExtractProps<(typeof import('../../inertia/pages/dashboard/supervisor.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'floors/create': ExtractProps<(typeof import('../../inertia/pages/floors/create.tsx'))['default']>
    'floors/edit': ExtractProps<(typeof import('../../inertia/pages/floors/edit.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'job_card/index': ExtractProps<(typeof import('../../inertia/pages/job_card/index.tsx'))['default']>
    'job_card/show': ExtractProps<(typeof import('../../inertia/pages/job_card/show.tsx'))['default']>
    'job_card/zone_history': ExtractProps<(typeof import('../../inertia/pages/job_card/zone_history.tsx'))['default']>
    'profile/show': ExtractProps<(typeof import('../../inertia/pages/profile/show.tsx'))['default']>
    'zones/create': ExtractProps<(typeof import('../../inertia/pages/zones/create.tsx'))['default']>
    'zones/edit': ExtractProps<(typeof import('../../inertia/pages/zones/edit.tsx'))['default']>
    'zones/index': ExtractProps<(typeof import('../../inertia/pages/zones/index.tsx'))['default']>
    'zones/show': ExtractProps<(typeof import('../../inertia/pages/zones/show.tsx'))['default']>
  }
}
