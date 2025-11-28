import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        text: "Nyambura Mwangi & Co Advocates exceeded all our expectations. Their expertise in civil litigation helped us navigate a complex dispute that resolved in our favor. Professional, responsive, and results-driven.",
        author: "John Smith",
        role: "Business Owner"
    },
    {
        text: "Jane handled my family matter with compassion and expertise, securing a fair outcome. I'm forever grateful for their support during a difficult time.",
        author: "Maria Garcia",
        role: "Family Law Client"
    },
    {
        text: "Jane helped us with our property conveyance. Her attention to detail and knowledge made the entire process smooth and stress-free.",
        author: "David Johnson",
        role: "Real Estate Client"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-24 bg-primary text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-2 border-white/20" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border-2 border-white/20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-accent font-medium tracking-wider uppercase mb-2">Client Testimonials</h2>
                    <h3 className="text-4xl font-serif font-bold text-white">What Our Clients Say</h3>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                        <Quote className="absolute top-8 left-8 h-12 w-12 text-accent/20" />

                        <div className="relative h-64 md:h-48">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex flex-col justify-center items-center text-center"
                                >
                                    <p className="text-lg md:text-xl text-slate-300 italic mb-8 leading-relaxed">
                                        "{testimonials[currentIndex].text}"
                                    </p>

                                    <div>
                                        <h4 className="text-xl font-serif font-bold text-white">{testimonials[currentIndex].author}</h4>
                                        <p className="text-accent text-sm">{testimonials[currentIndex].role}</p>
                                        <div className="flex justify-center space-x-1 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-accent fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft className="h-6 w-6 text-white" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ChevronRight className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent w-8' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
