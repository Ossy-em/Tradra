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
    if (!container || container.dataset.loaded) return;


    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = `${height}px`;
    container.appendChild(widgetDiv);


    if (!loadedScripts.has(scriptUrl)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.innerHTML = JSON.stringify(config);
      
      script.onload = () => loadedScripts.add(scriptUrl);
      
      container.appendChild(script);
      scriptRef.current = script;
    } else {

      const script = document.createElement('script');
      script.innerHTML = JSON.stringify(config);
      container.appendChild(script);
      scriptRef.current = script;
    }

    container.dataset.loaded = 'true';


    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.remove();
      }

    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useTradingViewWidget;