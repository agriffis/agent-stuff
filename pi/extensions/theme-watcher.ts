import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import type { ExtensionAPI } from '@earendil-works/pi-coding-agent'

interface Settings {
  theme?: string
  [key: string]: unknown
}

export default function themeWatcherExtension(pi: ExtensionAPI): void {
  const settingsPath = path.join(os.homedir(), '.pi', 'agent', 'settings.json')
  const settingsDir = path.dirname(settingsPath)
  const targetFilename = path.basename(settingsPath)

  let currentTheme: string | null = null
  let watcher: fs.FSWatcher | null = null

  pi.on('session_start', async (_event, ctx) => {
    const applyTheme = (): void => {
      if (!fs.existsSync(settingsPath)) return
      try {
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) as Settings
        if (settings.theme && settings.theme !== currentTheme) {
          currentTheme = settings.theme
          const result = ctx.ui.setTheme(currentTheme)
          if (result.success) {
            ctx.ui.notify(`Theme updated to ${currentTheme}`, 'info')
          } else {
            ctx.ui.notify(`Failed to apply theme "${currentTheme}": ${result.error}`, 'error')
          }
        }
      } catch { /* ignore transient read/parse errors during atomic writes */ }
    }

    applyTheme()

    watcher = fs.watch(settingsDir, () => applyTheme())
  })

  pi.on('session_shutdown', () => {
    watcher?.close()
    watcher = null
  })
}
