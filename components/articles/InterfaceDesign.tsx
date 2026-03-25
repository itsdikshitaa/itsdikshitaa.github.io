import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const InterfaceDesign: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'overview', title: 'Overview' },
        { id: 'generation', title: 'Secure Generation' },
        { id: 'storage', title: 'Storage Boundaries' },
        { id: 'documentation', title: 'Documentation' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="Building PassVault with Privacy-First Browser Security"
            date="Jun 2025"
            category="Browser Security"
            nextArticle={{ title: 'BlueBorne Scanner Notes', id: 'blueborne-scanner-notes' }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="overview">
                PassVault started as a simple credential hygiene utility, but the interesting part was never the interface. The interesting part was deciding which security promises a browser-based tool can make honestly, and which ones it cannot.
            </p>

            <h2 id="generation" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Secure generation</h2>

            <p className="text-gray-800 dark:text-gray-300">
                The first priority was secure password generation. Using the Web Crypto API gave me a practical way to avoid weak randomness and keep the project grounded in defensive utility rather than cosmetic security language.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">What mattered most</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Privacy-first design meant reducing unnecessary exposure, keeping the feature set understandable, and making the security tradeoffs visible instead of implied.
                </p>
            </div>

            <h2 id="storage" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Storage boundaries</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Optional encrypted local storage was useful, but it also forced a good question: when does convenience become risk? That boundary shaped the project. I wanted storage to feel optional and explainable, not automatic and overconfident.
            </p>

            <h2 id="documentation" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Documentation</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Writing the project clearly mattered as much as building it. I wanted the portfolio entry to stay honest about what the tool does today: generate passwords securely in the browser, support responsive use, and treat privacy as a design constraint rather than a slogan.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                PassVault is a small project, but it reflects how I want to work in security: careful scope, practical defensive value, and documentation that keeps the claims measurable.
            </p>

        </ArticleLayout>
    );
};
