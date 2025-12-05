import { motion } from 'framer-motion';

export const Mission = () => {
    return (
        <section className="py-24 bg-surface/30 border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                        Our mission is to make the world's knowledge <span className="text-gradient">instantly accessible</span> and actionable.
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                        We built QueryDoc-AI because we believe that information shouldn't be buried in static files.
                        We're empowering individuals and teams to make better decisions by unlocking the insights hidden within their documents.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
