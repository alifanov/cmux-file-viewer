# cmux-file-viewer

A lightweight local file viewer that runs on port **2222** and renders Mermaid diagrams and Excalidraw scenes directly from absolute file paths. Designed to integrate with [Claude Code](https://claude.ai/code) so that whenever Claude writes a diagram or drawing to disk, it appends a clickable viewer link.

## What it does

| Endpoint | Input | Renders |
|---|---|---|
| `/mermaid?url=<path>` | `.mmd`, `.mermaid`, `.md` | Mermaid diagram (extracts first ` ```mermaid ` block from `.md`) |
| `/excalidraw?url=<path>` | `.excalidraw` (JSON) | Excalidraw scene in read-only view |

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

## Setup

```bash
git clone https://github.com/lifanov/cmux-file-viewer
cd cmux-file-viewer
pnpm install
```

## Running

```bash
# Development (hot reload)
pnpm dev

# Production
pnpm build && pnpm start
```

The server starts on **http://localhost:2222**.

## Usage

Pass an **absolute** file path as the `url` query parameter:

```
http://localhost:2222/mermaid?url=/Users/you/project/diagram.mmd
http://localhost:2222/mermaid?url=/Users/you/project/NOTES.md
http://localhost:2222/excalidraw?url=/Users/you/project/architecture.excalidraw
```

### Quick test

```bash
echo 'graph TD; A-->B-->C' > /tmp/test.mmd
```

Open: http://localhost:2222/mermaid?url=/tmp/test.mmd

## Claude Code integration

Add the following snippet to your `~/.claude/CLAUDE.md` (global) or project-level `CLAUDE.md` so Claude automatically appends viewer links whenever it creates diagram or drawing files:

```markdown
- when creating or writing a Mermaid diagram to a file, always append a viewer link below: `http://localhost:2222/mermaid?url=<absolute-path>`. When creating or writing an Excalidraw file, always append: `http://localhost:2222/excalidraw?url=<absolute-path>`
```

After adding this, Claude will produce output like:

```
I've written the architecture diagram to /Users/you/project/arch.mmd

http://localhost:2222/mermaid?url=/Users/you/project/arch.mmd
```

You can click the link directly from the terminal (most terminals support cmd/ctrl+click).

## Auto-start on login (macOS)

To have the viewer start automatically, create a launchd plist:

```bash
cat > ~/Library/LaunchAgents/com.cmux-file-viewer.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.cmux-file-viewer</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/pnpm</string>
    <string>--dir</string>
    <string>/absolute/path/to/cmux-file-viewer</string>
    <string>start</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.cmux-file-viewer.plist
```

Replace `/absolute/path/to/cmux-file-viewer` with the actual path.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [Mermaid 11](https://mermaid.js.org/)
- [@excalidraw/excalidraw 0.18](https://excalidraw.com/)
- React 19, TypeScript
