<template>
  <AddTask />
  <div v-for="task in tasks" :key="task" class="task-tiles">
    <TaskTile :task="task" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue';
import AddTask from './components/AddTask.vue';
import TaskTile from './components/TaskTile.vue';
import { getTasksList } from './api/tasks.api';

export default {
  name: 'App',
  components: {
    AddTask,
    TaskTile,
  },
  setup() {
    const tasks = ref([]);

    onMounted(async () => {
      tasks.value = await getTasksList();

      tasks.value.sort((a, b) => {
        let dateA = new Date(a.dueDate.split('-').reverse().join('-'));
        let dateB = new Date(b.dueDate.split('-').reverse().join('-'));

        return dateA - dateB;
      });
    });

    return {
      tasks,
    };
  },
};
</script>
