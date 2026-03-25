import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, GraduationCap, Linkedin, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { DynamicNavigation } from './DynamicNavigation';
import { PageVisitsFooter } from './PageVisitsFooter';

interface ContactPageProps {
    onNavigate: (view: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const LINKS = [
    { label: 'Primary Email', value: 'dikshitakonwar16@gmail.com', href: 'mailto:dikshitakonwar16@gmail.com', icon: Mail },
    { label: 'University Email', value: 'dikshitakonwar23@lpu.in', href: 'mailto:dikshitakonwar23@lpu.in', icon: Mail },
    { label: 'Phone', value: '+91-9957246744', href: 'tel:+919957246744', icon: Phone },
    { label: 'LinkedIn', value: 'linkedin.com/in/dikshitakonwar05', href: 'https://linkedin.com/in/dikshitakonwar05', icon: Linkedin },
    { label: 'GitHub', value: 'github.com/itsdikshitaa', href: 'https://github.com/itsdikshitaa', icon: Github },
    { label: 'Website', value: 'dikshitaa.tech', href: 'https://dikshitaa.tech', icon: Globe },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="contact"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-5xl mx-auto min-h-screen flex flex-col justify-center">
                <div ref={triggerRef} className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-start mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-8 leading-[0.95]">
                            Open to analyst
                            <br />
                            <span className="text-gray-400 dark:text-gray-600">opportunities.</span>
                        </h1>

                        <div className="space-y-8 text-lg text-gray-600 dark:text-gray-300">
                            <p>
                                I am a cybersecurity student at Lovely Professional University building toward entry-level SOC and blue-team analyst roles through hands-on projects, structured learning, and careful reporting.
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoCard
                                    icon={ShieldCheck}
                                    label="Open to"
                                    value="Internships, student programs, and entry-level cybersecurity analyst roles"
                                />
                                <InfoCard
                                    icon={GraduationCap}
                                    label="Education"
                                    value="B.Tech CSE at Lovely Professional University, CGPA 7.96"
                                />
                                <InfoCard
                                    icon={MapPin}
                                    label="Location"
                                    value="India"
                                />
                                <InfoCard
                                    icon={ShieldCheck}
                                    label="Focus"
                                    value="Monitoring, triage, investigation support, reporting, and network behavior"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-50 dark:bg-[#111] p-8 rounded-3xl border border-gray-200 dark:border-white/5"
                    >
                        <div className="mb-8">
                            <div className="text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">Direct contact</div>
                            <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-3">
                                Best ways to reach me
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                Email is the fastest route. LinkedIn works well for analyst-focused opportunities, mentorship conversations, and project collaboration.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {LINKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/30 px-4 py-4 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">{item.label}</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-200 truncate">{item.value}</p>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <PageVisitsFooter />
            </main>
        </>
    );
};

const InfoCard = ({
    icon: Icon,
    label,
    value
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) => (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/60 dark:bg-white/5 p-4">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 text-blue-500" />
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{label}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{value}</p>
    </div>
);
