'use client';

import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((m) => m.Excalidraw),
  { ssr: false, loading: () => <div style={{ padding: '2rem' }}>Loading…</div> },
);

export default function ExcalidrawViewer({
  initialData,
}: {
  initialData: object;
}) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Excalidraw initialData={initialData} viewModeEnabled />
    </div>
  );
}
