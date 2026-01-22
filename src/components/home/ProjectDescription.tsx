
import signature from '../../assets/signature.png';

export const ProjectDescription = () => {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                

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
