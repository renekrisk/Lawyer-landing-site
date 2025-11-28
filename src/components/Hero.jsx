import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10" />
                <img
                    src="/hero.jpg"
                    alt="Law Office"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h2 className="text-accent font-medium tracking-wider uppercase mb-4">
                        Premier Legal Services
                    </h2>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Unwavering Commitment to <span className="text-accent">Justice</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                        Delivering exceptional legal representation with a proven track record of success.
                        We stand by your side to navigate complex legal challenges with expertise and integrity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-accent text-primary font-bold rounded-full hover:bg-accent-light transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Get a Consultation
                            <ArrowRight className="h-5 w-5" />
                        </a>
                        <a
                            href="#about"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                            Learn More
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
