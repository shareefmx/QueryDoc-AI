import React from 'react';
import { List, X } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import { clsx } from 'clsx';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', isPage: true },
        { name: 'About', path: '/about', isPage: true },
        { name: 'How it Works', path: '#how-it-works', isScroll: true },
        { name: 'Contact', path: '/contact', isPage: true },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
        e.preventDefault();

        if (link.isPage) {
            navigate(link.path);
            window.scrollTo(0, 0);
        } else if (link.isScroll) {
            if (location.pathname !== '/') {
                navigate('/');
                // Wait for navigation then scroll
                setTimeout(() => {
                    const element = document.querySelector(link.path);
                    element?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.querySelector(link.path);
                element?.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                isScrolled ? 'bg-background/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}
                    className="text-2xl font-bold tracking-tight text-white"
                >
                    QueryDoc<span className="text-primary">.AI</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => handleNavClick(e, link)}
                            className={clsx(
                                "text-sm font-medium transition-colors cursor-pointer",
                                location.pathname === link.path
                                    ? "text-white"
                                    : "text-text-secondary hover:text-white"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>



                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <List size={24} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-surface border-l border-white/10 z-50 md:hidden flex flex-col p-6"
                        >
                            <div className="flex justify-end mb-8">
                                <button
                                    className="text-white p-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        onClick={(e) => handleNavClick(e, link)}
                                        className={clsx(
                                            "text-lg font-medium transition-colors cursor-pointer",
                                            location.pathname === link.path
                                                ? "text-white"
                                                : "text-text-secondary hover:text-white"
                                        )}
                                    >
                                        {link.name}
                                    </a>
                                ))}

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};
