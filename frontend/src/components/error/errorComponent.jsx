import React from 'react';

const ErrorComponent = (props) => {
    const { message } = props;
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    )
}

export default ErrorComponent;

