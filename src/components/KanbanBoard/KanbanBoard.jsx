import React, { useState, useEffect } from 'react';
import TicketCard from '../TicketCard/TicketCard';
import GroupSelector from '../GroupSelector/GroupSelector';
import './KanbanBoard.css';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState({});
    const [grouping, setGrouping] = useState("nset");
    const [sorting, setSorting] = useState("nset");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve saved state from localStorage
        const savedGrouping = localStorage.getItem('grouping');
        const savedSorting = localStorage.getItem('sorting');
        console.log('getItem')
        console.log(savedGrouping)
        console.log(savedSorting)
        // Apply saved preferences if available

        if (savedGrouping !== "nset") {
            setGrouping(savedGrouping);
        } else {
            setGrouping('Status')
        }
        if (savedSorting !== "nset") {
            console.log("inside if")
            setSorting(savedSorting);
        } else {
            setSorting('Priority')
        }

        // Fetch data from API
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => response.json())
            .then(data => {
                const { tickets: ticketsData, users: usersData } = data;

                // Create a mapping from userId to userName
                const userMapping = usersData.reduce((map, user) => {
                    map[user.id] = user.name;
                    return map;
                }, {});

                // Map tickets to include userName instead of userId
                const validatedTickets = ticketsData.map(ticket => ({
                    ...ticket,
                    user: userMapping[ticket.userId] || 'Unknown User'
                }));

                setTickets(validatedTickets);
                setUsers(userMapping);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Save grouping and sorting state to localStorage
        console.log("before save", grouping)
        console.log("before save", sorting)
        if (grouping !== "nset") {
            localStorage.setItem('grouping', grouping);
        }
        if (sorting !== "nset") {
            localStorage.setItem('sorting', sorting);
        }
    }, [grouping, sorting]);

    const groupByStatus = (tickets) => {
        return tickets.reduce((groups, ticket) => {
            const group = groups[ticket.status] || [];
            group.push(ticket);
            groups[ticket.status] = group;
            return groups;
        }, {});
    };

    const groupByUser = (tickets) => {
        return tickets.reduce((groups, ticket) => {
            const group = groups[ticket.user] || [];
            group.push(ticket);
            groups[ticket.user] = group;
            return groups;
        }, {});
    };

    const groupByPriority = (tickets) => {
        return tickets.reduce((groups, ticket) => {
            const group = groups[ticket.priority] || [];
            group.push(ticket);
            groups[ticket.priority] = group;
            return groups;
        }, {});
    };

    const sortTickets = (tickets) => {
        if (sorting === 'priority') {
            return [...tickets].sort((a, b) => String(a.priority).localeCompare(String(b.priority)));
        }
        return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    };

    const handleGrouping = (option) => {
        setGrouping(option);
    };

    const handleSorting = (option) => {
        setSorting(option);
    };

    const getGroupedTickets = () => {
        let groupedTickets = {};
        if (grouping === 'status') {
            groupedTickets = groupByStatus(tickets);
        } else if (grouping === 'user') {
            groupedTickets = groupByUser(tickets);
        } else if (grouping === 'priority') {
            groupedTickets = groupByPriority(tickets);
        }
        return groupedTickets;
    };

    const groupedTickets = getGroupedTickets();

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <GroupSelector onGroupChange={handleGrouping} onSortChange={handleSorting} sorting grouping />
            <div className="kanban-board">
                {Object.entries(groupedTickets).map(([group, groupTickets]) => (
                    <div key={group} className="kanban-column">
                        <h2>{group}</h2>
                        {sortTickets(groupTickets).map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;