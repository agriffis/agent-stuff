import type { Register } from 'claude-code'

// Polls ~/.claude/theme (one line: a theme name such as "light" or "dark",
// written by ~/bin/scheme) and applies it like picking it in /config.
const POLL_MS = 1000

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const path = `${await $.env.get('HOME')}/.claude/theme`

    let lastSeen: string | undefined

    const apply = async (): Promise<void> => {
      let wanted: string
      try {
        wanted = (await $.fs.read(path)).trim()
      } catch {
        return // missing, or mid-write
      }
      if (!wanted || wanted === lastSeen) return
      const isFirst = lastSeen === undefined
      lastSeen = wanted

      const row = (await $.config.list()).find(r => r.key === 'theme')
      if (row?.value === wanted) return
      if (row?.options && !row.options.includes(wanted)) {
        $.ui.toast(`theme-watcher: unknown theme "${wanted}" (have: ${row.options.join(', ')})`)
        return
      }
      const { deny } = await $.config.set({ key: 'theme', value: wanted })
      if (deny) $.ui.toast(`theme-watcher: couldn't set "${wanted}": ${deny}`)
      else if (!isFirst) $.ui.toast(`Theme updated to ${wanted}`)
    }

    await apply()
    $.clock.every(POLL_MS, apply)
    return result
  })
}
