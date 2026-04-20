import fs from 'fs/promises';
import path from 'path';

type Result =
  | { ok: true; content: string }
  | { ok: false; error: string };

export async function readLocalFile(url: string): Promise<Result> {
  if (!url) return { ok: false, error: 'Missing ?url= parameter' };
  if (!path.isAbsolute(url))
    return { ok: false, error: `Path must be absolute, got: ${url}` };

  try {
    const content = await fs.readFile(url, 'utf8');
    return { ok: true, content };
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e.code === 'ENOENT') return { ok: false, error: `File not found: ${url}` };
    if (e.code === 'EACCES') return { ok: false, error: `Permission denied: ${url}` };
    return { ok: false, error: String(e.message) };
  }
}
