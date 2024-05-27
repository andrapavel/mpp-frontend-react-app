// import React, {useEffect, useState} from 'react';
// import EditTeamModal from '../components/EditTeamModal';
// import LoginForm from '../components/LoginForm';
// import RegisterForm from '../components/RegisterForm';
// import TeamForm from '../components/TeamForm';
// import TeamList from '../components/TeamList';
// import {Constructor, Driver, Team} from '../types/Team';

// interface ExtendedTeam extends Omit<Team, 'id'> {
//     name: string;
//     drivers: Driver[];
//     constructors: Constructor[];
//     id: number;
// }

// const OverviewPage: React.FC = () => {
//     const [teams, setTeams] = useState<ExtendedTeam[]>([]);
//     const [selectedTeam, setSelectedTeam] = useState<ExtendedTeam | null>(null);
//     const [sortBy, setSortBy] = useState<'name' | 'id'>('id'); // Default sort by id
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//     const [token, setToken] = useState<string | null>(null);

//     // Fetch entities from API on component mount
//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchData();
//         }
//     }, [isLoggedIn]);

//     const fetchData = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/teams', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch teams');
//             }
//             const data = await response.json();
//             setTeams(data);
//         } catch (error) {
//             console.error('Error fetching teams:', error);
//         }
//     };

//     const handleAddTeam = async (team: ExtendedTeam) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/teams', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(team),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to add team');
//             }
//             const addedTeam = await response.json();
//             setTeams([...teams, addedTeam]);
//         } catch (error) {
//             console.error('Error adding team:', error);
//         }
//     };

//     const handleDeleteTeam = async (id: number) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/teams/${id}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 },
//             );
//             if (!response.ok) {
//                 throw new Error('Failed to delete team');
//             }
//             setTeams(teams.filter((team) => team.id !== id));
//         } catch (error) {
//             console.error('Error deleting team:', error);
//         }
//     };

//     const handleEditTeam = (id: number) => {
//         const teamToEdit = teams.find((team) => team.id === id);
//         if (teamToEdit) {
//             setSelectedTeam(teamToEdit);
//         }
//     };

//     const handleUpdateTeam = async (updatedTeam: ExtendedTeam) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/teams/${updatedTeam.id}`,
//                 {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify(updatedTeam),
//                 },
//             );
//             if (!response.ok) {
//                 throw new Error('Failed to update team');
//             }
//             setTeams(
//                 teams.map((team) =>
//                     team.id === updatedTeam.id ? updatedTeam : team,
//                 ),
//             );
//             setSelectedTeam(null);
//         } catch (error) {
//             console.error('Error updating team:', error);
//         }
//     };

//     // Sort entities by name or id
//     const sortTeams = (sortBy: 'name' | 'id') => {
//         setTeams((prevTeams) =>
//             [...prevTeams].sort((a, b) => {
//                 if (sortBy === 'name') {
//                     return a.name.localeCompare(b.name);
//                 } else {
//                     return a.id - b.id;
//                 }
//             }),
//         );
//     };

//     // Handle user registration
//     const handleRegister = async (username: string, password: string) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({username, password}),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to register');
//             }
//             alert('Registration successful! Please log in.');
//         } catch (error) {
//             console.error('Error registering:', error);
//         }
//     };

//     // Handle user login
//     const handleLogin = async (username: string, password: string) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({username, password}),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to login');
//             }
//             const data = await response.json();
//             setToken(data.token);
//             setIsLoggedIn(true);
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Overview Page</h2>
//             {!isLoggedIn ? (
//                 <div>
//                     <h3>Register</h3>
//                     <RegisterForm onRegister={handleRegister} />
//                     <h3>Login</h3>
//                     <LoginForm onLogin={handleLogin} />
//                 </div>
//             ) : (
//                 <div>
//                     <TeamForm onSubmit={handleAddTeam} />
//                     <div>
//                         <label>Sort By:</label>
//                         <select
//                             value={sortBy}
//                             onChange={(e) =>
//                                 setSortBy(e.target.value as 'name' | 'id')
//                             }
//                         >
//                             <option value='id'>ID</option>
//                             <option value='name'>Name</option>
//                         </select>
//                         <button onClick={() => sortTeams(sortBy)}>Sort</button>
//                     </div>
//                     <TeamList
//                         teams={teams}
//                         onDelete={handleDeleteTeam}
//                         onEdit={handleEditTeam}
//                     />
//                     {selectedTeam && (
//                         <EditTeamModal
//                             team={selectedTeam}
//                             onUpdate={handleUpdateTeam}
//                             onCancel={() => setSelectedTeam(null)}
//                         />
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OverviewPage;

import React, {useEffect, useState} from 'react';
import EditTeamModal from '../components/EditTeamModal';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import {Constructor, Driver, Team} from '../types/Team';

interface ExtendedTeam extends Omit<Team, 'id'> {
    name: string;
    drivers: Driver[];
    constructors: Constructor[];
    id: number;
}

const OverviewPage: React.FC = () => {
    const [teams, setTeams] = useState<ExtendedTeam[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<ExtendedTeam | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'id'>('id'); // Default sort by id
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    // Fetch entities from API on component mount
    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/teams', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch teams');
            }
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const handleAddTeam = async (team: ExtendedTeam) => {
        try {
            const response = await fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(team),
            });
            if (!response.ok) {
                throw new Error('Failed to add team');
            }
            const addedTeam = await response.json();
            setTeams([...teams, addedTeam]);
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    const handleDeleteTeam = async (id: number) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/teams/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (!response.ok) {
                throw new Error('Failed to delete team');
            }
            setTeams(teams.filter((team) => team.id !== id));
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    const handleEditTeam = (id: number) => {
        const teamToEdit = teams.find((team) => team.id === id);
        if (teamToEdit) {
            setSelectedTeam(teamToEdit);
        }
    };

    const handleUpdateTeam = async (updatedTeam: ExtendedTeam) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/teams/${updatedTeam.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedTeam),
                },
            );
            if (!response.ok) {
                throw new Error('Failed to update team');
            }
            setTeams(
                teams.map((team) =>
                    team.id === updatedTeam.id ? updatedTeam : team,
                ),
            );
            setSelectedTeam(null);
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    // Sort entities by name or id
    const sortTeams = (sortBy: 'name' | 'id') => {
        setTeams((prevTeams) =>
            [...prevTeams].sort((a, b) => {
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                } else {
                    return a.id - b.id;
                }
            }),
        );
    };

    // Handle user registration
    const handleRegister = async (username: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            alert('Registration successful! Please log in.');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    // Handle user login
    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const data = await response.json();
            setToken(data.token);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to logout');
            }
            setToken(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h2>Overview Page</h2>
            {!isLoggedIn ? (
                <div>
                    <h3>Register</h3>
                    <RegisterForm onRegister={handleRegister} />
                    <h3>Login</h3>
                    <LoginForm onLogin={handleLogin} />
                </div>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <TeamForm onSubmit={handleAddTeam} />
                    <div>
                        <label>Sort By:</label>
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as 'name' | 'id')
                            }
                        >
                            <option value='id'>ID</option>
                            <option value='name'>Name</option>
                        </select>
                        <button onClick={() => sortTeams(sortBy)}>Sort</button>
                    </div>
                    <TeamList
                        teams={teams}
                        onDelete={handleDeleteTeam}
                        onEdit={handleEditTeam}
                    />
                    {selectedTeam && (
                        <EditTeamModal
                            team={selectedTeam}
                            onUpdate={handleUpdateTeam}
                            onCancel={() => setSelectedTeam(null)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default OverviewPage;
