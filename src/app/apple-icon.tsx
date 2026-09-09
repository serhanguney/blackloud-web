import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** The mark on the page ground, at the size iOS asks for. */
export default function AppleIcon() {
  const mark = readFileSync(join(process.cwd(), 'public/logo.svg'), 'utf8').replace(
    'fill="#000000"',
    'fill="#edebe6"',
  );

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0c0c0c',
      }}
    >
      {/* eslint-disable-next-line nextjs/no-img-element -- ImageResponse renders through satori, not the DOM */}
      <img
        src={`data:image/svg+xml;base64,${Buffer.from(mark).toString('base64')}`}
        width={92}
        height={132}
        alt=""
      />
    </div>,
    size,
  );
}
