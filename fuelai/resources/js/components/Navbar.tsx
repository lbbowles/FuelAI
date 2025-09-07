import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-primary">
                                FuelAI
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary">
                                Home
                            </Link>

                            {/* Features Dropdown */}
                            <div
                                className="group relative"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary">
                                    Features
                                    <svg
                                        className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    className={`absolute left-0 mt-0 w-56 transform rounded-lg bg-white shadow-xl transition-all duration-200 ${
                                        isDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                                    }`}
                                >
                                    <div className="py-2">
                                        <Link
                                            href="/recipe-generation"
                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                    />
                                                </svg>
                                                Recipe Generation
                                            </div>
                                        </Link>
                                        <Link
                                            href="/forums"
                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                    />
                                                </svg>
                                                Forums
                                            </div>
                                        </Link>
                                        <Link
                                            href="/calendar"
                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                                                    />
                                                </svg>
                                                Calendar
                                            </div>
                                        </Link>
                                        <Link
                                            href="/exercises"
                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                                    />
                                                </svg>
                                                Exercises
                                            </div>
                                        </Link>
                                        <Link
                                            href="/tasks"
                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                                                    />
                                                </svg>
                                                Tasks
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/plans" className="px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary">
                                Plans
                            </Link>
                            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            {/* Badge */}
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                3
                            </span>
                        </button>

                        <Link href="/login" className="px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary">
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
