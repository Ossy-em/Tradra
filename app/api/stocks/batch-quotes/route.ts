// app/api/stocks/batch-quotes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBatchQuotes } from '@/lib/actions/finnhub.actions';

export async function POST(req: NextRequest) {
  try {
    const { symbols } = await req.json();

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json({ error: 'Invalid symbols array' }, { status: 400 });
    }

    const quotes = await getBatchQuotes(symbols);

    // Transform Finnhub response to our format
    const stockData: Record<string, any> = {};
    
    for (const [symbol, quote] of Object.entries(quotes)) {
      stockData[symbol] = {
        symbol,
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
        high: quote.h,
        low: quote.l,
        open: quote.o,
        previousClose: quote.pc,
      };
    }

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Batch quotes error:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

// Optional: Also support GET for simple queries
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const symbolsParam = searchParams.get('symbols');
    
    if (!symbolsParam) {
      return NextResponse.json({ error: 'Missing symbols parameter' }, { status: 400 });
    }

    const symbols = symbolsParam.split(',').map(s => s.trim()).filter(Boolean);
    const quotes = await getBatchQuotes(symbols);

    const stockData: Record<string, any> = {};
    
    for (const [symbol, quote] of Object.entries(quotes)) {
      stockData[symbol] = {
        symbol,
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
        high: quote.h,
        low: quote.l,
        open: quote.o,
        previousClose: quote.pc,
      };
    }

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Batch quotes error:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}