import React, {useState} from 'react';
import {Constructor, Driver, Team} from '../types/Team';

interface EntityFormProps {
    onSubmit: (entity: Team) => void;
}

const TeamForm: React.FC<EntityFormProps> = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [selectedDrivers, setSelectedDrivers] = useState<Driver[]>([]);
    const [selectedConstructors, setSelectedConstructors] = useState<
        Constructor[]
    >([]);
    const [totalBudget, setTotalBudget] = useState(100);

    const handleAddEntity = () => {
        const newEntity: Team = {
            id: Date.now(),
            name,
            drivers: selectedDrivers,
            constructors: selectedConstructors,
        };
        onSubmit(newEntity);
        setTotalBudget(100); // Reset total budget
    };

    const handleDriverChange = (driver: Driver) => {
        setSelectedDrivers([...selectedDrivers, driver]);
        setTotalBudget((prevBudget) => prevBudget - driver.cost);
    };

    const handleConstructorChange = (constructor: Constructor) => {
        setSelectedConstructors([...selectedConstructors, constructor]);
        setTotalBudget((prevBudget) => prevBudget - constructor.cost);
    };

    return (
        <div>
            <h2>Add Team</h2>
            <form>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    <label>Select Driver:</label>
                    <select
                        onChange={(e) =>
                            handleDriverChange(JSON.parse(e.target.value))
                        }
                    >
                        <option>Select Driver</option>
                        <option value='{"name": "Charles Leclerc", "cost": 13}'>
                            Charles Leclerc ($13M)
                        </option>
                        <option value='{"name": "Lewis Hamilton", "cost": 12}'>
                            Lewis Hamilton ($15M)
                        </option>
                        <option value='{"name": "Daniel Ricciardo", "cost": 8.5}'>
                            Daniel Ricciardo ($8.5M)
                        </option>
                        <option value='{"name": "Max Verstappen", "cost": 15}'>
                            Max Verstappen ($15M)
                        </option>
                        <option value='{"name": "Fernando Alonso", "cost": 10}'>
                            Fernando Alonso ($10M)
                        </option>
                    </select>
                </div>
                <div>
                    <label>Select Constructor:</label>
                    <select
                        onChange={(e) =>
                            handleConstructorChange(JSON.parse(e.target.value))
                        }
                    >
                        <option>Select Constructor</option>
                        <option value='{"name": "Scuderia Ferrari", "cost": 23}'>
                            Scuderia Ferrari ($23M)
                        </option>
                        <option value='{"name": "Mercedes", "cost": 20}'>
                            Mercedes ($20M)
                        </option>
                        <option value='{"name": "Red Bull Racing", "cost": 25}'>
                            Red Bull Racing ($25M)
                        </option>
                        <option value='{"name": "Aston Martin", "cost": 18}'>
                            Aston Martin ($18M)
                        </option>
                    </select>
                </div>
                <div>Total Budget: {totalBudget}M</div>
                <button type='button' onClick={handleAddEntity}>
                    Add
                </button>
            </form>
        </div>
    );
};

export default TeamForm;
