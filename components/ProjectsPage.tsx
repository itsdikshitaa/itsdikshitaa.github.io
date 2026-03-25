import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DynamicNavigation } from './DynamicNavigation';
import { PageVisitsFooter } from './PageVisitsFooter';
import { PixelCard } from './PixelCard';

interface ProjectsPageProps {
    onNavigate: (view: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const PROJECTS = [
    {
        title: 'PassVault',
        desc: 'Privacy-first password utility focused on credential hygiene, secure generation, and optional encrypted local storage in the browser.',
        tags: ['JavaScript', 'Web Crypto', 'Browser Security', 'HTML/CSS'],
        image: 'https://picsum.photos/seed/passvault-page/800/560'
    },
    {
        title: 'BlueBorne Scanner',
        desc: 'Python-based Bluetooth discovery and exposure review project built around BlueBorne-style analysis and protocol-aware scanning.',
        tags: ['Python', 'Bluetooth', 'Linux', 'PyBluez'],
        image: 'https://picsum.photos/seed/blueborne-page/800/560'
    },
    {
        title: 'SOC Learning Lab Roadmap',
        desc: 'A planned home-lab roadmap centered on logs, alerts, concise investigation notes, and repeatable blue-team workflow practice.',
        tags: ['SOC', 'Logs', 'Documentation', 'Workflow'],
        image: 'https://picsum.photos/seed/soc-roadmap-page/800/560'
    },
    {
        title: 'Linux Fundamentals Lab',
        desc: 'Hands-on Linux training work covering administration, networking, service configuration, firewall management, Podman, and NGINX deployment.',
        tags: ['Linux', 'Networking', 'Podman', 'NGINX'],
        image: 'https://picsum.photos/seed/linux-lab-page/800/560'
    }
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="projects"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-5xl mx-auto min-h-screen">
                <div ref={triggerRef} className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-8xl font-serif text-gray-900 dark:text-white mb-6"
                    >
                        Security Work
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-light"
                    >
                        A compact body of work focused on defensive security, analyst readiness, and honest documentation of what is complete.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#111]">
                                <PixelCard
                                    image={project.image}
                                    title={project.title}
                                    desc={project.desc}
                                    tags={project.tags}
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-2xl font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {project.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <PageVisitsFooter />
            </main>
        </>
    );
};
