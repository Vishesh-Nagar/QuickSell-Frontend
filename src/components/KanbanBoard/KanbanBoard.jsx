import React, { useState, useEffect } from 'react';
import TicketCard from '../TicketCard/TicketCard';
import GroupSelector from '../GroupSelector/GroupSelector';
import './KanbanBoard.css';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState({});
    const [grouping, setGrouping] = useState(null);
    const [sorting, setSorting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedGrouping = localStorage.getItem('grouping');
        const savedSorting = localStorage.getItem('sorting');

        if (savedGrouping) setGrouping(savedGrouping);
        if (savedSorting) setSorting(savedSorting);

        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => response.json())
            .then(data => {
                const { tickets: ticketsData, users: usersData } = data;

                const userMapping = usersData.reduce((map, user) => {
                    map[user.id] = user.name;
                    return map;
                }, {});

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
        if (grouping) localStorage.setItem('grouping', grouping);
        if (sorting) localStorage.setItem('sorting', sorting);
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
            <GroupSelector
                onGroupChange={handleGrouping}
                onSortChange={handleSorting}
                selectedGrouping={grouping || 'status'}
                selectedSorting={sorting || 'priority'}
            />
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