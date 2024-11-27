import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Using react-router-dom for navigation

const UnAuthorized = () => {
    const navigate = useNavigate();
    // const goback = () => {
    //     navigate(-1);
    // }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-6xl font-extrabold text-red-600">401</h1>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">UnAuthorized</h2>
                <p className="mt-2 text-lg text-gray-600">
                    Sorry, you don't have permission to access this page.
                </p>
                <Link
                    to="/"
                    className="mt-6 text-indigo-600 cursor-pointer hover:text-indigo-500 text-lg font-medium">
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default UnAuthorized;
