import React, { useState, useEffect } from 'react';

const Count = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Componente Renderizado");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            console.log("Count fue cambiado, se renderizó el componente");
        }, 200);
    }, [count]);

    const increment = (e) => {
        e.preventDefault();
        console.log("Incrementando...");
        setCount(count + 1);
    }

    return (
        <div>
            <p>Contador: {count}</p>
            <button onClick={increment}>Incrementar</button>
        </div>
    )
}

export default Count;