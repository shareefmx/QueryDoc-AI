
import signature from '../../assets/signature.png';

export const ProjectDescription = () => {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-8 text-text-secondary text-lg md:text-xl leading-relaxed font-light">
                    <p>
                        I designed and built this fully functional website from scratch, showcasing my technical
                        programming skills and a passion for <span className="text-text-primary font-semibold">Vibe Coding</span>. 
                        It is powered by a modern tech stack including <span className="text-text-primary font-semibold">React</span>, <span className="text-text-primary font-semibold">TypeScript</span>, and <span className="text-text-primary font-semibold">Tailwind CSS</span>.
                    </p>
                    <p>
                        The development was accelerated with the help of <span className="text-text-primary font-semibold">Google Antigravity software</span> for
                        coding. Every image and icon was uniquely created by <span className="text-text-primary font-semibold">Google Gemini</span>.
                        The <span className="text-text-primary font-semibold">gemini-2.0-flash-lite, gemini-2.0-flash and gemini-2.0-flash-lite-001 AI model</span> is also utilized to analyze documents and reply to questions.
                    </p>
                    <p>
                        This project is a testament to what can be achieved when engineering expertise meets
                        advanced AI tools. It stands as a complete, self-made digital experience, built entirely on
                        my own to push the boundaries of web development.
                    </p>
                </div>

                <div className="mt-12 flex justify-center">
                    <img 
                        src={signature} 
                        alt="Signature" 
                        className="h-24 opacity-80"
                    />
                </div>
            </div>
        </section>
    );
};
