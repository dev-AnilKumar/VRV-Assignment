import React from 'react'

const Super_Admin = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        <h1 className="text-gray-900 text-3xl sm:text-4xl font-semibold">
          Welcome Super Admin
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          This is a page designed specially for Super Admin. Unaccessible for Others.
        </p>
      </div>
    </div>
  )
}

export default Super_Admin