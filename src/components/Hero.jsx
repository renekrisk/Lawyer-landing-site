import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        // Main hero section - full viewport height for impact
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
                {/* Animate content on page load for a nice entrance effect */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h2 className="text-accent font-medium tracking-wider uppercase mb-3 text-sm sm:text-base">
                        Legal Services
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
                        Unwavering Commitment to <span className="text-accent">Justice</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-10 leading-relaxed max-w-2xl">
                        Delivering exceptional legal representation with a proven track record of success.
                        We stand by your side to navigate complex legal challenges with expertise and integrity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                        <a
                            href="#contact"
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-primary font-bold rounded-full hover:bg-accent-light transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            Get a Consultation
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                        <a
                            href="#about"
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-sm sm:text-base"
                        >
                            Learn More
                        </a>
                    </div>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
