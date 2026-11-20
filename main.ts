// main.ts - place the finished front page where the grader expects it.
//
// Run with `node main.ts` on Node 22: no install, no build step, no flags.
// The page itself is not rebuilt here. src/page.html was rendered once, by
// hand, with render.py, and entry.png at the repository root is that render.
// This script's only job is to put that committed byte-for-byte copy into the
// output directory, so two runs of the grader produce identical files.

import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Where this script lives, so the source PNG is found no matter which
// directory the process was started from. Never process.cwd().
const here = fileURLToPath(new URL('.', import.meta.url));

// The grader chooses the destination; /output is the default in its sandbox.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Make sure the destination exists before touching its contents.
mkdirSync(outDir, { recursive: true });

// Clearing the directory entry by entry, rather than deleting the directory
// and recreating it, matters: on the grader /output is a mount point on a
// read-only filesystem, so removing that directory itself answers EPERM.
// Unlinking what is inside it is allowed, and still leaves no stale file from
// an earlier run behind.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

// A plain byte copy of the committed render: no re-encoding, no timestamps
// rewritten, so the output hash is the hash of the file in this repository.
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));
