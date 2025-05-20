import { useCallback } from 'react'
import { useApi } from './useApi'

interface User {
  id: string
  email: string
  name: string
  // Add other user fields as needed
}

export function useUser() {
  const api = useApi<User>()

  const getUser = useCallback(async (id: string) => {
    return api.execute(`/api/user/${id}`)
  }, [api])

  const updateUser = useCallback(async (id: string, userData: Partial<User>) => {
    return api.execute(`/api/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }, [api])

  return {
    ...api,
    getUser,
    updateUser,
  }
} 