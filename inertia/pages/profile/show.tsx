interface Profile {
  id: number
  name: string
  email: string
  phone?: string | null
  role: string
  emailVerifiedAt?: string | null
  createdAt: string
}

interface Props {
  profile: Profile
}

export default function ProfileShow({ profile }: Props) {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded p-5 space-y-3">
        <p>
          <b>Name:</b> {profile.name}
        </p>
        <p>
          <b>Email:</b> {profile.email}
        </p>
        <p>
          <b>Phone:</b> {profile.phone ?? '-'}
        </p>
        <p className="capitalize">
          <b>Role:</b> {profile.role}
        </p>
        <p>
          <b>Email Verified:</b> {profile.emailVerifiedAt ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  )
}
