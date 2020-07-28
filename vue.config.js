module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: "dev.szyma.task-board",
                publish: {
                    provider: "github",
                    owner: "raglub",
                    repo: "task-board"
                }
            }
        }
    }
}