import { usePage, router, Link } from '@inertiajs/react';
import type { PageProps } from '@/types';
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function NavbarTop() {

    const { auth } = usePage<PageProps>().props;

    const handleSignOut = () => {
        router.post('/logout');
    };

    const baseNavItems = [
        { name: "Home", link: "/" },
        { name: "Forums", link: "/forums" },
        { name: "Meals", link: "/meals" },
        { name: "Calendar", link: "/calendar" },
        { name: "Tasks", link: "/tasks" },
        { name: "Exercise", link: "/exercises" },
        { name: "IR", link: "/image_rec" },
    ];

    const navItems = auth.user?.role === 'admin'
        ? [...baseNavItems, { name: "Admin", link: "/admin" }]
        : baseNavItems;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 group cursor-pointer relative z-[50] pointer-events-auto"
                                >
                                    {auth.user.image_base64 ? (
                                        <img
                                            src={auth.user.image_base64 as string}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full object-cover border border-base-300 shadow-sm pointer-events-auto"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-base-300 flex items-center justify-center pointer-events-auto">
                                            {auth.user.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <span className="text-gray-700 font-medium group-hover:underline pointer-events-auto">
                                        {auth.user.username}
                                    </span>
                                </Link>

                                <NavbarButton
                                    onClick={handleSignOut}
                                    variant="secondary"
                                >
                                    Sign Out
                                </NavbarButton>
                            </>
                        ) : (
                            <>
                                <NavbarButton href="/login" variant="secondary">
                                    Login
                                </NavbarButton>

                                <NavbarButton href="/register" variant="primary">
                                    Register
                                </NavbarButton>
                            </>
                        )}

                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}

                        {auth.user ? (
                            <div className="flex w-full flex-col gap-4 mt-5">
                                <a
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3"
                                >
                                    {auth.user.image_data ? (
                                        <img
                                            src={`data:${auth.user.mime_type};base64,${auth.user.image_data}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                                            {auth.user.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="font-medium">{auth.user.username}</span>
                                </a>

                                <NavbarButton
                                    onClick={handleSignOut}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Sign Out
                                </NavbarButton>
                            </div>
                        ) : (
                            <div className="flex w-full flex-col gap-4">
                                <NavbarButton
                                    href="/login"
                                    variant="primary"
                                    className="w-full"
                                >
                                    Login
                                </NavbarButton>

                                <NavbarButton
                                    href="/register"
                                    variant="primary"
                                    className="w-full"
                                >
                                    Register
                                </NavbarButton>
                            </div>
                        )}
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
