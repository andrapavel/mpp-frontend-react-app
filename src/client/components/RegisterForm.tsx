import React, {useState} from 'react';

interface RegisterFormProps {
    onRegister: (username: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onRegister}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit'>Register</button>
        </form>
    );
};

export default RegisterForm;
