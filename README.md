# agent-stuff

Skills, extensions and mods for the coding-agent harnesses I use. Each
harness installs straight from this repo by reading its own manifest.

## Layout

| Path | What | Read by |
| --- | --- | --- |
| `skills/<name>/SKILL.md` | Agent Skills, shared across harnesses | pi (via `package.json`) |
| `pi/extensions/*.ts`, `pi/themes/*.json` | pi-only extensions and themes | pi (via `package.json`) |
| `claude/<plugin>/` | Claude Code plugins/mods, one folder each | Claude Code (via `.claude-plugin/marketplace.json`) |
| `instructions/AGENTS.md` | Global instructions (not at the root, so it isn't read as this repo's project instructions) | linked in by hand, see below |
| `package.json` | pi package manifest (`"pi"` key) | pi |
| `.claude-plugin/marketplace.json` | Claude Code marketplace listing `claude/*` | Claude Code |

Harness-specific code lives under the harness's folder; anything portable
(skills) lives at the top. Adding a harness means adding its manifest and
its folder, nothing moves.

## Install

### pi

```sh
pi install git:github.com/agriffis/agent-stuff
# or, from a local checkout (loaded in place, edits are live):
pi install ~/src/agent-stuff
```

### Claude Code

```sh
claude plugin marketplace add agriffis/agent-stuff
# or, from a local checkout:
claude plugin marketplace add ~/src/agent-stuff

claude plugin install theme-watcher@agent-stuff
```

### Global instructions

No harness installs a global instructions file from a package, so link it
once per machine (assumes a checkout at `~/src/agent-stuff`):

```sh
# pi
ln -sf ~/src/agent-stuff/instructions/AGENTS.md ~/.pi/agent/AGENTS.md

# Claude Code reads CLAUDE.md, which can import other files;
# add Claude-only instructions below the import line
echo '@~/src/agent-stuff/instructions/AGENTS.md' > ~/.claude/CLAUDE.md
```

## Contents

### theme-watcher (pi, Claude Code)

Live-switches the harness theme when `~/bin/scheme` changes the color scheme.

- pi: `pi/extensions/theme-watcher.ts` watches `~/.pi/agent/settings.json`.
- Claude Code: `claude/theme-watcher` polls `~/.claude/theme` (one line, a
  theme name such as `light` or `dark`) and applies it as if picked in
  `/config`.
