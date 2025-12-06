
export const Footer = () => {
    return (
        <footer className="py-12 border-t border-white/10 bg-[#0a0a0f]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <a href="#" className="text-2xl font-bold tracking-tight text-white block mb-2">
                            QueryDoc<span className="text-primary">.AI</span>
                        </a>
                        <p className="text-sm text-text-tertiary">
                            © 2025 QueryDoc AI. All rights.
                        </p>
                    </div>



                    <div className="flex gap-4">
                        {/* Social Icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};
