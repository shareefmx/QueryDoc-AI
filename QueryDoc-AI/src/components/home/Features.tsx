import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Lightning, ShieldCheck, Brain, Globe } from 'phosphor-react';

export const Features = () => {
    const features = [
        {
            icon: Lightning,
            title: 'Lightning Fast Analysis',
            description: 'Get answers from hundreds of pages in milliseconds. Our optimized vector search ensures zero latency.',
        },
        {
            icon: Brain,
            title: 'Advanced Context',
            description: 'Powered by state-of-the-art LLMs that understand nuance, context, and complex relationships in your data.',
        },
        {
            icon: ShieldCheck,
            title: 'Enterprise Security',
            description: 'Bank-grade encryption for your documents. Your data is processed securely and never used for training.',
        },
        {
            icon: Globe,
            title: 'Multi-Language Support',
            description: 'Upload documents in any language and query them in English, or vice versa. Breaking language barriers.',
        },
    ];

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Powerful <span className="text-gradient">Features</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary max-w-xl mx-auto"
                    >
                        Everything you need to extract value from your knowledge base.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hoverEffect className="h-full flex items-start gap-6 p-8">
                                <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <feature.icon size={24} className="text-primary" weight="fill" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
