import { useMemo, useCallback, useRef, useEffect, useState } from 'react';

const TaskList = ({ tasks, filter, sort, dispatch }) => {
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tasks.length]);

  const processedTasks = useMemo(() => {
    let result = [...tasks];
    if (filter === 'completed') result = result.filter(t => t.completed);
    if (filter === 'pending') result = result.filter(t => !t.completed);

    result.sort((a, b) => {
      if (sort === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
    return result;
  }, [tasks, filter, sort]);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: id });
  }, [dispatch]);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  }, [dispatch]);

  const handleAdd = () => {
    if (newTask.trim() === '') return;
    const task = { id: Date.now(), title: newTask, completed: false };
    dispatch({ type: 'ADD', payload: task });
    setNewTask('');
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input 
          ref={inputRef} 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Ej: Asignar HP EliteDesk 800 a Contabilidad" 
          style={{ width: '300px', padding: '0.5rem' }}
        />
        <button onClick={handleAdd} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>Añadir Equipo</button>
      </div>

      <ul>
        {processedTasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <span 
              onClick={() => handleToggle(task.id)}
              style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer', flex: 1 }}
            >
              {task.title}
            </span>
            <button onClick={() => handleRemove(task.id)}>Retirar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
