import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    // Build query parameters for Payload
    const queryParams = new URLSearchParams()
    // if (featured) queryParams.append('featured', featured)
    // if (category) queryParams.append('category', category)
    // if (limit) queryParams.append('limit', limit)

    const url = `${process.env.PAYLOAD_API_URL}/api/media?where[alt][equals]=flash`
    console.log(url)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const products = await response.json()
    return NextResponse.json(products)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 