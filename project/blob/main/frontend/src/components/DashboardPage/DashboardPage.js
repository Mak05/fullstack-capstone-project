import React from 'react';

function DashboardPage() {
  const email = sessionStorage.getItem('email') || 'User';

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('email');
    window.location.href = '/';
  };

  return React.createElement(
    'div',
    { className: 'container py-5' },
    React.createElement(
      'div',
      { className: 'card shadow-sm border-0' },
      React.createElement(
        'div',
        { className: 'card-body p-4 p-md-5' },
        React.createElement('div', { className: 'd-flex justify-content-between align-items-center mb-4' },
          React.createElement('div', null,
            React.createElement('h1', { className: 'fw-bold mb-1' }, 'GiftLink Dashboard'),
            React.createElement('p', { className: 'text-muted mb-0' }, 'Signed in as: ' + email)
          ),
          React.createElement('button', { type: 'button', className: 'btn btn-outline-secondary', onClick: handleLogout }, 'Logout')
        ),
        React.createElement('div', { className: 'row g-3' },
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('div', { className: 'card bg-primary text-white h-100' },
              React.createElement('div', { className: 'card-body' },
                React.createElement('h5', { className: 'card-title' }, 'Free items'),
                React.createElement('p', { className: 'display-6 mb-0' }, '16')
              )
            )
          ),
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('div', { className: 'card bg-success text-white h-100' },
              React.createElement('div', { className: 'card-body' },
                React.createElement('h5', { className: 'card-title' }, 'Categories'),
                React.createElement('p', { className: 'display-6 mb-0' }, '8')
              )
            )
          ),
          React.createElement('div', { className: 'col-md-4' },
            React.createElement('div', { className: 'card bg-warning text-dark h-100' },
              React.createElement('div', { className: 'card-body' },
                React.createElement('h5', { className: 'card-title' }, 'Active users'),
                React.createElement('p', { className: 'display-6 mb-0' }, '1')
              )
            )
          )
        )
      )
    )
  );
}

export default DashboardPage;
