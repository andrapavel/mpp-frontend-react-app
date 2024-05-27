import {Team} from '../types/Team';

export const fetchTeams = async (): Promise<Team[]> => {
    try {
        const response = await fetch('http://localhost:3000/api/teams');
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
};

export const addTeam = async (team: Team): Promise<void> => {
    try {
        const response = await fetch('http://localhost:3000/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        });
        if (!response.ok) {
            throw new Error('Failed to add team');
        }
    } catch (error) {
        console.error('Error adding team:', error);
    }
};

export const updateTeam = async (updatedTeam: Team): Promise<void> => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/teams/${updatedTeam.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTeam),
            },
        );
        if (!response.ok) {
            throw new Error('Failed to update team');
        }
    } catch (error) {
        console.error('Error updating team:', error);
    }
};

export const deleteTeam = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/api/teams/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete team');
        }
    } catch (error) {
        console.error('Error deleting team:', error);
    }
};
