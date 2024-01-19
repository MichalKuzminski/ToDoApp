<!-- src/components/TaskTile.vue -->
<template>
  <div
    class="task-tile"
    :class="{
      'completed-task': taskRef.isCompleted,
      'incomplete-task': !taskRef.isCompleted,
    }"
  >
    <h2>{{ taskRef.name }}</h2>
    <p>Priorytet: {{ taskRef.priority }}</p>
    <p>Do kiedy?: {{ taskRef.dueDate }}</p>
    <p>Wykonane? <input type="checkbox" v-model="taskRef.isCompleted" /></p>
    <button @click="removeTask">Usuń zadanie</button>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { completeTask, deleteTask } from '@/api/tasks.api';
export default defineComponent({
  name: 'TaskTile',
  props: {
    task: {
      type: Object,
    },
  },
  setup(props) {
    const taskRef = ref(props.task);

    const setCompleted = async () => {
      await completeTask(taskRef.value.taskId, { ...taskRef.value });
    };

    watch(taskRef.value, async () => {
      try {
        await setCompleted();
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    });

    const removeTask = async () => {
      try {
        await deleteTask(taskRef.value.taskId);
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    };

    return {
      completed: ref(true),
      taskRef,
      removeTask,
    };
  },
});
</script>

<style scoped>
.task-tile {
  margin-left: 40%;
  width: 20%;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.task-tile h2 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.task-tile p {
  margin: 5px 0;
  font-size: 1em;
  color: #666;
}

.task-tile input[type='checkbox'] {
  margin-top: 10px;
}

.task-tile button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-tile button:hover {
  background-color: #0056b3;
}

.completed-task {
  border: 2px solid green;
}

.incomplete-task {
  border: 2px solid red;
}
</style>
