'use client';

import React, { memo } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div
      className={cn(
        "flex flex-col bg-[var(--foreground)]/5 border border-[var(--border)] rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-shadow duration-300 p-4",
        className
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3 tracking-tight">
          {title}
        </h3>
      )}
      <div
        className="tradingview-widget-container rounded-md overflow-hidden"
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        />
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
