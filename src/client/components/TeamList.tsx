// import React from 'react';
// import {Team} from '../types/Team';

// interface TeamListProps {
//     teams: Team[];
//     onDelete: (id: number) => void;
//     onEdit: (id: number) => void;
// }

// const TeamList: React.FC<TeamListProps> = ({teams, onDelete, onEdit}) => {
//     return (
//         <ul>
//             {teams.map((team) => (
//                 <li key={team.id}>
//                     {team.name}
//                     <button onClick={() => onDelete(team.id)}>Delete</button>
//                     <button onClick={() => onEdit(team.id)}>Edit</button>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default TeamList;

import React from 'react';
import {Constructor, Driver, Team} from '../types/Team';

interface ExtendedTeam extends Omit<Team, 'id'> {
    name: string;
    drivers: Driver[];
    constructors: Constructor[];
    id: number;
}

interface TeamListProps {
    teams: ExtendedTeam[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({teams, onDelete, onEdit}) => {
    return (
        <div>
            <h3>Team List</h3>
            <ul>
                {teams.map((team) => (
                    <li key={team.id}>
                        <span>{team.name}</span>
                        <button onClick={() => onEdit(team.id)}>Edit</button>
                        <button onClick={() => onDelete(team.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamList;
