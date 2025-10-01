import { usePage, router } from '@inertiajs/react';
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

// Aceternity
export default function NavbarTop() {



    const { auth } = usePage<PageProps>().props;
    const handleSignOut = () => {
        router.post('/logout');
    };

    const navItems = [
        {
          name: "Home",
          link: "/",
        },
        {
            name: "Forums",
            link: "/forums",
        },
        {
            name: "Recipes",
            link: "/recipe-generation",
        },
        {
            name: "Calendar",
            link: "/calendar",
        },

        {
            name: "Tasks",
            link: "/tasks",
        },

        {
            name: "Exercise",
            link: "/exercises",
        },

        {
            name: "IR",
            link: "/image_rec",
        },

        {
            name: "Admin",
            link: "/admin",
        },
    ];

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
                            // Show when logged in
                            <>
                        <span className="text-gray-700">
                            {auth.user.username}
                        </span>
                                <NavbarButton
                                    onClick={handleSignOut}
                                    variant="secondary"
                                >
                                    Sign Out
                                </NavbarButton>

                            </>
                        ) : (
                            // Show when not logged in
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
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Register
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Navbar */}
        </div>
    );
}
