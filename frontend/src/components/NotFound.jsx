import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const goback = () => {
        navigate(-1);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">Page Not Found</h2>
                <p className="mt-2 text-lg text-gray-600">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <div
                onClick={goback}
                    className="mt-3 text-indigo-600 cursor-pointer hover:text-indigo-500 text-lg font-medium">
                    Go back
                </div>
            </div>
        </div>
    );
};

export default NotFound;
