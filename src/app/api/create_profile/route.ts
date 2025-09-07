/**
 * Profile Creation API Proxy Route
 * 
 * Local proxy to handle CORS issues during development
 * Forwards requests to the external Vercel API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    
    console.log('🔄 API Proxy: Received data:', JSON.stringify(body, null, 2));
    
    // Validate the data before forwarding
    const requiredFields = ['key', 'name', 'lastname', 'picture', 'location', 'age', 'gender', 'height', 'weight'];
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        console.error(`❌ Missing field: ${field}, value:`, body[field]);
        return NextResponse.json(
          { 
            error: 'Validation failed',
            details: `Missing or empty required field: ${field}`,
            field: field,
            value: body[field]
          },
          { status: 400 }
        );
      }
    }

    console.log('✅ API Proxy: All fields validated, forwarding to external API...');

    // Forward to external Vercel API
    const externalResponse = await fetch('https://man-vs-machine-vert.vercel.app/api/create_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('📡 External API response status:', externalResponse.status);

    // Get response text first to handle both JSON and text responses
    const responseText = await externalResponse.text();
    console.log('📡 External API response:', responseText);

    if (!externalResponse.ok) {
      console.error('❌ External API error:', responseText);
      return NextResponse.json(
        { 
          error: 'External API call failed',
          details: `${externalResponse.status} ${externalResponse.statusText}`,
          response: responseText
        },
        { status: externalResponse.status }
      );
    }

    // Try to parse as JSON, fallback to text
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      result = { message: responseText };
    }

    console.log('✅ External API success:', result);

    // Return the result
    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('💥 API Proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
  console.log('🔧 API Proxy: Handling OPTIONS request');
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
