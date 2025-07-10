// HeroSection.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const blobAnimation = {
  y: [0, -20, 0],
  scale: [1, 1.1, 1],
};

function HeroSection() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="relative overflow-hidden w-full h-screen min-h-[700px] flex items-center justify-center">
      <section
        ref={ref}
        aria-label="Welcome hero section"
        className="relative w-full max-w-5xl px-6 md:px-10 text-center z-10"
      >
        {/* Decorative animated blobs */}
        <motion.div
          className="absolute top-1/4 left-16 w-16 h-16 rounded-full bg-primary opacity-20 blur-xl -z-10"
          aria-hidden="true"
          animate={blobAnimation}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-16 w-24 h-24 rounded-full bg-[#a66af9] opacity-20 blur-xl -z-10"
          aria-hidden="true"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Heading with shine effect */}
        <motion.h1
          className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight select-text  "
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex items-center justify-center gap-x-2 ">
            <motion.span
              className="block"
              variants={headingVariants}
              custom={0}
            >
              Welcome to
            </motion.span>
            <motion.span
              className="block relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 btn-shine"
              variants={headingVariants}
              custom={1}
            >
              Admin
            </motion.span>
          </div>
          <motion.span className="block" variants={headingVariants} custom={2}>
            Dashboard
          </motion.span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="max-w-3xl mx-auto text-[#d0d0d1] text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 select-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 3 * 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Transform your data into actionable insights with our powerful
          analytics platform. Experience seamless integration and real-time
          visualization.
        </motion.p>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 3.5 * 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <motion.button
            onClick={handleContinue}
            type="submit"
            aria-label="Continue"
            className="w-[200px] py-4 px-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-hover text-white font-semibold shadow-xl hover:shadow-black/40
                        transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Continue
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default HeroSection;
