<template>
  <div class="add-task">
    <h1>ToDo App</h1>
    <h3>Dodaj zadanie</h3>
    <input type="text" v-model="taskName" placeholder="np. odebrać przesyłkę" />
    <p>
      Priorytet:

      <select name="priority" @change="change($event)">
        <option value="niski">Niski</option>
        <option value="sredni">Średni</option>
        <option value="wysoki">Wysoki</option>
      </select>
    </p>
    <p>
      Do kiedy?:
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        :min="currentDate"
        v-model="dueDate"
        max="2030-12-31"
      />
    </p>
    <button @click="saveTask">Dodaj zadanie</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { getCurrentDate } from '../helpers/helpers';
import { addTask } from '../api/tasks.api';
export default defineComponent({
  name: 'AddTask',
  setup() {
    const currentDate = ref(getCurrentDate());
    const taskName = ref('');
    const priority = ref('Niski');
    const dueDate = ref(currentDate.value);

    const change = (e) => {
      priority.value = e.target.options[e.target.options.selectedIndex].text;
    };

    const saveTask = async () => {
      try {
        await addTask({
          name: taskName.value || 'Brak nazwy',
          priority: priority.value || 'Niski',
          dueDate:
            dueDate.value.split('-').reverse().join('-') ||
            currentDate.value.split('-').reverse().join('-'),
          isCompleted: false,
        });
      } catch (err) {
        console.error(err);
      } finally {
        window.location.reload();
      }
    };

    return {
      currentDate,
      taskName,
      priority,
      dueDate,
      change,
      saveTask,
    };
  },
});
</script>

<style scoped>
.add-task {
  margin-left: 40%;
  width: 20%;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.add-task h2 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.add-task p {
  margin: 5px 0;
  font-size: 1em;
  color: #666;
}

.add-task input[type='checkbox'] {
  margin-top: 10px;
}
.add-task input[type='text'] {
  width: 70%;
  border-radius: 5px;
  height: 25px;
}

.add-task button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-task button:hover {
  background-color: #0056b3;
}
</style>
