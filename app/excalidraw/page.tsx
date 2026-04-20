import { readLocalFile } from '@/app/lib/readLocalFile';
import ExcalidrawViewer from './ExcalidrawViewer';

export default async function ExcalidrawPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { url } = await searchParams;
  const result = await readLocalFile(url);

  if (!result.ok) {
    return (
      <pre style={{ color: 'red', padding: '2rem' }}>{result.error}</pre>
    );
  }

  let initialData: object;
  try {
    initialData = JSON.parse(result.content);
  } catch {
    return (
      <pre style={{ color: 'red', padding: '2rem' }}>
        Failed to parse JSON from: {url}
      </pre>
    );
  }

  return <ExcalidrawViewer initialData={initialData} />;
}
