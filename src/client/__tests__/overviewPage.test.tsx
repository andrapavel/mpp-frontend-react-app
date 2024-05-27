import {fireEvent, render, screen} from '@testing-library/react';
import EditTeamModal from '../components/EditTeamModal';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import OverviewPage from '../pages/OverviewPage';

// Mock data for testing
const mockTeams = [
    {id: 1, name: 'Team 1', drivers: [], constructors: []},
    {id: 2, name: 'Team 2', drivers: [], constructors: []},
];

// Test for rendering OverviewPage
test('renders OverviewPage', () => {
    render(<OverviewPage />);
    const pageTitle = screen.getByText(/Overview Page/i);
    expect(pageTitle).toBeInTheDocument();
});

// Test for rendering EntityList with mock data
test('renders EntityList with mock data', () => {
    render(
        <TeamList
            teams={mockTeams}
            onDelete={function (_id: number): void {
                throw new Error('Function not implemented.');
            }}
            onEdit={function (_id: number): void {
                throw new Error('Function not implemented.');
            }}
        />,
    );
    const firstTeamName = screen.getByText(/Team 1/i);
    expect(firstTeamName).toBeInTheDocument();
});

// Test for submitting TeamForm
test('submits TeamForm', () => {
    const handleSubmit = jest.fn();
    render(<TeamForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Team Name/i), {
        target: {value: 'New Team'},
    });
    fireEvent.click(screen.getByText(/Add/i));
    expect(handleSubmit).toHaveBeenCalledWith({
        name: 'New Team',
        drivers: [],
        constructors: [],
    });
});

// Test for editing entity with EditTeamModal
test('edits entity with EditTeamModal', () => {
    const handleUpdate = jest.fn();
    render(
        <EditTeamModal
            team={mockTeams[0]}
            onUpdate={handleUpdate}
            onCancel={() => {}}
        />,
    );
    fireEvent.change(screen.getByLabelText(/Team Name/i), {
        target: {value: 'Updated Team'},
    });
    fireEvent.click(screen.getByText(/Save/i));
    expect(handleUpdate).toHaveBeenCalledWith({
        ...mockTeams[0],
        name: 'Updated Team',
    });
});
