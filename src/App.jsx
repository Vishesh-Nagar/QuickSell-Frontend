import React from 'react';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';  // Adjusted path for KanbanBoard
import './App.css';  // Global styles

const App = () => {
    return (
        <div className="App">
            <h1>Interactive Kanban Board</h1>
            <KanbanBoard />
        </div>
    );
};

export default App;