import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    // Always show the current year automatically
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Scale className="h-8 w-8 text-accent" />
                            <span className="font-serif text-xl font-bold">Nyambura Mwangi & Co</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Premier legal services delivering exceptional representation with unwavering commitment to justice and client success.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"
                                    aria-label={`Visit our ${['Facebook', 'Twitter', 'LinkedIn', 'Instagram'][index]} page`}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['About Us', 'Vision & Mission', 'Our Services', 'Testimonials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-slate-400 hover:text-accent transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Practice Areas */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-6">Practice Areas</h3>
                        <ul className="space-y-4">
                            {['Civil Litigation', 'Family Law', 'Conveyancing', 'Labour Law', 'Human Rights', 'Criminal Law'].map((item) => (
                                <li key={item}>
                                    <a href="#services" className="text-slate-400 hover:text-accent transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-slate-400">
                                <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
                                <span>P.O Box 9-01000,<br />Thika, Kenya</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400">
                                <Phone className="h-5 w-5 text-accent shrink-0" />
                                <span>+254 713 712 126</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400">
                                <Mail className="h-5 w-5 text-accent shrink-0" />
                                <span>janemwangi94@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-slate-500 text-sm">
                        &copy; {currentYear} Nyambura Mwangi & Co Advocates. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
