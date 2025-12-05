import { motion } from 'framer-motion';

export const About = () => {
    return (
        <section className="pt-32 pb-20 px-6 min-h-screen relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 opacity-20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    
                </motion.div>

                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-surface/30 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-light text-justify">
                            <p>
                                QueryDoc AI is a next-generation document intelligence platform designed to transform how users interact with their data. By leveraging advanced AI, it allows users to chat directly with their documents, extracting insights instantly and efficiently.
                            </p>
                            <p>
                                Built from the ground up, this website showcases a seamless integration of modern web technologies. It utilizes React and TypeScript for a robust and responsive frontend, styled with Tailwind CSS to deliver a premium, visually engaging user experience.
                            </p>
                            <p>
                                One of the core features of QueryDoc AI is its ability to understand context. Powered by Google Gemini, the AI model analyzes uploaded documents to provide accurate, context-aware responses, making information retrieval as simple as asking a question.
                            </p>
                            <p>
                                This project represents the convergence of software engineering and artificial intelligence. It serves as a comprehensive demonstration of what is possible when cutting-edge tools like Google Antigravity and Vibe Coding are applied to solve real-world problems, pushing the boundaries of web development.
                            </p>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <img
                                src="/about-signature.png"
                                alt="Shareef Signature"
                                className="h-24 md:h-32 opacity-90 invert brightness-0"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
