import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';

export default function DynamicPage() {
    const [pages, setPages] = useState([
        {
            pageName: 'Privacy Policy',
            policies: [
                { title: 'Data Collection', content: 'We collect basic user information...' },
                { title: 'Cookies Usage', content: 'Our website uses cookies to...' }
            ]
        },
        {
            pageName: 'Terms of Service',
            policies: [
                { title: 'User Responsibilities', content: 'Users must comply with all...' }
            ]
        }
    ]);
    const [selectedPage, setSelectedPage] = useState('');
    const [policies, setPolicies] = useState([]);
    const [newPageName, setNewPageName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentPolicyIndex, setCurrentPolicyIndex] = useState(null);
    const [newPolicy, setNewPolicy] = useState({ title: '', content: '' });

    // Fetch all pages on component mount
    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await axios.get('/api/cms');
                setPages(response.data);
            } catch (error) {
                console.error('Error fetching pages:', error);
            }
        };
        fetchPages();
    }, []);

    // Load policies when a page is selected
    useEffect(() => {
        if (selectedPage) {
            const page = pages.find(p => p.pageName === selectedPage);
            if (page) {
                setPolicies(page.policies);
            } else {
                setPolicies([]);
            }
        }
    }, [selectedPage, pages]);

    const handlePageSelect = (pageName) => {
        setSelectedPage(pageName);
        setIsEditing(false);
        setCurrentPolicyIndex(null);
    };

    const handleCreatePage = async () => {
        if (!newPageName.trim()) return;

        try {
            const response = await axios.post('/api/cms', { pageName: newPageName });
            setPages([...pages, response.data]);
            setNewPageName('');
            setSelectedPage(response.data.pageName);
        } catch (error) {
            console.error('Error creating page:', error);
        }
    };

    const handleAddPolicy = () => {
        setNewPolicy({ title: '', content: '' });
        setIsEditing(true);
        setCurrentPolicyIndex(null);
    };

    const handleEditPolicy = (index) => {
        setNewPolicy(policies[index]);
        setIsEditing(true);
        setCurrentPolicyIndex(index);
    };

    const handleSavePolicy = async () => {
        if (!newPolicy.title.trim() || !newPolicy.content.trim()) return;

        try {
            let updatedPolicies;
            if (currentPolicyIndex !== null) {
                // Update existing policy
                updatedPolicies = [...policies];
                updatedPolicies[currentPolicyIndex] = newPolicy;
            } else {
                // Add new policy
                updatedPolicies = [...policies, newPolicy];
            }

            const response = await axios.put(`/api/cms/${selectedPage}`, {
                policies: updatedPolicies
            });

            setPolicies(updatedPolicies);
            setIsEditing(false);
            setCurrentPolicyIndex(null);
            setNewPolicy({ title: '', content: '' });

            // Update pages list if needed
            setPages(pages.map(p =>
                p.pageName === selectedPage ? response.data : p
            ));
        } catch (error) {
            console.error('Error saving policy:', error);
        }
    };

    const handleDeletePolicy = async (index) => {
        try {
            const updatedPolicies = policies.filter((_, i) => i !== index);
            const response = await axios.put(`/api/cms/${selectedPage}`, {
                policies: updatedPolicies
            });

            setPolicies(updatedPolicies);
            setPages(pages.map(p =>
                p.pageName === selectedPage ? response.data : p
            ));
        } catch (error) {
            console.error('Error deleting policy:', error);
        }
    };

    const handleDeletePage = async () => {
        if (!selectedPage) return;

        try {
            await axios.delete(`/api/cms/${selectedPage}`);
            setPages(pages.filter(p => p.pageName !== selectedPage));
            setSelectedPage('');
            setPolicies([]);
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pages List */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-gray-700/40 hover:border-gray-600/60 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                    <h2 className="text-xl font-bold mb-4 text-white">Pages</h2>

                    <div className="mb-4 flex gap-2">
                        <input
                            type="text"
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                            placeholder="New page name"
                            className="flex-1 bg-gray-700 text-white rounded px-3 py-2"
                        />
                        <button
                            onClick={handleCreatePage}
                            className="bg-gradient-to-br from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>

                    <ul className="space-y-2 max-h-96 overflow-y-auto">
                        {Array.isArray(pages) && pages.length > 0 ? (
                            pages.map((page) => (
                                <li key={page.pageName}>
                                    <button
                                        onClick={() => handlePageSelect(page.pageName)}
                                        className={`w-full text-left p-2 rounded ${
                                            selectedPage === page.pageName
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                        }`}
                                    >
                                        {page.pageName}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 italic text-sm">No pages found.</li>
                        )}
                    </ul>
                </motion.div>

                {/* Policies List */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-gray-700/40 hover:border-gray-600/60 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">
                            {selectedPage ? `${selectedPage} Policies` : 'Select a Page'}
                        </h2>
                        {selectedPage && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddPolicy}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                >
                                    Add Policy
                                </button>
                                <button
                                    onClick={handleDeletePage}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete Page
                                </button>
                            </div>
                        )}
                    </div>

                    {selectedPage ? (
                        <ul className="space-y-3 max-h-96 overflow-y-auto">
                            {policies.map((policy, index) => (
                                <li key={index} className="bg-gray-700/50 rounded p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-white">{policy.title}</h3>
                                            <div
                                                className="text-gray-300 text-sm mt-1 line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: policy.content }}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditPolicy(index)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletePolicy(index)}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {policies.length === 0 && (
                                <p className="text-gray-400 text-center py-4">No policies yet</p>
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center py-4">Please select a page</p>
                    )}
                </motion.div>

                {/* Policy Editor */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-gray-700/40 hover:border-gray-600/60 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    whileHover={{
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <h2 className="text-xl font-bold mb-4 text-white">
                        {currentPolicyIndex !== null ? 'Edit Policy' : 'Add New Policy'}
                    </h2>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newPolicy.title}
                                    onChange={(e) => setNewPolicy({...newPolicy, title: e.target.value})}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                                    placeholder="Policy title"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Content</label>
                                <ReactQuill
                                    theme="snow"
                                    value={newPolicy.content}
                                    onChange={(content) => setNewPolicy({...newPolicy, content})}
                                    className="bg-gray-700 text-white rounded"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSavePolicy}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-4">
                            {selectedPage
                                ? 'Click "Add Policy" or select a policy to edit'
                                : 'Please select a page first'}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}