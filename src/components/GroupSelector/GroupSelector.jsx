import React from 'react';
import './GroupSelector.css';

const GroupSelector = ({ onGroupChange, onSortChange, selectedGrouping, selectedSorting }) => {
    return (
        <div className="group-selector">
            <div className="grouping-options">
                <label>Group By: </label>
                <select value={selectedGrouping} onChange={(e) => onGroupChange(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            <div className="sorting-options">
                <label>Sort By: </label>
                <select value={selectedSorting} onChange={(e) => onSortChange(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
    );
};

export default GroupSelector;