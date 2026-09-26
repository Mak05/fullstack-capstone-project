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
        'div',
        { className: 'min-vh-100 d-flex align-items-center justify-content-center bg-light' },
        React.createElement(
            'div',
            { className: 'card shadow-sm border-0', style: { width: '100%', maxWidth: '500px' } },
            React.createElement(
                'div',
                { className: 'card-body p-4 p-md-5' },
                React.createElement('h2', { className: 'fw-bold mb-3 text-center' }, 'Create account'),
                React.createElement('p', { className: 'text-muted text-center mb-4' }, 'Join GiftLink today'),
                React.createElement(
                    'form',
                    { onSubmit: handleRegister },
                    React.createElement(
                        'div',
                        { className: 'row g-3' },
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement('label', { className: 'form-label' }, 'First Name'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                placeholder: 'First Name',
                                onChange: (e) => setFirstName(e.target.value),
                                required: true
                            })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6' },
                            React.createElement('label', { className: 'form-label' }, 'Last Name'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                placeholder: 'Last Name',
                                onChange: (e) => setLastName(e.target.value),
                                required: true
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'mb-3 mt-3' },
                        React.createElement('label', { className: 'form-label' }, 'Email'),
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
                    React.createElement('button', { type: 'submit', className: 'btn btn-success w-100' }, 'Register')
                ),
                React.createElement(
                    'p',
                    { className: 'text-center mt-3 mb-0' },
                    'Already have an account? ',
                    React.createElement('a', { href: '/', className: 'text-decoration-none' }, 'Login')
                )
            )
        )
    );
}

export default RegisterPage;
