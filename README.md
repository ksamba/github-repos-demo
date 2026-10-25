# GitHub Repositories Training

Private training repository for the 90-minute GitHub Repos session in
[ksambademo](https://github.com/ksambademo). No production data, credentials,
application deployment, or third-party dependencies.

## Start Here

The prepared checkout is `C:\Users\Ksamba\source\repos\github-repos-demo`.
Git, Node.js, and GitHub CLI were already installed. No npm install is required.

```powershell
Set-Location C:\Users\Ksamba\source\repos\github-repos-demo
git status --short
git remote -v
git switch main
npm.cmd test
npm.cmd run validate
```

Expect four passing validator tests and `Welcome to the team handbook.`.
`origin` must point to `https://github.com/ksambademo/github-repos-demo.git`.
Do not run these commands in the Playwright, GHAS, or admin-demo checkout.

## Prepared Branches

| Branch | Purpose | Expected validation |
|---|---|---|
| `main` | Original welcome text and CI | Pass |
| `feature/welcome-message` | Two small commits improving the welcome text | Pass |
| `demo/failing-check` | Empty welcome text | Four validator unit tests pass; actual handbook validation fails |
| `demo/revert-preview` | Reverts the feature's welcome-text commit; targets the feature branch | Pass; original welcome text restored |

All demonstration PRs remain unmerged. The reference revert is not proof that
the feature has been merged into or reverted from `main`.

## Required Policy

The repository-scoped `Protect main for training` ruleset is configured after a
successful CI run. It requires a PR, one independent approval, dismissal of stale
approvals, and the `validate-handbook` GitHub Actions check. Force pushes and
branch deletion are blocked. No bypass actors are configured.

Only `ksamba` was visible in organization membership during setup. A separate
consenting reviewer with Write access must be arranged before a live merge.
Do not invite users without approval, disable the review rule, or self-approve
to make the demonstration appear complete.

## Safe Demonstration Flow

1. Inspect this repository's owner, private visibility, description, and settings.
   Use the creation form as a walkthrough without creating a duplicate.
2. Show [the feature PR](https://github.com/ksambademo/github-repos-demo/pulls),
   its commits, linked issue, and passing check.
3. Show the labeled failing-check PR and its failed validation. Do not weaken the check.
4. Show how required review blocks the valid PR even though CI is green.
5. The authorized presenter may arrange independent approval and squash-merge
   the feature during the live demo. Setup does not merge any PR.
6. Only after the real merge, create a new revert branch from updated `main`
   and revert the actual squash commit. Obtain review and checks again.
7. Publish a new release only after validating its actual commit.

### Inspect Without Changing the Prepared State

```powershell
git switch feature/welcome-message
git --no-pager log --oneline --graph --decorate -8
npm.cmd run validate
git switch demo/failing-check
npm.cmd test
npm.cmd run validate
```

The last command must fail with `Welcome message must not be empty`.

```powershell
git switch demo/revert-preview
npm.cmd run validate
git --no-pager log --oneline -5
git --no-pager diff feature/welcome-message...HEAD
git switch main
```

The revert preview restores the old welcome line while retaining the harmless
contribution-guide change from the feature branch.

### Actual Live Revert After an Authorized Squash Merge

Run commands individually; verify each result:

```powershell
git switch main
git pull --ff-only origin main
```

Copy the actual squash commit SHA from the merged feature PR, inspect it with
`git show --stat <sha>`, then create a fresh revert branch and run
`git revert --no-edit <sha>`. Push and open a new PR against `main`.
Do not blindly revert `HEAD`, a merge commit, or the prepared reference branch.
Do not use reset or force-push to undo shared commits.

## Tags and Draft Release

Setup creates an annotated `v0.1.0-demo.1` tag on the tested baseline and an
**unpublished draft prerelease** for that same tag. This is preparation evidence,
not a reviewed feature release, merged PR, application build, or deployment.

For the live post-merge/revert exercise, use a fresh version such as `v0.1.0`.
Verify the target commit and main check first. Never move or force-update the
prepared tag, and do not publish the draft merely to complete setup.
GitHub-generated source archives are not tested binary build artifacts.

## Repeatability and Cleanup

- Preserve the prepared branches, issue, PRs, draft, and tag.
- Create fresh practice branches from `main` instead of resetting example history.
- Return to `main` with a clean working tree after rehearsal.
- Keep private visibility and repository-scoped rules; do not change organization policy.
- Do not commit logs, recordings, reports, secrets, or customer data.
