import {BrowserWindow, BrowserWindowConstructorOptions} from 'electron'

export const createBrowserWindow = async (
  options?: BrowserWindowConstructorOptions,
  withDevTools?: boolean
): Promise<BrowserWindow> => {
  try {
    // Create the browser window.
    const win = new BrowserWindow(
      Object.assign(
        {
          webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
          },
        },
        options
      )
    )

    if (process.env.WEBPACK_DEV_SERVER_URL && withDevTools && !process.env.IS_TEST) {
      let devToolsOpened = false
      win.webContents.on('did-finish-load', () => {
        if (!devToolsOpened) {
          win.webContents.openDevTools()
          devToolsOpened = true
        }
      })
    }

    return win
  } catch (e) {
    console.error('Error in createBrowserWindow:', e)
    throw new Error('Error in createBrowserWindow')
  }
}
