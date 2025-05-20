import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${process.env.PAYLOAD_API_URL}/api/users/${params.id}`, {
      headers: {
        'Authorization': `JWT ${process.env.PAYLOAD_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch user')
    }

    const user = await response.json()
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const response = await fetch(`${process.env.PAYLOAD_API_URL}/api/users/${params.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${process.env.PAYLOAD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to update user')
    }

    const updatedUser = await response.json()
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
} 