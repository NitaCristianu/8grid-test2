
import { useState, useEffect } from 'react';

const useMouseDown = () => {
    const [mouseDown, setMouseUp] = useState<number>(-1);

    const updateMouseDown = (event: MouseEvent) => {
        setMouseUp(event.button);
    };

    const updateMouseUp = (event: MouseEvent) => {
        setMouseUp(-1);
    };

    useEffect(() => {
        window.addEventListener('mousedown', updateMouseDown);
        window.addEventListener('mouseup', updateMouseUp);

        return () => {
            window.removeEventListener('mousedown', updateMouseDown);
            window.removeEventListener('mouseup', updateMouseUp);
        };
    }, []);

    return mouseDown;
};

export default useMouseDown;
