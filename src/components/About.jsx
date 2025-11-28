import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent rounded-lg z-0" />
                        <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="/jane-photo.jpg"
                                alt="Jane Nyambura Mwangi"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-8">
                                <h3 className="text-2xl font-serif font-bold text-white">Jane Nyambura Mwangi</h3>
                                <p className="text-accent">Principal Advocate & Founder</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-accent font-medium tracking-wider uppercase mb-2">About The Firm</h2>
                        <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">
                            Excellence in Legal Practice Since 2019
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Founded with a vision to provide exceptional legal representation, Nyambura Mwangi & Co Advocates
                            has established itself as a premier law firm in Kiambu County. We combine deep legal expertise
                            with a client-centered approach to deliver results that matter.
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Jane holds a Bachelor of Laws (LLB) from the University of Nairobi and a Post Graduate Diploma
                            in Law from the Kenya School of Law. She is a dedicated advocate for justice, specializing in
                            civil litigation, family law, and human rights.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                '6+ Years Experience',
                                'High Court Admitted',
                                'Family Law Expert',
                                'Proven Track Record'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
