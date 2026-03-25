"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFillTextProps {
    className?: string;
}

export const ScrollFillText: React.FC<ScrollFillTextProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const target = textRef.current;

            if (target) {
                gsap.to(target, {
                    backgroundSize: "200% 200%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        end: "bottom 35%",
                        scrub: true,
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={cn("py-0 flex justify-center w-full", className)}>
            <div className="w-full px-4 md:px-6 relative">
                <p className="text-[clamp(16px,3vw,32px)] font-medium leading-[1.3] tracking-wide text-justify md:text-center text-balance font-serif w-full mx-auto scroll-fill-container">
                    <span
                        ref={textRef}
                        className="scroll-fill-span bg-clip-text text-transparent inline will-change-[background-size]"
                    >
                        I care about methodical investigation, clear documentation, and progress that can be defended. The goal is not to sound experienced before I am. It is to build analyst judgment through repeatable practice, careful notes, and security work that stays honest about what is finished and what is still a roadmap.
                    </span>
                </p>
            </div>
        </section>
    );
};
