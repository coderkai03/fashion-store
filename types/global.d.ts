declare global {
  interface Product {
    id: string
    name: string
    description: string
    price: number
    images: { url: string; alt: string }[]
    tags?: string[]
    details?: string
    featured?: boolean
    category?: string
  }

  interface ProductQueryParams {
    featured?: boolean
    category?: string
    limit?: number
  }

  interface User {
    id: string
    email: string
    name: string
    // Add other user fields as needed
  }
}

// This export is needed to make the file a module
export {}
