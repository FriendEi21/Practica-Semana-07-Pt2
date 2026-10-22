# Dashboard de Gestión - Asignación de Equipos SFF

## 1. Diagrama de Flujo de Estado y Ciclo de Render
```mermaid
graph TD
    A[Interacción del Usuario] --> B{Tipo de Estado}
    B -->|Tema (UI)| C[ThemeContext]
    C --> D[useLocalStorage guarda preferencia]
    D --> E[Re-render de componentes suscritos]
    B -->|Datos Complejos| F[dispatch(action)]
    F --> G[useTasksReducer procesa 'type']
    G --> H[Generación de estado inmutable]
    H --> I[Re-render del Dashboard]
    I --> J[useMemo recalcula Filtros/Orden]
    J --> K[Re-render de TaskList]
```

## 2. Justificación Técnica de Hooks Utilizados

* **useReducer (vs useState):** Empleado para gestionar el inventario de equipos (`items`, `filter`, `sort`). Justifica su uso al centralizar la lógica de estado complejo y múltiple en un solo lugar, previniendo actualizaciones inconsistentes mediante mutaciones puras.
* **useContext:** Implementado en `ThemeContext` para evitar el "prop drilling". Permite a componentes anidados (como el botón del Header) modificar el tema global sin pasar props manualmente.
* **useLocalStorage:** Hook personalizado creado para abstraer el efecto secundario de interactuar con la API sincrónica `window.localStorage`, manteniendo el código DRY.
* **useEffect:** 
  1. En `ThemeContext`: Sincroniza la clase del `<body>` con el estado global, implementando una función de *cleanup* para evitar fugas de memoria o retención de clases antiguas.
  2. En `TaskList`: Ejecuta un auto-focus en el input dependiente de la longitud del array de items.
* **useMemo:** Memoriza el arreglo `processedTasks`. Evita recalcular costosos métodos `.filter()` y `.sort()` en cada render si los parámetros de dependencia no han mutado.
* **useRef:** Permite referenciar el nodo del DOM del input para disparar `.focus()` de forma imperativa, sin provocar un re-render adicional en el ciclo de React.
* **useCallback:** Estabiliza la referencia en memoria de las funciones `handleRemove` y `handleToggle` pasadas como props al mapeo de la lista, optimizando el rendimiento frente al reconciliador de React.
