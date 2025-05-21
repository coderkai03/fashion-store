declare global {
  interface ImageUpload {
    url: string
    alt: string
    createdAt: string
    updatedAt: string
    filename: string
    mimeType: string
    filesize: number
    width: number
    height: number
    focalX: number
    focalY: number
    
  }
  interface Product {
    id: string
    name: string
    description: string
    price: number
    images: { upload: ImageUpload }[]
    tags?: { tag: string }[]
    details?: string
    featured?: boolean
    category?: string
  }

  interface ProductQueryParams {
    featured?: boolean
    category?: string
    limit?: number
  }

  interface ProductResponse {
    docs: Product[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
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
