import React from 'react';
import {Team} from '../types/Team';

interface TeamListProps {
    teams: Team[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({teams, onDelete, onEdit}) => {
    return (
        <ul>
            {teams.map((team) => (
                <li key={team.id}>
                    {team.name}
                    <button onClick={() => onDelete(team.id)}>Delete</button>
                    <button onClick={() => onEdit(team.id)}>Edit</button>
                </li>
            ))}
        </ul>
    );
};

export default TeamList;
