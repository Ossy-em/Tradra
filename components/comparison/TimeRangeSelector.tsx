'use client';
import { TimeRange } from '@/types/stocks';

type Props = {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
};

const timeRanges: TimeRange[] = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'MAX'];

const TimeRangeSelector = ({ timeRange, setTimeRange }: Props) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-xs text-gray-500 font-medium mr-1 flex-shrink-0">Period:</span>
      <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-lg p-1">
        {timeRanges.map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              timeRange === range
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;