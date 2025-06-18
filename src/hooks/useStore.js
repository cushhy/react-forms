// ---- файл useStore.js ----
import { useState } from 'react';

const initialState = {
    email: "",
    password: "",
    repeated_password: "",
};

export const useStore = () => {
    const [state, setState] = useState(initialState);

    return {
        getState: () => state,
        updateState: (fieldName, newValue) => {
            setState({ ...state, [fieldName]: newValue });
        },
    };
};