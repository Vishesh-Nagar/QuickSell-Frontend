import React from 'react';
import './GroupSelector.css';  // CSS for styling the group and sort selectors

const GroupSelector = ({ onGroupChange, onSortChange, sorting, grouping }) => {
    return (
        <div className="group-selector">
            <div className="grouping-options">
                <label>Group By: </label>
                <select onChange={(e) => onGroupChange(e.target.value)} defaultValue={grouping}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            <div className="sorting-options">
                <label>Sort By: </label>
                <select onChange={(e) => onSortChange(e.target.value)} defaultValue={sorting} defaultChecked={sorting}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
    );
};

export default GroupSelector;