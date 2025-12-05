import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Check } from 'phosphor-react';

export const Pricing = () => {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            description: 'Perfect for individuals getting started.',
            features: ['5 documents per month', 'Basic chat support', '10MB file size limit', 'Standard processing speed'],
        },
        {
            name: 'Pro',
            price: '$29',
            period: '/month',
            description: 'For professionals who need power and speed.',
            features: ['Unlimited documents', 'Priority support', '100MB file size limit', 'Fast processing speed', 'Advanced reasoning'],
            recommended: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            description: 'Tailored solutions for large teams.',
            features: ['Unlimited everything', 'Dedicated success manager', 'SSO & API access', 'Custom integrations', 'SLA guarantees'],
        },
    ];

    return (
        <section id="pricing" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Simple, Transparent <span className="text-gradient">Pricing</span>
                    </h2>
                    <p className="text-text-secondary">
                        Choose the plan that fits your needs. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            <Card
                                className={`h-full flex flex-col p-8 relative ${plan.recommended ? 'border-primary/50 bg-surface/60 shadow-[0_0_40px_rgba(139,92,246,0.15)]' : 'bg-surface/30'}`}
                            >
                                {plan.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                        RECOMMENDED
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.period && <span className="text-text-secondary">{plan.period}</span>}
                                    </div>
                                    <p className="text-text-secondary text-sm">{plan.description}</p>
                                </div>

                                <div className="flex-1 space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3 text-sm">
                                            <Check size={16} className="text-primary mt-1 flex-shrink-0" weight="bold" />
                                            <span className="text-text-secondary">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant={plan.recommended ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    Choose {plan.name}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
