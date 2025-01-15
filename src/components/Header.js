import React, { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [comment, setComment] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setComment('');

        // Basic validation
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Name must be exactly 20 characters
        if (name.length >= 20) {
            setComment('Name must be exactly 20 characters.');
            return;
        }

        // Email validation (must be in proper format)
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Password validation (must be at least 8 characters and include a special character)
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters and include a special character');
            return;
        }

        // Example API URL for testing
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';

        // Fetch API call with JSON response
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid name, email, or password');
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                console.log('Login successful:', data);
                setSuccess('Login successful!');
                // Save token or handle response
                // localStorage.setItem('token', data.token);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                {comment && <p className="text-warning">{comment}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength="20"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
