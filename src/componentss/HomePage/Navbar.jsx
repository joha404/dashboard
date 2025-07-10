import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();

  return (
      <motion.nav
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-transparent pt-2 px-4"
          aria-label="Primary navigation"
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2 px-4 border border-[#8E969C] rounded-[12px]">
          <h1 className="text-2xl font-bold whitespace-nowrap text-white dark:text-white select-none">
            LO<span className="text-primary">GO</span>
          </h1>

          <div className="flex-1 flex justify-end md:w-auto" id="navbar-default">
            <ul className="font-medium md:p-0 md:mt-0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 flex">
              <li>
                <motion.button
                   whileHover={{
                     scale:1.05
                   }}
                   whileTap={{
                     scale:0.95,
                     type:"tap"
                   }}
                    type="button"
                    onClick={() => navigate("/login")}
                    className="cursor-pointer bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary transition-all text-white rounded-lg
                  sm:text-base md:text-lg px-4 py-2 hover:bg-[#184e6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b6] font-medium leading-[164%] tracking-normal
                   capitalize font-lexend">
                  LOG IN
                </motion.button>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
  );
}
