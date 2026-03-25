import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();
    
    // Call the MiraAI Streaming API
    const response = await fetch('https://miraai-production.up.railway.app/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `External AI error: ${response.status}` },
        { status: response.status }
      );
    }

    // Proxy the streaming response as raw bytes
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
