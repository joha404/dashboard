import {motion} from "framer-motion";

const DataCard = ({data}) => {

    const stepVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
        hover: {
            y: -5,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
    };

    // Function to strip HTML tags for plain text display
    const stripHtml = (html) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-3xl mx-auto"
            >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {data.sectionTitle}
                </h3>
                <p className="text-xl text-gray-600">{data.sectionDescription}</p>
            </motion.div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
                <ol className="space-y-8">
                    {data.steps.map((step, i) => (
                        <motion.li
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={stepVariants}
                            className="flex items-start gap-6"
                        >
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-2xl">
                                {step.icon.startsWith("data:image") ? (
                                    <img
                                        src={step.icon}
                                        alt={`Step ${i + 1} icon`}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    step.icon
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    {i + 1}. {step.title}
                                </h4>
                                <p className="text-gray-600">
                                    {stripHtml(step.description)}
                                </p>
                            </div>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default DataCard;