import { TasksStore } from "@/db/stores/tasksStore";

declare global {
    namespace NodeJS {
        interface Global {
            tasksStore: TasksStore
        }
    }
}
export default global;