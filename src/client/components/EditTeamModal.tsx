// EditTeamModal.tsx

import React, {useState} from 'react';
import {Team} from '../types/Team';

interface EditTeamModalProps {
    team: Team;
    onUpdate: (updatedTeam: Team) => void;
    onCancel: () => void;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
    team,
    onUpdate,
    onCancel,
}) => {
    const [name, setName] = useState(team.name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({...team, name});
    };

    return (
        <div>
            <h2>Edit Entity</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type='submit'>Save</button>
                <button type='button' onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditTeamModal;
