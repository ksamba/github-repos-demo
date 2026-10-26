import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const script = fileURLToPath(new URL('../scripts/validate-handbook.js', import.meta.url));

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'repos-handbook-test-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, 'welcome.txt');
  return {
    write: (content) => writeFileSync(file, content),
    run: () => spawnSync(process.execPath, [script, file], { encoding: 'utf8' })
  };
}

//throwing in a comment
test('accepts a nonempty welcome message and reports the exact text', (t) => {
  const sample = fixture(t);
  sample.write('Welcome to the team handbook.\n');
  const result = sample.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), 'Handbook validation passed: Welcome to the team handbook.');
});

test('rejects an empty message with an explicit error', (t) => {
  const sample = fixture(t);
  sample.write('');
  const result = sample.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Welcome message must not be empty/);
});

test('rejects whitespace-only content', (t) => {
  const sample = fixture(t);
  sample.write(' \r\n\t');
  const result = sample.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Welcome message must not be empty/);
});

test('reports a missing file rather than claiming validation passed', (t) => {
  const sample = fixture(t);
  const result = sample.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ENOENT/);
  assert.equal(result.stdout, '');
});
