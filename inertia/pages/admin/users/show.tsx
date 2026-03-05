import { Link } from '@adonisjs/inertia/react'

type Role = {
  id: number
  name: string
}

type User = {
  id: number
  name: string
  email: string
  phone: string | null
  isActive: boolean
  role: Role
}

export type Props = {
  user: User
}

export default function ShowUser({ user }: { user: User }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Details</h1>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role?.name}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <p>
          <strong>Status:</strong>
          {user.isActive ? 'Active' : 'Inactive'}
        </p>
      </div>

      <Link href={`/admin/users/${user.id}/edit`} className="btn-primary mt-4 inline-block">
        Edit User
      </Link>
    </div>
  )
}
