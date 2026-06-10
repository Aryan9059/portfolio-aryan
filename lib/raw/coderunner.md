## Overview

CodeRunner is a competitive programming IDE that runs in the browser. It uses Monaco Editor (the engine behind VS Code) for editing and Judge0 for remote code execution — supporting 40+ languages with zero setup.

## Features

- **Monaco Editor** — Full VS Code keybindings, IntelliSense stubs, multi-cursor
- **Judge0 Integration** — Submits code to Judge0 CE, polls for result, displays stdout/stderr/verdict
- **Test Cases** — Add custom test cases, run all at once, diff expected vs actual output
- **Templates** — One-click starter templates for common CP patterns (segment tree, Dijkstra, etc.)
- **Timer** — Countdown timer with auto-submit for practice contests

## Architecture

```
components/
├── Editor/          # Monaco wrapper with language config
├── TestRunner/      # Test case list + results
├── Toolbar/         # Language selector, run button, timer
└── Output/          # Stdout, stderr, verdict display

lib/
├── judge0.ts        # Submission + polling logic
└── templates.ts     # Per-language starter code
```

## Judge0 Flow

```typescript
// 1. Submit
const { token } = await judge0.submit({ source_code, language_id, stdin });

// 2. Poll until done
while (true) {
  const result = await judge0.getSubmission(token);
  if (result.status.id > 2) return result; // 1=In Queue, 2=Processing
  await sleep(500);
}
```

## Why Not a Server?

Judge0 Community Edition can be self-hosted on any VPS. For this project, the public Judge0 API is used with rate limiting on the client — keeping the app fully static (no backend required).
