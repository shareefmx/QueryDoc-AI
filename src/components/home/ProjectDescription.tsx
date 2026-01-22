
import signature from '../../assets/signature.png';

export const ProjectDescription = () => {
    return (
        <section className="bg-background">
            <div className="mx-auto text-center">


                <div className="flex justify-center">
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
