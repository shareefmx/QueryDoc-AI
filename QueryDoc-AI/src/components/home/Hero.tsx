import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PaperPlaneRight, FileText, Sparkle } from 'phosphor-react';

export const Hero = () => {
    const [isChatExpanded, setIsChatExpanded] = React.useState(false);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow opacity-20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                    <Sparkle size={16} className="text-primary" weight="fill" />
                    <span className="text-sm font-medium text-text-secondary">Next Generation Document Intelligence</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
                >
                    Chat with your <span className="text-gradient">Documents</span> using AI
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl"
                >
                    Upload PDFs, text files, and more. QueryDoc-AI analyzes your documents and provides instant, accurate answers to your questions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mb-20"
                >
                    <Button size="lg">Get Started</Button>
                    <Button size="lg" variant="outline">Learn how it works</Button>
                </motion.div>

                {/* Interactive Chat Demo */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full max-w-4xl"
                >
                    <Card className="relative overflow-hidden border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="text-xs font-medium text-text-tertiary">QueryDoc AI Assistant</div>
                            <div className="w-16" />
                        </div>

                        <div className="p-6 h-[400px] flex flex-col">
                            <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar">
                                {/* AI Message */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Sparkle size={16} className="text-primary" weight="fill" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-surface border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-text-secondary max-w-md">
                                            Hello! I've analyzed the <span className="text-white font-medium inline-flex items-center gap-1"><FileText size={14} /> financial_report_2024.pdf</span> you uploaded. What would you like to know?
                                        </div>
                                    </div>
                                </div>

                                {/* User Message (Animated) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2 }}
                                    className="flex gap-4 flex-row-reverse"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <div className="w-4 h-4 rounded-full bg-white/50" />
                                    </div>
                                    <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-none p-4 text-sm text-white max-w-md">
                                        Summarize the key revenue growth factors for Q3.
                                    </div>
                                </motion.div>

                                {/* AI Response (Animated) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 3.5 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Sparkle size={16} className="text-primary" weight="fill" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-surface border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-text-secondary max-w-md">
                                            Based on the report, Q3 revenue growth was driven by:
                                            <ul className="list-disc list-inside mt-2 space-y-1 text-text-tertiary">
                                                <li>35% increase in enterprise subscriptions</li>
                                                <li>Expansion into APAC markets</li>
                                                <li>New AI feature adoption</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Input Area */}
                            <div className="mt-6 relative">
                                <input
                                    type="text"
                                    placeholder="Ask a question about your documents..."
                                    className={`w-full bg-white/5 border rounded-xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-text-tertiary focus:outline-none transition-all duration-300 ${isChatExpanded ? 'border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'border-white/10'}`}
                                    onFocus={() => setIsChatExpanded(true)}
                                    onBlur={() => setIsChatExpanded(false)}
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-white transition-colors">
                                    <PaperPlaneRight size={20} weight="fill" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};
