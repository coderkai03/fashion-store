import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${process.env.PAYLOAD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to add product')
    }

    const newProduct = await response.json()
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
} 