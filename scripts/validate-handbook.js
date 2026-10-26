import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? new URL('../welcome.txt', import.meta.url);
const message = readFileSync(file, 'utf8').trim();
assert.ok(message.length > 0, 'Welcome message must not be empty');
console.log(`Handbook validation passed: ${message}`);
/* adding a comment */
