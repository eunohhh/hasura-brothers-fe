import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('*/api/auth/user*', () => {
    return HttpResponse.json({
      id: "mock-user-id",
      email: "mock-email",
      name: "mock-name",
      profile_image: "mock-profile-image",
      provider: "mock-provider",
      provider_id: "mock-provider-id",
      accept_marketing: true,
      created_at: "mock-created-at",
      updated_at: "mock-updated-at",
      is_admin: true,
    })
  }),
]