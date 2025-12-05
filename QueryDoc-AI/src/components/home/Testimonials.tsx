import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Star } from 'phosphor-react';

export const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Research Analyst',
            content: 'QueryDoc-AI has completely transformed how I review financial reports. What used to take hours now takes minutes.',
            result: 'Saved 15+ hours/week',
        },
        {
            name: 'Michael Ross',
            role: 'Legal Counsel',
            content: 'The accuracy of the citations is impressive. I can trust the answers because it always points me to the source.',
            result: '100% citation accuracy',
        },
        {
            name: 'Elena Rodriguez',
            role: 'Product Manager',
            content: 'Onboarding new team members is so much easier now. They can just query our internal docs and get up to speed instantly.',
            result: '50% faster onboarding',
        },
        {
            name: 'David Kim',
            role: 'PhD Student',
            content: 'I use it to synthesize hundreds of academic papers. It finds connections I would have definitely missed.',
            result: 'Analyzed 500+ papers',
        },
    ];

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Loved by <span className="text-gradient">Experts</span>
                </h2>
                <p className="text-text-secondary">
                    Join thousands of professionals who trust QueryDoc-AI.
                </p>
            </div>

            {/* Scrolling Marquee */}
            <div className="flex gap-6 overflow-hidden py-4">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    className="flex gap-6 min-w-max px-6"
                >
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <Card key={index} className="w-[350px] md:w-[400px] flex-shrink-0 p-8 bg-surface/50">
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} weight="fill" />
                                ))}
                            </div>
                            <p className="text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                            <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                <div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                                </div>
                                <div className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {testimonial.result}
                                </div>
                            </div>
                        </Card>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
