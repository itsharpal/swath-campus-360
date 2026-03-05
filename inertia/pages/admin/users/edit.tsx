import UserForm from './components/user_form'

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
  roleId: number
  role: Role
}

export type Props = {
  user: User
  roles: Role[]
}

export default function EditUser({
  user,
  roles,
}: {
  user: User
  roles: Role[]
}) {

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">
        Edit User
      </h1>

      <UserForm
        user={user}
        roles={roles}
        submitUrl={`/admin/users/${user.id}`}
        method="put"
      />

    </div>
  )
}
