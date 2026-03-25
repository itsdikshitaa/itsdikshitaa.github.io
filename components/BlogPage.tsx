import React from 'react';
import { InterfaceDesign } from './articles/InterfaceDesign';
import { DistributedSystems } from './articles/DistributedSystems';
import { DesignSystems } from './articles/DesignSystems';
import { ScrollAnimations } from './articles/ScrollAnimations';
import { BlogListPage } from './BlogListPage';

interface BlogPageProps {
  onNavigate: (view: string, id?: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
  activeArticleId?: string | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, toggleTheme, isDark, activeArticleId }) => {
  if (!activeArticleId) {
    return <BlogListPage onNavigate={onNavigate} toggleTheme={toggleTheme} isDark={isDark} />;
  }

  switch (activeArticleId) {
    case 'blueborne-scanner-notes':
      return <DistributedSystems onNavigate={onNavigate} toggleTheme={toggleTheme} isDark={isDark} />;
    case 'soc-lab-roadmap':
      return <DesignSystems onNavigate={onNavigate} toggleTheme={toggleTheme} isDark={isDark} />;
    case 'linux-fundamentals-notes':
      return <ScrollAnimations onNavigate={onNavigate} toggleTheme={toggleTheme} isDark={isDark} />;
    default:
      return <InterfaceDesign onNavigate={onNavigate} toggleTheme={toggleTheme} isDark={isDark} />;
  }
};
