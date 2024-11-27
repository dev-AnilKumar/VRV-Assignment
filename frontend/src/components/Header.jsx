import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold text-indigo-600">RBAC</div>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-900 hover:text-indigo-600">Home</Link>
                        <Link to="/admin" className="text-gray-900 hover:text-indigo-600">Admin</Link>
                        <Link to="/mod" className="text-gray-900 hover:text-indigo-600">Moderator</Link>
                        <Link to="/super-admin" className="text-gray-900 hover:text-indigo-600">Super Admin</Link>
                        <Link to="/lounge" className="text-gray-900 hover:text-indigo-600">Lounge</Link>
                    </nav>

                    <div className="relative hidden md:block">
                        <button
                            className="flex items-center space-x-2 text-gray-900"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="font-medium">John Doe</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    {/* <span className="font-medium mr-3 md:hidden">John Doe</span> */}
                    <button
                        className="md:hidden text-gray-900 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-md py-4">
                        <nav className="space-y-4">
                            <Link
                                to="/"
                                className="block px-4 py-2 text-gray-900 hover:text-indigo-600"
                                onClick={() => setMobileMenuOpen(false)} >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="block px-4 py-2 text-gray-900 hover:text-indigo-600"
                                onClick={() => setMobileMenuOpen(false)} >
                                About
                            </Link>
                            <Link
                                to="/services"
                                className="block px-4 py-2 text-gray-900 hover:text-indigo-600"
                                onClick={() => setMobileMenuOpen(false)} >
                                Services
                            </Link>
                            <Link
                                to="/blog"
                                className="block px-4 py-2 text-gray-900 hover:text-indigo-600"
                                onClick={() => setMobileMenuOpen(false)} >
                                Blog
                            </Link>
                            <Link
                                to="/contact"
                                className="block px-4 py-2 text-gray-900 hover:text-indigo-600"
                                onClick={() => setMobileMenuOpen(false)} >
                                Contact
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
