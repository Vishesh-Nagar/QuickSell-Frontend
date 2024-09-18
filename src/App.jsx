import React from 'react';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <h1>Interactive Kanban Board</h1>
            <KanbanBoard />
        </div>
    );
};

export default App;