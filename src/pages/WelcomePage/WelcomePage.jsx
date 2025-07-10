import HeroSection from "../../componentss/HomePage/HeroSection.jsx";
import Background from "../../assets/images/banner.jpg";

export default function WelcomePage() {
    return (
        <div
            className="relative min-h-screen w-full overflow-hidden bg-black"
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Animated background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-70"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>
            {/* Overlay to dim background image and improve contrast */}
            <div className="absolute inset-0 bg-black/60 z-0" aria-hidden="true" />

            <div className="relative z-10 min-h-screen flex flex-col">
                <main className="flex-grow flex justify-center items-center min-h-[80vh] md:min-h-[92vh]">
                    <HeroSection />
                </main>
            </div>
        </div>
    );
}
