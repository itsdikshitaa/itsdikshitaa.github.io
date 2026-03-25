import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DynamicNavigation } from './DynamicNavigation';
import { ArrowRight } from 'lucide-react';
import { PageVisitsFooter } from './PageVisitsFooter';

interface BlogListPageProps {
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const POSTS = [
    {
        id: 'passvault-browser-security',
        title: 'Building PassVault with Privacy-First Browser Security',
        date: 'Jun 2025',
        excerpt: 'Notes from building a browser-based credential utility with secure password generation, optional encrypted local storage, and honest browser tradeoffs.',
        readTime: '4 min read'
    },
    {
        id: 'blueborne-scanner-notes',
        title: 'BlueBorne Scanner Notes from Bluetooth Exposure Review',
        date: 'Jul 2025',
        excerpt: 'What nearby Bluetooth discovery, protocol-aware parsing, and OUI context taught me about defensive wireless analysis.',
        readTime: '5 min read'
    },
    {
        id: 'soc-lab-roadmap',
        title: 'Designing a SOC Learning Lab Without Pretending It Is Production Experience',
        date: '2025 Roadmap',
        excerpt: 'Why I keep roadmap work clearly separate from completed work while building repeatable triage and documentation habits.',
        readTime: '5 min read'
    },
    {
        id: 'linux-fundamentals-notes',
        title: 'Linux Fundamentals That Improved My Analyst Workflow',
        date: 'Jul 2025',
        excerpt: 'The Linux, networking, firewall, and container basics that strengthened how I think about troubleshooting and system behavior.',
        readTime: '4 min read'
    }
];

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    const handlePostClick = (id: string) => {
        onNavigate('blogs', id);
    };

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="blogs"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-3xl mx-auto min-h-screen">
                <div ref={triggerRef} className="mb-20 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-6"
                    >
                        Notes & Writeups
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 font-light"
                    >
                        Writing about security projects, analyst workflows, and the learning process behind them.
                    </motion.p>
                </div>

                <div className="flex flex-col gap-8 mb-8">
                    {POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => handlePostClick(post.id)}
                            className="group cursor-pointer py-8 border-b border-gray-200 dark:border-white/10 last:border-0"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 gap-2">
                                <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                                <span className="text-sm font-mono text-gray-400 shrink-0">{post.date}</span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 max-w-xl">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                Read note <ArrowRight size={14} />
                            </div>
                        </motion.article>
                    ))}
                </div>

                <PageVisitsFooter />
            </main>
        </>
    );
};
