// app/api/watchlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { 
  getWatchlistByEmail, 
  addToWatchlist, 
  removeFromWatchlist,
  getWatchlistSymbolsByEmail 
} from '@/lib/actions/watchlist.actions';

// Helper to get user email from Better Auth session
async function getUserEmail(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });
    return session?.user?.email || null;
  } catch (error) {
    console.error('getUserEmail error:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = await getUserEmail(req);
    
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await getWatchlistByEmail(email);
    const symbols = items.map(item => item.symbol);

    return NextResponse.json({ 
      items: symbols,
      details: items // Include full details with company names
    });
  } catch (error) {
    console.error('GET /api/watchlist error:', error);
    return NextResponse.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const email = await getUserEmail(req);
    
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { symbol, company, action } = await req.json();
    
    if (!symbol || !action) {
      return NextResponse.json({ error: 'Missing symbol or action' }, { status: 400 });
    }

    let result;

    if (action === 'add') {
      if (!company) {
        return NextResponse.json({ error: 'Company name required for adding' }, { status: 400 });
      }
      result = await addToWatchlist(email, symbol, company);
    } else if (action === 'remove') {
      result = await removeFromWatchlist(email, symbol);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    // Return updated watchlist
    const symbols = await getWatchlistSymbolsByEmail(email);

    return NextResponse.json({ 
      success: true, 
      action,
      symbol,
      items: symbols,
      message: result.message
    });
  } catch (error) {
    console.error('POST /api/watchlist error:', error);
    return NextResponse.json({ error: 'Failed to update watchlist' }, { status: 500 });
  }
}