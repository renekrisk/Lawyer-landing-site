import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear status when user starts typing again
        if (status.message) setStatus({ type: '', message: '' });
    };

    // Basic form validation
    const validateForm = () => {
        if (!formData.name.trim()) {
            setStatus({ type: 'error', message: 'Please enter your name' });
            return false;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email' });
            return false;
        }
        if (!formData.message.trim()) {
            setStatus({ type: 'error', message: 'Please enter a message' });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Send email using EmailJS
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    service_type: formData.service || 'Not specified',
                    message: formData.message
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
            });

            // Reset form
            setFormData({ name: '', email: '', service: '', message: '' });
        } catch (error) {
            console.error('EmailJS error:', error);
            setStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again or contact us directly.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-accent font-medium tracking-wider uppercase mb-2">Get In Touch</h2>
                        <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">Free Consultation</h3>
                        <p className="text-slate-600 mb-10 leading-relaxed">
                            Ready to discuss your legal needs? Contact us today for a free, confidential consultation
                            with one of our experienced attorneys. We are here to listen and provide the guidance you need.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Visit Us</h4>
                                    <p className="text-slate-600">P.O Box 9-01000<br />Thika, Kenya</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Call Us</h4>
                                    <p className="text-slate-600">+254 713 712 126</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Email Us</h4>
                                    <p className="text-slate-600">janemwangi94@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Working Hours</h4>
                                    <p className="text-slate-600">Mon-Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="John Doe"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="john@example.com"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Legal Service Needed</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                                    disabled={loading}
                                >
                                    <option value="">Select a service</option>
                                    <option value="civil">Civil Litigation</option>
                                    <option value="family">Family Law</option>
                                    <option value="conveyancing">Conveyancing</option>
                                    <option value="labour">Labour Law</option>
                                    <option value="human-rights">Human Rights</option>
                                    <option value="criminal">Criminal Law</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="Please describe your legal matter..."
                                    disabled={loading}
                                ></textarea>
                            </div>

                            {/* Status Message */}
                            {status.message && (
                                <div className={`p-4 rounded-lg flex items-start gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                    }`}>
                                    {status.type === 'success' ? (
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                    )}
                                    <p className="text-sm">{status.message}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-8 py-4 bg-primary text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-light'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
