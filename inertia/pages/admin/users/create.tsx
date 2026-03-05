import UserForm from './components/user_form'

type Role = {
  id: number
  name: string
}

export type Props = {
  roles: Role[]
}

export default function CreateUser({ roles }: { roles: Role[] }) {

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">
        Create User
      </h1>

      <UserForm
        roles={roles}
        submitUrl="/admin/users"
      />

    </div>
  )
}
