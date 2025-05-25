import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Server-side requests are not subject to CORS restrictions
    const response = await fetch('https://sandbox.cruisebound-qa.com/sailings', {
      headers: {
        'Content-Type': 'application/json',
      },
      // This ensures the request is made fresh each time
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data with appropriate CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sailings data' },
      { status: 500 }
    );
  }
}
