import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const image = searchParams.get('image'); // URL to the certificate

    const imageUrl = image ? image.replace(/\.pdf$/i, '.jpg') : '';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            position: 'relative',
          }}
        >
          {/* Background Certificate Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          )}

          {/* Watermark Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                transform: 'rotate(-15deg)',
                opacity: 0.6,
              }}
            >
              <span
                style={{
                  fontSize: '90px',
                  fontWeight: 900,
                  color: 'white',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textShadow: '4px 4px 16px rgba(0,0,0,0.8)',
                  whiteSpace: 'nowrap',
                }}
              >
                VERIFIED CREDENTIAL
              </span>
            </div>
          </div>
          
          {/* Badge at the bottom right */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '16px 32px',
              borderRadius: '999px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <span
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#000',
                fontFamily: 'sans-serif',
              }}
            >
              KodRish Innovation
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
