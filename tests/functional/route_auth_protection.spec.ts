import { test } from '@japa/runner'

function appBaseUrl() {
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || '3333'
  return `http://${host}:${port}`
}

test.group('Route auth protection', () => {
  test('redirects guest from admin users index', async ({ assert }) => {
    const response = await fetch(`${appBaseUrl()}/admin/users`, { redirect: 'manual' })

    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), '/login')
  })

  test('redirects guest from complaints my', async ({ assert }) => {
    const response = await fetch(`${appBaseUrl()}/complaints/my`, { redirect: 'manual' })

    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), '/login')
  })

  test('redirects guest from job cards index', async ({ assert }) => {
    const response = await fetch(`${appBaseUrl()}/job-cards`, { redirect: 'manual' })

    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), '/login')
  })

  test('redirects guest from analytics buildings', async ({ assert }) => {
    const response = await fetch(`${appBaseUrl()}/analytics/buildings`, { redirect: 'manual' })

    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), '/login')
  })
})
