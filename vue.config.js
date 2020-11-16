module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: "dev.szyma.task-board",
                productName: 'Task Board',
                publish: {
                    provider: "github",
                    owner: "raglub",
                    repo: "task-board"
                },
                win: {
                    icon: "assets/icons/win/icon.ico"
                },
                linux: {
                    icon: 'assets/icons/linux/icon.icns',
                    target: [
                        {
                          "target": "deb",
                          "arch": [
                            "x64",
                            "ia32"
                          ]
                        }
                    ],
                    category: "Utility",
                    packageCategory: "Utility"
                }
            }
        }
    }
}