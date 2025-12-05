import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown } from 'phosphor-react';
import { clsx } from 'clsx';

export const FAQ = () => {
    const faqs = [
        {
            question: 'How secure are my documents?',
            answer: 'We take security seriously. All documents are encrypted at rest and in transit using bank-grade AES-256 encryption. We do not use your data to train our models.',
        },
        {
            question: 'What file formats do you support?',
            answer: 'We currently support PDF, DOCX, TXT, and MD files. We are working on adding support for CSV and Excel spreadsheets soon.',
        },
        {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your current billing period.',
        },
        {
            question: 'Do you offer a free trial for the Pro plan?',
            answer: 'Yes, we offer a 14-day free trial for the Pro plan so you can experience the full power of QueryDoc-AI risk-free.',
        },
    ];

    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-white/[0.02] border-y border-white/5">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-2xl bg-surface/30 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                <CaretDown
                                    size={20}
                                    className={clsx(
                                        'text-text-secondary transition-transform duration-300',
                                        openIndex === index ? 'rotate-180' : 'rotate-0'
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-white/5">
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
