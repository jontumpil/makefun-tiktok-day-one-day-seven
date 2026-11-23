// main.ts — entrypoint for the "Day one, day seven" bounty.
// The video itself lives on TikTok; this program only carries the address
// of that video from the repository into the grader's output directory,
// so the house can read it and fetch the video's public counts.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// The harness tells the program where the repository and the output live;
// both fall back to the working directory layout used when run by hand.
const botDir = process.env.MAKEFUN_BOT_DIR ?? '.';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';

// VIDEO.json holds one field: the full TikTok address of the posted video.
const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

// Read it once to make sure it is well-formed JSON before handing it on.
const parsed = JSON.parse(readFileSync(source, 'utf8'));
if (typeof parsed !== 'object' || parsed === null || typeof parsed.url !== 'string') {
  throw new Error('VIDEO.json must be an object with a string url field');
}

// Make sure the output directory exists, then copy the file byte for byte.
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
