import React, { useState } from 'react'
import Header from '../components/Header'

const Home = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'Editor' },
    { id: 3, name: 'Mark Johnson', role: 'Viewer' },
  ]);

  const handleUpdate = (id) => {
    // Handle update logic here (e.g., show modal with user data to edit)
    alert(`Update user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    alert(`Deleted user with ID: ${id}`);
  };

  return (
    <div>
      <Header />
      <div className='mt-12 px-12'>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto hidden md:table">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{user.role}</td>
                <td className="px-4 py-2 text-sm text-gray-900 space-x-2">
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive Layout */}
        <div className="md:hidden">
          {users.map(user => (
            <div key={user.id} className="border-b p-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Name:</span>
                <span className="text-gray-800">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Role:</span>
                <span className="text-gray-800">{user.role}</span>
              </div>
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => handleUpdate(user.id)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home