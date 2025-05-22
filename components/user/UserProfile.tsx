import { useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser'

interface UserProfileProps {
  id: string
}

export function UserProfile({ id }: UserProfileProps) {
  const { 
    data: user, 
    loading, 
    error, 
    getUser, 
    // updateUser 
  } = useUser()

  useEffect(() => {
    getUser(id)
  }, [getUser, id])

  // const handleUpdate = async (userData: Partial<User>) => {
  //   try {
  //     await updateUser(id, userData)
  //     // You might want to show a success message here
  //   } catch (error) {
  //     // Handle error appropriately
  //     console.error('Failed to update user:', error)
  //   }
  // }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        {/* Add more user details and edit functionality as needed */}
      </div>
    </div>
  )
} 