import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('auth-token') || ''}`
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('auth-token', data.authtoken);
            sessionStorage.setItem('email', data.email);
            window.location.href = '/app';
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;