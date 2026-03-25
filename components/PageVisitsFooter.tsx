import React, { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';
import { LiquidMetalButton } from './ui/liquid-metal';
import NumberFlow from '@number-flow/react';
import { getOrCreateVisitorId } from '../lib/fingerprint';

export const PageVisitsFooter = () => {
  const [visits, setVisits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasIncremented = useRef(false);

  // Loading animation loop


  useEffect(() => {
    // Prevent double invocation in React.StrictMode during development
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    const trackAndFetchStats = async () => {
      const fingerprint = getOrCreateVisitorId();

      // Track visit (POST) but don't fail hard if increment doesn't work
      try {
        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint }),
          cache: 'no-store'
        });
      } catch (err) {
        console.warn('Visitor increment failed (ignored):', err);
      }

      // Fetch stats (GET) with simple retry and localStorage fallback
      const maxAttempts = 3;
      let attempt = 0;
      let lastError: any = null;
      while (attempt < maxAttempts) {
        try {
          const response = await fetch('/api/visitors', { method: 'GET', cache: 'no-store' });
          if (!response.ok) throw new Error(`status:${response.status}`);
          const data = await response.json();
          if (typeof data.uniqueVisitors === 'number') {
            const value = data.uniqueVisitors;
            setIsLoading(false);
            setTimeout(() => setVisits(value), 100);
            try { localStorage.setItem('uniqueVisitors', String(value)); } catch {}
            return;
          } else {
            throw new Error('unexpected-response');
          }
        } catch (err) {
          lastError = err;
          attempt += 1;
          // small backoff
          await new Promise(r => setTimeout(r, 200 * attempt));
        }
      }

      console.error('Failed to fetch visitor stats after retries:', lastError);
      // Fallback to last known value in localStorage, else 0
      const stored = (() => { try { return Number(localStorage.getItem('uniqueVisitors') ?? '0'); } catch { return 0; } })();
      setIsLoading(false);
      setVisits(Number.isFinite(stored) ? stored : 0);
    };

    trackAndFetchStats();
  }, []);



  const getOrdinalSuffix = (n: number) => {
    // Handle 11,12,13 as special cases
    const v = n % 100;
    if (v >= 11 && v <= 13) return 'th';
    const rem = n % 10;
    if (rem === 1) return 'st';
    if (rem === 2) return 'nd';
    if (rem === 3) return 'rd';
    return 'th';
  };


  return (
    <div className="flex justify-center items-center pointer-events-auto relative z-20">
      <LiquidMetalButton
        size="md"
        shimmer
        borderWidth={4}
        metalConfig={{
          colorBack: "#6b5828",
          colorTint: "#ffd700",
          distortion: 0.2,
          speed: 0.3,
        }}
        className="scale-90 md:scale-100"
      >
        {isLoading ? (
          <span className="animate-pulse">Fetching signal...</span>
        ) : (
          <>
            You are the <NumberFlow value={visits} format={{ useGrouping: true }} className="inline" />{getOrdinalSuffix(visits)} visitor
          </>
        )}
      </LiquidMetalButton>
    </div>
  );
};