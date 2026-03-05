import { Form } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { Data } from '@generated/data'

export default function Login() {
  const page = usePage<Data.SharedProps>()
  const flashError = page.props.flash?.error as string | undefined
  const flashSuccess = page.props.flash?.success as string | undefined
  const verificationLink = page.props.flash?.verificationLink as string | undefined

  return (
    <div className="form-container">
      <div>
        <h1> Login </h1>
        <p>Enter your details below to login to your account</p>
      </div>

      <div>
        <Form route="auth.login">
          {({ errors }) => (
            <>
              {flashSuccess && <p className="text-green-600">{flashSuccess}</p>}
              {flashError && <p className="text-red-500">{flashError}</p>}
              {verificationLink && (
                <p>
                  <a className="text-blue-600 underline" href={verificationLink}>
                    Verify your email
                  </a>
                </p>
              )}

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="username"
                  data-invalid={errors.email ? 'true' : undefined}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>

              <div>
                <button type="submit" className="button">
                  Login
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
