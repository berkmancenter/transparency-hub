import { NextRequest, NextResponse } from 'next/server'


async function handleRequest(request: NextRequest, method: 'GET' | 'HEAD') {
  const url = request.nextUrl.searchParams.get('url')

  console.log(`[Proxy] ${method} request received for:`, url)

  if (!url || !url.startsWith('https://storage.googleapis.com/')) {
    console.error('[Proxy] Invalid URL:', url)
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  try {
    console.log('[Proxy] Fetching from GCS...', url)
    const response = await fetch(url, {
      method: method,
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    })

    console.log('[Proxy] GCS response status:', response.status)

    if (!response.ok) {
      console.error('[Proxy] GCS fetch failed:', response.status, response.statusText)
      return NextResponse.json(
        { error: `Failed to fetch: ${response.statusText}` },
        { status: response.status }
      )
    }

    if (method === 'HEAD') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
          'Content-Length': response.headers.get('Content-Length') || '0',
        },
      })
    }

    const data = await response.arrayBuffer()
    console.log('[Proxy] Successfully fetched, size:', data.byteLength)

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Length': data.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error('[Proxy] Error:', error)
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET')
}

export async function HEAD(request: NextRequest) {
  return handleRequest(request, 'HEAD')
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}