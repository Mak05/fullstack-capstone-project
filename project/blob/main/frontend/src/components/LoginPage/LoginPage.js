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

    return React.createElement(
        'div',
        { className: 'min-vh-100 d-flex align-items-center justify-content-center bg-light' },
        React.createElement(
            'div',
            { className: 'card shadow-sm border-0', style: { width: '100%', maxWidth: '420px' } },
            React.createElement(
                'div',
                { className: 'card-body p-4 p-md-5' },
                React.createElement('h2', { className: 'fw-bold mb-3 text-center' }, 'Welcome back'),
                React.createElement('p', { className: 'text-muted text-center mb-4' }, 'Sign in to GiftLink'),
                React.createElement(
                    'form',
                    { onSubmit: handleLogin },
                    React.createElement(
                        'div',
                        { className: 'mb-3' },
                        React.createElement('label', { className: 'form-label' }, 'Email address'),
                        React.createElement('input', {
                            type: 'email',
                            className: 'form-control',
                            placeholder: 'Email',
                            onChange: (e) => setEmail(e.target.value),
                            required: true
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'mb-3' },
                        React.createElement('label', { className: 'form-label' }, 'Password'),
                        React.createElement('input', {
                            type: 'password',
                            className: 'form-control',
                            placeholder: 'Password',
                            onChange: (e) => setPassword(e.target.value),
                            required: true
                        })
                    ),
                    React.createElement('button', { type: 'submit', className: 'btn btn-primary w-100' }, 'Login')
                ),
                React.createElement(
                    'p',
                    { className: 'text-center mt-3 mb-0' },
                    'Need an account? ',
                    React.createElement('a', { href: '/register', className: 'text-decoration-none' }, 'Register')
                )
            )
        )
    );
}

export default LoginPage;
