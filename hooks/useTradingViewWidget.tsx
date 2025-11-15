'use client';
import { useEffect, useRef } from "react";

const loadedScripts = new Set<string>();

const useTradingViewWidget = (
  scriptUrl: string, 
  config: Record<string, unknown>, 
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear container first
    container.innerHTML = '';

    // Create widget div
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = `${height}px`;
    container.appendChild(widgetDiv);

    // Create script with config
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify(config);
    
    container.appendChild(script);
    scriptRef.current = script;

    return () => {
      // Clean up script only
      if (scriptRef.current?.parentNode) {
        scriptRef.current.remove();
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useTradingViewWidget;