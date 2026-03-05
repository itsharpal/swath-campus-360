import { useForm } from '@inertiajs/react'

type Role = {
  id: number
  name: string
}

type Props = {
  roles: Role[]
  user?: any
  submitUrl: string
  method?: 'post' | 'put'
}

export default function UserForm({ roles, user, submitUrl, method = 'post' }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    roleId: user?.roleId || '',
    phone: user?.phone || '',
    isActive: user?.isActive ?? true,
  })

  function submit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (method === 'put') {
      put(submitUrl)
    } else {
      post(submitUrl)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          className="input"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          className="input"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          className="input"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label>Role</label>
        <select value={data.roleId} onChange={(e) => setData('roleId', Number(e.target.value))}>
          <option value="">Select role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Phone</label>
        <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={data.isActive}
            onChange={(e) => setData('isActive', e.target.checked)}
          />
          Active
        </label>
      </div>

      <button disabled={processing} className="btn-primary">
        Save User
      </button>
    </form>
  )
}
