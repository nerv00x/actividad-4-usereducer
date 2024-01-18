import logo from './logo.svg';
import './App.css';
import  { useReducer, useState } from 'react';

// Reducer function
const reducer = (state, action) => {
  //En ambos casos se trabaja con payloadque se entiende como los datos útiles, en el primer caso es un objeto tarea con los atributos
  // del id y el texto, y en el segundo caso, simplemente es el id. De esta forma el manejo de los estados se hace más genérico
switch (action.type) {
  case 'ADD_TASK':
      //Devolvemos el nuevo valor del estado añadiendole la nueva tarea
    return { tasks: [...state.tasks, action.payload] };
  case 'REMOVE_TASK':
      //Devolvemos el nuevo valor del estado eliminadole la  tarea
    return { tasks: state.tasks.filter(task => task.id !== action.payload) };
  default:
      //Caso de que la action no esté definida
    return state;
}
};


// Component
const TaskList = () => {
const [taskInput, setTaskInput] = useState('');
//Declaramos con el useReducer la variable con el estado inicial de vacío
const [state, dispatch] = useReducer(reducer, { tasks: [] });


const addTask = () => {
  if (taskInput.trim() !== '') {
      //Creamos un nuevo objeto tarea, con id y text
    const newTask = { id: Date.now(), text: taskInput };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setTaskInput('');
  }
};


const removeTask = (taskId) => {
  //Directamente recibe dede el button el id de la tarea a eliminar
  //llamamos a dispatch (puedes cambiarle el nombre que desees, aunque dispatch es el convencionalmente aceptado)
  dispatch({ type: 'REMOVE_TASK', payload: taskId });
};


return (
  <div>
    <h2>Task List</h2>
    <ul>
      {state.tasks.map(task => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => removeTask(task.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
    <div>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Agregar Tarea</button>
    </div>
  </div>
);
};


export default TaskList;
