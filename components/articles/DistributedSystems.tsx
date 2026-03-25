import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const DistributedSystems: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'overview', title: 'Overview' },
        { id: 'discovery', title: 'Discovery' },
        { id: 'signals', title: 'Signals' },
        { id: 'reporting', title: 'Reporting' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="BlueBorne Scanner Notes from Bluetooth Exposure Review"
            date="Jul 2025"
            category="Wireless Security"
            prevArticle={{ title: 'PassVault Browser Security', id: 'passvault-browser-security' }}
            nextArticle={{ title: 'SOC Lab Roadmap', id: 'soc-lab-roadmap' }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="overview">
                BlueBorne Scanner pushed me toward a part of security I enjoy: learning how to read device behavior carefully instead of jumping to conclusions from a single signal.
            </p>

            <h2 id="discovery" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Discovery</h2>

            <p className="text-gray-800 dark:text-gray-300 mb-4">
                The project focused on local Bluetooth device discovery and BlueBorne-style exposure review. Using Python and Bluetooth tooling made the work concrete: collect nearby device data, parse responses, and understand what the environment is actually showing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white">Device discovery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Nearby device enumeration created the initial signal set. That meant understanding what is present before deciding what is risky.
                    </p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white">OUI context</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        MAC OUI lookup added enough context to keep the results useful instead of raw and difficult to interpret.
                    </p>
                </div>
            </div>

            <h2 id="signals" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Signals</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Bluetooth work reinforced a good defensive habit: separate signal collection from the final claim. Protocol responses and discovery output are valuable, but they still need interpretation, comparison, and careful wording.
            </p>

            <h2 id="reporting" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Reporting</h2>

            <p className="text-gray-800 dark:text-gray-300">
                What I liked most about this project was the reporting side. A scanner is only useful if the output is understandable. That meant summarizing findings cleanly, keeping the language measured, and pointing to next investigation steps instead of overstating certainty.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                BlueBorne Scanner sits at the intersection of curiosity and discipline for me: wireless behavior, protocol awareness, and reporting that tries to stay credible.
            </p>

        </ArticleLayout>
    );
};
