import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authSlice';
import axios from '../api/axios';

const UpdateForm = ({ show, setShow, user }) => {
    const dispatch = useDispatch();
    const userd = useSelector(state => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [formData, setFormData] = useState({ _id: "", name: '', role: '' });
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({ _id: user._id, name: user.name, role: user.role });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError('Name is required');
        } else {
            const update = async () => {
                try {
                    const { data } = await axios.put(`/${formData._id}`, formData, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }, {
                        withCredentials: true
                    })
                    if (data.success) {
                        dispatch(updateUser(formData));
                        setShow(!show);
                    }
                } catch (error) {
                    console.log(error)
                }
            };
            update();
        }

    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter user's name"
                            required
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="user">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Moderator">Moderator</option>
                            {userd.role === "Super Admin" && <option value="Super Admin">Super Admin</option>}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
