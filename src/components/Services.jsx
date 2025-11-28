import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Home, Briefcase, Heart, Gavel } from 'lucide-react';

const services = [
    {
        icon: Scale,
        title: 'Civil Litigation',
        description: 'Expert representation in civil and commercial disputes, ensuring your rights are protected in court.',
    },
    {
        icon: Users,
        title: 'Family Law',
        description: 'Compassionate handling of divorce, custody, succession, and sensitive family matters.',
    },
    {
        icon: Home,
        title: 'Conveyancing',
        description: 'Secure property transactions, real estate deals, and resolution of land disputes.',
    },
    {
        icon: Briefcase,
        title: 'Labour Law',
        description: 'Navigating employment disputes, contracts, and workplace rights for employers and employees.',
    },
    {
        icon: Heart,
        title: 'Human Rights',
        description: 'Advocacy for constitutional matters, freedoms, and social, economic, and cultural rights.',
    },
    {
        icon: Gavel,
        title: 'Criminal Law',
        description: 'Strong defense strategies and representation in criminal court proceedings.',
    },
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-accent font-medium tracking-wider uppercase mb-2">Our Expertise</h2>
                    <h3 className="text-4xl font-serif font-bold text-slate-900 mb-4">Comprehensive Legal Solutions</h3>
                    <p className="text-slate-600">
                        We offer a wide range of legal services tailored to meet your specific needs.
                        Our team is dedicated to providing high-quality advice and representation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100"
                        >
                            <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-serif font-bold text-slate-900 mb-3">{service.title}</h4>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
