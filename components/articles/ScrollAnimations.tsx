import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const ScrollAnimations: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'overview', title: 'Overview' },
        { id: 'system-basics', title: 'System Basics' },
        { id: 'networking', title: 'Networking' },
        { id: 'operations', title: 'Operations' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="Linux Fundamentals That Improved My Analyst Workflow"
            date="Jul 2025"
            category="Linux"
            prevArticle={{ title: 'SOC Lab Roadmap', id: 'soc-lab-roadmap' }}
            nextArticle={{ title: 'PassVault Browser Security', id: 'passvault-browser-security' }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="overview">
                Linux fundamentals ended up improving more than command familiarity. They improved how I think about systems, services, networking, and the difference between a symptom and the cause behind it.
            </p>

            <h2 id="system-basics" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">System basics</h2>

            <p className="text-gray-800 dark:text-gray-300">
                User management, file permissions, process control, and service behavior sound basic, but they are exactly the kind of basics that make later analyst work easier. They create context when something looks abnormal because you have a clearer picture of what normal administration should look like.
            </p>

            <h2 id="networking" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Networking</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Networking topics were especially useful because they translate directly into triage thinking. Understanding how traffic should move, what a service expects, and how a firewall changes system behavior makes troubleshooting more disciplined.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-mono text-sm text-gray-700 dark:text-gray-300">
                <p>system basics - users, files, processes, services</p>
                <p>network context - interfaces, ports, connectivity, firewalls</p>
                <p>operations - containers, persistence, deployment, repeatability</p>
            </div>

            <h2 id="operations" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Operations</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Container work with Podman and NGINX deployment added an operations mindset that I value. Even at a learning stage, it reinforces the habit of thinking in terms of configuration, dependencies, service state, and reproducible steps.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Linux fundamentals strengthened the kind of reasoning I want to bring into security work: observe carefully, understand the system, document the path, and make the next step obvious.
            </p>

        </ArticleLayout>
    );
};
