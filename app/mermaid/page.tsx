import { readLocalFile } from '@/app/lib/readLocalFile';
import MermaidViewer from './MermaidViewer';

function extractMermaid(content: string, filePath: string): string {
  if (filePath.endsWith('.md')) {
    const match = content.match(/```mermaid\r?\n([\s\S]*?)```/);
    return match ? match[1].trim() : content.trim();
  }
  return content.trim();
}

export default async function MermaidPage({
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

  const source = extractMermaid(result.content, url ?? '');

  return <MermaidViewer source={source} />;
}
