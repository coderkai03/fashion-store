import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    // Build query parameters for Payload
    const queryParams = new URLSearchParams()
    if (featured) queryParams.append('where[featured][equals]', featured)
    if (category) queryParams.append('where[category][equals]', category)
    if (limit) queryParams.append('limit', limit)

    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/products?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const productResponse = await response.json() as ProductResponse
    return NextResponse.json(productResponse)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 