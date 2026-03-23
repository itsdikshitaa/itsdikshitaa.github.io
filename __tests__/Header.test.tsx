import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("Header Component", () => {
  it("renders exactly one navigation role for a11y", () => {
    render(<Header />);
    const navs = screen.getAllByRole("navigation");
    expect(navs).toHaveLength(1);
  });

  it("contains the cybersecurity portfolio link structure", () => {
    render(<Header />);
    const linkNames = [
      "Home",
      "Profile",
      "Investigations",
      "Toolkit",
      "Learning",
      "Resume",
      "Contact",
    ];

    linkNames.forEach((name) => {
      const links = screen.queryAllByText(name);
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
