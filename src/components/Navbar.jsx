import React, { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-md py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <a href="#home" className="flex items-center space-x-2 group">
                        <div className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white'}`}>
                            <Scale className="h-6 w-6" />
                        </div>
                        <span className={`font-serif text-xl font-bold transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
                            Nyambura Mwangi & Co
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-accent ${scrolled ? 'text-slate-700' : 'text-white/90'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${scrolled
                                    ? 'bg-primary text-white hover:bg-primary-light'
                                    : 'bg-accent text-primary hover:bg-accent-light'
                                }`}
                        >
                            Free Consultation
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 px-3">
                                <a
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light"
                                >
                                    Free Consultation
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
