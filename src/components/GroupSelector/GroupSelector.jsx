import React, { useState } from 'react';
import './GroupSelector.css';
import displayIcon from '../../assets/Display.svg'; // Import the SVG as an image

const GroupSelector = ({ onGroupChange, onSortChange, selectedGrouping, selectedSorting }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleGroupChange = (e) => {
        onGroupChange(e.target.value);
        setIsOpen(false);
    };

    const handleSortChange = (e) => {
        onSortChange(e.target.value);
        setIsOpen(false);
    };

    return (
        <div className="group-selector">
            <button className="display-button" onClick={handleButtonClick}>Display
                <img src={displayIcon} alt="Display Icon" className="display-icon" /> {/* Use img tag */}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="grouping-options">
                        <label>Group By: </label>
                        <select value={selectedGrouping} onChange={handleGroupChange} className='group-selector'>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className="sorting-options">
                        <label>Sort By: </label>
                        <select value={selectedSorting} onChange={handleSortChange} className='sort-selector'>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupSelector;
