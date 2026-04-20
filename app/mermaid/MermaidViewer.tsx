'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function MermaidViewer({ source }: { source: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mermaid.initialize({ startOnLoad: false, theme: 'default' });

    mermaid
      .render('mermaid-diagram', source)
      .then(({ svg }) => {
        containerRef.current!.innerHTML = svg;
      })
      .catch((err) => {
        setError(String(err));
      });
  }, [source]);

  if (error) {
    return (
      <pre style={{ color: 'red', padding: '2rem', whiteSpace: 'pre-wrap' }}>
        Mermaid render error:{'\n'}{error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}
    />
  );
}
