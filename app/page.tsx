export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: 700 }}>
      <h1>cmux file viewer</h1>
      <p>Local file renderer running on port 2222.</p>

      <h2>Endpoints</h2>
      <ul>
        <li>
          <code>/mermaid?url=/absolute/path/to/diagram.mmd</code>
          <br />
          Supports <code>.mmd</code>, <code>.mermaid</code>, and <code>.md</code> (extracts first{' '}
          <code>```mermaid</code> block).
        </li>
        <li style={{ marginTop: '0.75rem' }}>
          <code>/excalidraw?url=/absolute/path/to/scene.excalidraw</code>
          <br />
          Renders Excalidraw JSON in read-only view mode.
        </li>
      </ul>

      <h2>Quick test</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: 6 }}>
        {`echo 'graph TD; A-->B' > /tmp/test.mmd`}
      </pre>
      <p>
        Then open:{' '}
        <a href="http://localhost:2222/mermaid?url=/tmp/test.mmd">
          /mermaid?url=/tmp/test.mmd
        </a>
      </p>
    </main>
  );
}
