import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

// Mock matchMedia for Header's theme handling if necessary
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

describe('Header Component', () => {
    it('renders exactly one navigation role for a11y', () => {
        render(<Header />);
        const navs = screen.getAllByRole('navigation');
        expect(navs).toHaveLength(1);
    });

    it('contains main links structure', () => {
        render(<Header />);
        // Checking if "Home" and "Projects" exist
        const linkNames = ['Home', 'Projects', 'Skills', 'Contact'];
        
        linkNames.forEach(name => {
           // We might get multiple due to desktop/mobile, check at least one is in document
           const links = screen.queryAllByText(name);
           expect(links.length).toBeGreaterThan(0);
        });
    });
});
