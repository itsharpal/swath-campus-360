import { useForm } from '@inertiajs/react'

type Role = {
  id: number
  name: string
}

type Props = {
  roles: Role[]
}

export default function Register({ roles }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
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

        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => setData('phone', e.target.value)}
          className="border p-2 w-full"
        />

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

        <button type="submit" disabled={processing} className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>

        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </form>
    </div>
  )
}
