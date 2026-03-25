import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

interface Tool {
    name: string;
    icon: string;
}

const tools: Tool[] = [
    { name: 'Wireshark', icon: 'https://cdn.simpleicons.org/wireshark/1679A7' },
    { name: 'Burp Suite', icon: 'https://cdn.simpleicons.org/burpsuite/FF6633' },
    { name: 'Kali Linux', icon: 'https://cdn.simpleicons.org/kalilinux/557C94' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717/ffffff' },
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
];

export const ToolsDock: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<Array<HTMLDivElement | null>>([]);

    const headerText = "{ Core Security Toolkit }";
    const headerChars = headerText.split('');
    const centerIndex = 4;

    useLayoutEffect(() => {
        // GSAP Context to ensure cleanup
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 95%",
                    end: "bottom 30%",
                    scrub: 1.2,
                }
            });



            // 1. Animate Text (Split char stagger)
            const chars = textRef.current?.children;
            if (chars) {
                tl.fromTo(chars,
                    { y: 30, opacity: 0, skewY: 5 },
                    { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: { amount: 0.8, from: "center" }, ease: "power2.out" },
                    0
                );
            }

            // 2. Animate Icons
            const icons = iconsRef.current;
            icons.forEach((icon, index) => {
                if (!icon) return;
                const dist = Math.abs(index - centerIndex);

                tl.fromTo(icon,
                    { y: 100, opacity: 0, rotationX: 45, scale: 0.7 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        scale: index === centerIndex ? 1.3 : 1, // Increased scale for center for emphasis
                        duration: 1.5,
                        ease: "power2.out"
                    },
                    dist * 0.15 + 0.2
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center justify-center overflow-hidden relative py-2 md:py-4">
            <div className="flex flex-col items-center gap-6 w-full max-w-6xl px-4">

                <h2 ref={textRef} className="text-[clamp(0.8rem,4vw,1.8rem)] font-medium text-gray-900 dark:text-gray-100 font-mono text-center leading-tight">
                    {headerChars.map((char, i) => (
                        <span key={i} className="inline-block" style={{ minWidth: char === ' ' ? '0.2em' : 'auto' }}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h2>

                <div className="flex items-center justify-center gap-3 md:gap-5 px-4 py-8" style={{ perspective: '1000px' }}>
                    {tools.map((tool, index) => (
                        <div
                            key={tool.name}
                            ref={(el) => { iconsRef.current[index] = el; }}
                            className={`
                            relative group
                            w-[clamp(2rem,6vw,4rem)] h-[clamp(2rem,6vw,4rem)]
                            rounded-2xl
                            flex items-center justify-center 
                            bg-white dark:bg-white/5
                            shadow-xl
                            cursor-pointer
                            ${index === centerIndex ? 'z-10' : 'z-0'}
                            border border-black/5 dark:border-white/10
                            hover:border-blue-500/50 transition-colors duration-300
                        `}
                        >
                            <img
                                src={tool.icon}
                                alt={tool.name}
                                className="w-full h-full object-cover rounded-2xl transform transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-gray-500 dark:text-gray-300 pointer-events-none whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm border border-gray-100 dark:border-gray-700 z-50">
                                {tool.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
