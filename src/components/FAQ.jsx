import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What areas of law do you specialize in?",
        answer: "We specialize in Civil Litigation, Family Law, Conveyancing, Labour Law, Human Rights, and Criminal Law. Our team has extensive experience in these areas."
    },
    {
        question: "How do I book a consultation?",
        answer: "You can book a consultation by filling out the contact form on our website, calling us at +254 713 712 126, or emailing janemwangi94@gmail.com."
    },
    {
        question: "Do you offer free consultations?",
        answer: "Yes, we offer an initial free consultation to understand your legal needs and advise on the best way forward."
    },
    {
        question: "Where are your offices located?",
        answer: "Our offices are located in Thika, Kenya. Our postal address is P.O Box 9-01000, Thika."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Toggle the active FAQ item. If clicked again, close it.
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-accent font-medium tracking-wider uppercase mb-2">Common Questions</h2>
                    <h3 className="text-4xl font-serif font-bold text-slate-900">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
                                aria-expanded={activeIndex === index}
                            >
                                <span className="font-serif font-semibold text-slate-900 text-left">{faq.question}</span>
                                {activeIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-accent" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-slate-400" />
                                )}
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 py-4 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
