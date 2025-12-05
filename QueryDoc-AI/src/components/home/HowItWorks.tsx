import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { UploadSimple, Gear, ChatCircleText } from 'phosphor-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: UploadSimple,
            title: 'Upload Documents',
            description: 'Securely upload your PDFs, Word docs, or text files. We support multiple formats.',
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20',
        },
        {
            icon: Gear,
            title: 'AI Processing',
            description: 'Our advanced AI analyzes and indexes your content for instant retrieval.',
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            border: 'border-purple-400/20',
        },
        {
            icon: ChatCircleText,
            title: 'Start Chatting',
            description: 'Ask questions and get accurate answers cited directly from your documents.',
            color: 'text-pink-400',
            bg: 'bg-pink-400/10',
            border: 'border-pink-400/20',
        },
    ];

    return (
        <section id="how-it-works" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        How <span className="text-gradient">QueryDoc</span> Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary max-w-xl mx-auto"
                    >
                        Turn your static documents into an interactive knowledge base in minutes.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card hoverEffect className="h-full flex flex-col items-center text-center group">
                                <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon size={32} className={step.color} weight="fill" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
