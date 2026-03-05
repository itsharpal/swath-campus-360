import { useForm } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { Data } from '@generated/data'

type Role = {
  id: number
  name: string
}

type Props = {
  roles: Role[]
}

export default function Register({ roles }: Props) {
  const page = usePage<Data.SharedProps>()
  const flashError = page.props.flash?.error as string | undefined
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    roleId: '',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/register')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-96 space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        {flashError && <p className="text-red-500">{flashError}</p>}

        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={data.passwordConfirmation}
          onChange={(e) => setData('passwordConfirmation', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.passwordConfirmation && (
          <p className="text-red-500">{errors.passwordConfirmation}</p>
        )}

        <input
          type="text"
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => setData('phone', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <select
          value={data.roleId}
          onChange={(e) => setData('roleId', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Role</option>

          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && <p className="text-red-500">{errors.roleId}</p>}

        <button type="submit" disabled={processing} className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>

      </form>
    </div>
  )
}
