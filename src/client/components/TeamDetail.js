// client/components/TeamDetail.js
import React, {useEffect, useState} from 'react';

const TeamDetail = ({teamId}) => {
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/teams/${teamId}`);
                if (!response.ok) {
                    throw new Error('Team not found');
                }
                const data = await response.json();
                setTeam(data);
            } catch (error) {
                console.error('Error fetching team details:', error);
            }
        };
        fetchData();
    }, [teamId]);

    if (!team) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{team.name}</h2>
            <p>Drivers: {team.drivers.join(', ')}</p>
            <p>Constructors: {team.constructors.join(', ')}</p>
        </div>
    );
};

export default TeamDetail;
