import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UpdateForm from '../components/UpdateForm';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../api/axios";
import { deleteUser, setUsers } from '../redux/authSlice';

const Home = () => {
  const userd = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const { data } = await axios.get("/allusers", {
          headers: { "Authorization": `Bearer ${token}` }
        }, {
          signal: controller.signal,
          withCredentials: true
        })
        console.log(data.users)
        isMounted && dispatch(setUsers(data?.users));
      } catch (error) {
        console.log(error)
      }
    }

    if (users.length === 0) {
      getUsers();
    }
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [dispatch, token, users.length]);

  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleUpdate = (user) => {
    setCurrentUser(user);
    setShow(!show);
  };

  const handleDelete = (id) => {
    const deleteUserd = async () => {
      try {
        const { data } = await axios.delete(`/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        }, {
          withCredentials: true
        })
        console.log(data)
        if (data.success) {
          dispatch(deleteUser(id));
          alert(`Deleted user with ID: ${id}`);
        }
      } catch (error) {
        console.log(error)
      }
    };
    deleteUserd();
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
                {userd.role !== "User" && <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.length === 0
                ? <tr><td>No Users to display</td></tr>
                : users.map(user => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.role}</td>
                    {userd.role !== "User" &&
                      <td className="px-4 py-2 text-sm text-gray-900 space-x-2">
                        <button
                          onClick={() => handleUpdate(user)}
                          className="text-indigo-600 hover:text-indigo-800" >
                          Update
                        </button>
                        {userd.role === "Super Admin" &&
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600 hover:text-red-800" >
                            Delete
                          </button>}
                      </td>
                    }
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Mobile Responsive Layout */}
          <div className="md:hidden">
            {users.map(user => (
              <div key={user._id} className="border-b p-4 space-y-2">
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
                    onClick={() => handleUpdate(user)}
                    className="text-indigo-600 hover:text-indigo-800" >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800" >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UpdateForm
        show={show}
        setShow={setShow}
        user={currentUser}
      />
    </div>
  )
}

export default Home