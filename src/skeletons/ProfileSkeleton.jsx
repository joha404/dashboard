import {motion} from 'framer-motion';

const ProfileSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 animate-pulse"
        >
            <div className="h-12 w-40 bg-gray-200 rounded-lg" />
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex gap-6 items-center">
                    <div className="w-28 h-28 rounded-full bg-gray-200" />
                    <div className="space-y-3">
                        <div className="w-52 h-6 bg-gray-200 rounded" />
                        <div className="w-40 h-4 bg-gray-100 rounded" />
                        <div className="w-60 h-4 bg-gray-100 rounded" />
                    </div>
                </div>
                <div className="w-36 h-10 bg-gray-200 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
                    <div className="w-48 h-6 bg-gray-200 rounded" />
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-2 w-1/2">
                            <div className="w-10 h-10 rounded-lg bg-gray-200" />
                            <div className="w-28 h-4 bg-gray-100 rounded" />
                            <div className="w-20 h-5 bg-gray-100 rounded" />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <div className="w-10 h-10 rounded-lg bg-gray-200" />
                            <div className="w-28 h-4 bg-gray-100 rounded" />
                            <div className="w-20 h-5 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
                    <div className="w-48 h-6 bg-gray-200 rounded" />
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-2 w-1/2">
                            <div className="w-10 h-10 rounded-lg bg-gray-200" />
                            <div className="w-28 h-4 bg-gray-100 rounded" />
                            <div className="w-20 h-5 bg-gray-100 rounded" />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <div className="w-10 h-10 rounded-lg bg-gray-200" />
                            <div className="w-28 h-4 bg-gray-100 rounded" />
                            <div className="w-20 h-5 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
                <div className="w-60 h-6 bg-gray-200 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-gray-200" />
                        <div className="space-y-2">
                            <div className="w-28 h-4 bg-gray-100 rounded" />
                            <div className="w-32 h-5 bg-gray-100 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-gray-200" />
                        <div className="space-y-2">
                            <div className="w-28 h-4 bg-gray-100 rounded" />
                            <div className="w-32 h-5 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
