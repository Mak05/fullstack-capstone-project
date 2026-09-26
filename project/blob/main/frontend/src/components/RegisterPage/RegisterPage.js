import React, { useState } from 'react';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, firstName, lastName })
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('auth-token', data.authtoken);
            sessionStorage.setItem('email', data.email);
            window.location.href = '/app';
        }
    };

    return React.createElement(
        'form',
        { onSubmit: handleRegister },
        React.createElement('input', {
            type: 'text',
            placeholder: 'First Name',
            onChange: (e) => setFirstName(e.target.value),
            required: true
        }),
        React.createElement('input', {
            type: 'text',
            placeholder: 'Last Name',
            onChange: (e) => setLastName(e.target.value),
            required: true
        }),
        React.createElement('input', {
            type: 'email',
            placeholder: 'Email',
            onChange: (e) => setEmail(e.target.value),
            required: true
        }),
        React.createElement('input', {
            type: 'password',
            placeholder: 'Password',
            onChange: (e) => setPassword(e.target.value),
            required: true
        }),
        React.createElement('button', { type: 'submit' }, 'Register')
    );
}

export default RegisterPage;
