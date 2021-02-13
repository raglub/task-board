module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'dev.szyma.task-board',
        productName: 'Task Board',
        copyright: 'Copyright © 2020 ${author}',
        publish: {
          provider: 'github',
          owner: 'raglub',
          repo: 'task-board'
        },
        win: {
          icon: 'assets/icons/win/icon.ico'
        },
        nsis: {
          oneClick: false,
          artifactName: "task-board-${version}-${os}64-setup.${ext}",
          perMachine: false,
          createStartMenuShortcut: true,
          runAfterFinish: true
        },
        linux: {
          icon: 'assets/icons/linux/icon.icns',
          target: [
            {
              target: 'deb',
              arch: [
                'x64'
              ]
            }
          ],
          category: 'Utility',
          packageCategory: 'Utility'
        }
      }
    }
  }
}
