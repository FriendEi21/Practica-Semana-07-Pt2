import { useReducer, useContext } from 'react';
import tasksReducer, { initialState } from './hooks/useTasksReducer';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import TaskList from './components/TaskList';

const Dashboard = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`dashboard ${theme}`} style={{ padding: '2rem', minHeight: '100vh', background: theme === 'light' ? '#f4f4f9' : '#1e1e2f', color: theme === 'light' ? '#000' : '#fff' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Panel de Asignación - Equipos SFF</h1>
        <button onClick={toggleTheme}>Modo {theme === 'light' ? 'Oscuro' : 'Claro'}</button>
      </header>
      
      <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
        <select onChange={(e) => dispatch({ type: 'FILTER', payload: e.target.value })} value={state.filter} style={{ padding: '0.5rem' }}>
          <option value="all">Todos los equipos</option>
          <option value="pending">Pendientes de entrega</option>
          <option value="completed">Entregados</option>
        </select>

        <select onChange={(e) => dispatch({ type: 'SORT', payload: e.target.value })} value={state.sort} style={{ padding: '0.5rem' }}>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      <main>
        <TaskList tasks={state.items} filter={state.filter} sort={state.sort} dispatch={dispatch} />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
