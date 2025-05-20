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

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  variant?: string
}

interface Cart {
  id: string
  items: CartItem[]
}

interface ProductQueryParams {
  featured?: boolean
  category?: string
  limit?: number
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    description: "A comfortable and versatile t-shirt made from premium cotton.",
    price: 29.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Classic Cotton T-Shirt" }],
    tags: ["Cotton", "Casual", "Essentials"],
    featured: true,
    category: "shirts",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a comfortable stretch fabric.",
    price: 59.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Slim Fit Jeans" }],
    tags: ["Denim", "Slim Fit"],
    category: "pants",
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    description: "A lightweight floral dress perfect for summer days.",
    price: 79.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Floral Summer Dress" }],
    tags: ["Summer", "Floral"],
    featured: true,
    category: "dresses",
  },
  {
    id: "4",
    name: "Leather Belt",
    description: "A classic leather belt with a metal buckle.",
    price: 39.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Leather Belt" }],
    tags: ["Leather", "Accessories"],
    category: "accessories",
  },
  {
    id: "5",
    name: "Wool Sweater",
    description: "A warm and cozy wool sweater for colder days.",
    price: 89.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Wool Sweater" }],
    tags: ["Wool", "Winter"],
    category: "shirts",
  },
  {
    id: "6",
    name: "Canvas Sneakers",
    description: "Casual canvas sneakers for everyday wear.",
    price: 49.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Canvas Sneakers" }],
    tags: ["Shoes", "Casual"],
    featured: true,
    category: "accessories",
  },
  {
    id: "7",
    name: "Silk Scarf",
    description: "An elegant silk scarf with a colorful pattern.",
    price: 34.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Silk Scarf" }],
    tags: ["Silk", "Accessories"],
    category: "accessories",
  },
  {
    id: "8",
    name: "Cargo Pants",
    description: "Functional cargo pants with multiple pockets.",
    price: 69.99,
    images: [{ url: "/placeholder.svg?height=600&width=600", alt: "Cargo Pants" }],
    tags: ["Casual", "Functional"],
    category: "pants",
  },
]

const mockCart: Cart = {
  id: "cart1",
  items: [
    {
      id: "item1",
      productId: "1",
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=600&width=600",
      variant: "Size: M, Color: White",
    },
    {
      id: "item2",
      productId: "4",
      name: "Leather Belt",
      price: 39.99,
      quantity: 1,
      image: "/placeholder.svg?height=600&width=600",
      variant: "Size: 32, Color: Brown",
    },
  ],
}

// In a real application, these functions would make API calls to Payload CMS
export async function getProducts({ featured, category, limit }: ProductQueryParams = {}): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProducts = [...mockProducts]

  if (featured !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.featured === featured)
  }

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit)
  }

  return filteredProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = mockProducts.find((p) => p.id === id)
  return product || null
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const currentProduct = mockProducts.find((p) => p.id === productId)
  if (!currentProduct) return []

  // Find products in the same category
  const relatedProducts = mockProducts
    .filter((p) => p.id !== productId && p.category === currentProduct.category)
    .slice(0, limit)

  // If we don't have enough related products, add some featured ones
  if (relatedProducts.length < limit) {
    const featuredProducts = mockProducts
      .filter((p) => p.id !== productId && p.featured && !relatedProducts.includes(p))
      .slice(0, limit - relatedProducts.length)

    return [...relatedProducts, ...featuredProducts]
  }

  return relatedProducts
}

export async function getCart(): Promise<Cart> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockCart
}
