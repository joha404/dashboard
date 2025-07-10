import {motion} from "framer-motion";

const BubbleAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary"
                    initial={{
                        x: Math.random() * 320,
                        y: Math.random() * window.innerHeight,
                        width: Math.random() * 15 + 5,
                        height: Math.random() * 15 + 5,
                        opacity: Math.random() * 0.3 + 0.1,
                    }}
                    animate={{
                        y: [null, Math.random() * 100 - 50],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default BubbleAnimation;