'use client'

import { useState, useCallback } from 'react'

interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

interface ApiOptions {
  onSuccess?: (data: unknown) => void
  onError?: (error: string) => void
}

export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  })

  const execute = useCallback(async (
    url: string,
    options: RequestInit = {},
    apiOptions: ApiOptions = {}
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setState({ data, error: null, loading: false })
      apiOptions.onSuccess?.(data)
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setState({ data: null, error: errorMessage, loading: false })
      apiOptions.onError?.(errorMessage)
      throw error
    }
  }, [])

  return {
    ...state,
    execute,
  }
} 