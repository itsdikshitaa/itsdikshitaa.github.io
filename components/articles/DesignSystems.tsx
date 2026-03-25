import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const DesignSystems: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'overview', title: 'Overview' },
        { id: 'why-roadmap', title: 'Why a Roadmap' },
        { id: 'workflow', title: 'Workflow Design' },
        { id: 'honesty', title: 'Honest Positioning' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="Designing a SOC Learning Lab Without Pretending It Is Production Experience"
            date="2025 Roadmap"
            category="SOC Learning"
            prevArticle={{ title: 'BlueBorne Scanner Notes', id: 'blueborne-scanner-notes' }}
            nextArticle={{ title: 'Linux Fundamentals Notes', id: 'linux-fundamentals-notes' }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="overview">
                One of the clearest values I want my portfolio to show is honesty. The SOC learning lab is a roadmap on purpose. It is where I am building repeatable habits for logs, alerts, and investigation notes, not pretending I already have production analyst experience.
            </p>

            <h2 id="why-roadmap" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Why a roadmap</h2>

            <p className="text-gray-800 dark:text-gray-300">
                The roadmap exists because analyst work depends on repetition. It is not enough to read about triage or log review once. I want a structure that makes me practice alert handling, note quality, and investigation summaries until they become normal rather than occasional.
            </p>

            <h2 id="workflow" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Workflow design</h2>

            <p className="text-gray-800 dark:text-gray-300">
                The workflow focus is simple: collect the signal, interpret it carefully, document what happened, and leave the next person with a clear handoff. Even the lab board on this site is framed around that sequence because I want the tooling and the writing style to reinforce the same habit.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Core practice areas</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Log reading, concise alert triage, investigation notes, and repeatable reporting are the foundation. The goal is readiness through practice, not inflated branding.
                </p>
            </div>

            <h2 id="honesty" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Honest positioning</h2>

            <p className="text-gray-800 dark:text-gray-300">
                I care about separating finished work from learning plans because credibility matters. A roadmap should read like a roadmap. That distinction makes the completed projects stronger, not weaker, because the reader can trust what is already built.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                The SOC learning lab is less about pretending to know everything and more about building analyst judgment step by step in a way that is visible, structured, and defensible.
            </p>

        </ArticleLayout>
    );
};
