import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    console.log("url", `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/products/${id}`)

    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/products/${id}`, {
      headers: {
        'Authorization': `JWT ${process.env.PAYLOAD_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch product')
    }

    const product = await response.json()
    console.log("Product", product)
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
} 