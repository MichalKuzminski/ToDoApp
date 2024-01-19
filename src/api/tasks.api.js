import axios from 'axios';

const apiUrl = 'https://localhost:7104/api/Tasks';
const getTasksList = async () => {
  try {
    const tasks = await axios.get(apiUrl);
    console.log('tasks api : ', tasks);
    if (!tasks) return [];
    return tasks.data;
  } catch (err) {
    console.error(err);
  }
};

const addTask = async (task) => {
  try {
    const addedTask = await axios.post(apiUrl, task);
    if (addedTask) return addedTask;
  } catch (err) {
    console.error(err);
  }
};

const completeTask = async (id, task) => {
  try {
    const completedTask = await axios.put(`${apiUrl}/${id}`, task);
    if (completedTask) return completedTask;
  } catch (err) {
    console.error(err);
  }
};

const deleteTask = async (id) => {
  try {
    const deletedTask = await axios.delete(`${apiUrl}/${id}`);
    if (deletedTask) return deleteTask;
  } catch (err) {
    console.error(err);
  }
};

export { getTasksList, addTask, completeTask, deleteTask };
