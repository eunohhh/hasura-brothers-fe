import '@testing-library/jest-dom'

import { afterEach, beforeAll, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: vi.fn(() => 'mock-object-url')
})

Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: vi.fn()
})

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
})
afterAll(() => server.close());