import { motion } from 'framer-motion';

export const FeaturedIn = () => {
    const logos = [
        'TechCrunch', 'Forbes', 'Wired', 'TheVerge', 'Bloomberg'
    ];

    return (
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm font-medium text-text-tertiary mb-8">TRUSTED BY INNOVATIVE TEAMS AT</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo, index) => (
                        <motion.div
                            key={logo}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-xl md:text-2xl font-bold text-white"
                        >
                            {logo}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
