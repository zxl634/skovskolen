import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';


export const taskname = "skovskolen"

export default TaskManager.defineTask(taskname, ({ data: { eventType, region }, error }) => {
  if (error) {
    console.log("task manager error: ", error.message)
    // check `error.message` for more details.
    return;
  } else {
    console.log("task manager on")
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
