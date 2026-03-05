import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'

type User = {
  id: number
  name: string
  email: string
  phone: string | null
  isActive: boolean
  role: { id: number; name: string }
}

export type Props = {
  users: {
    data: User[]
    meta: any
  }
}

export default function UsersIndex({
  users,
}: {
  users: {
    data: User[]
    meta: any
  }
}) {
  function deleteUser(id: number) {
    if (confirm('Deactivate this user?')) {
      router.delete(`/admin/users/${id}`)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Users</h1>

        <Link href="/admin/users/create" className="btn-primary">
          Create User
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.data.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role?.name}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>

              <td className="space-x-2">
                <Link href={`/admin/users/${user.id}`}>View</Link>

                <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>

                <button onClick={() => deleteUser(user.id)} className="text-red-500">
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
