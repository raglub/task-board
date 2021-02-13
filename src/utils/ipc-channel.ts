export enum IpcChannel {
    CreateTag = 'createTag',
    CreateTask = 'createTask',
    FindDurationsFromTo = 'findDurationsFromTo',
    FindDurationsForTask = 'findDurationsForTask',
    FindOneTask = 'findOneTask',
    GetAllTags = 'getAllTags',
    FindAllTasks = 'findAllTasks',
    GetVersion = 'getVersion',
    StartTask = 'startTask',
    StopTask = 'stopTask',
    TotalDurationForTask = 'totalDurationForTask',
    UpdateTask = 'updateTask',
    MigrateDurationsToDurationsStore = 'migrateDurationsToDurationsStore'
}
