import { useState } from 'react';

/* const initialAuthState: AuthState = {
    email: {
        value: '',
        isValid: true,
        key: 'email'
    },
    username: {
        value: '',
        isValid: true,
        key:  'username'
    },
    password: {
        value: '',
        isValid: true,
        key: 'password'
    }
}
 */

function useForm(initialState, validationObject) {
    const [formData, setFormData] = useState(initialState);

    const onInputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const newState = Object.fromEntries(Object.entries(formData).map(([key, authObj]) => {
            if (key === name) {
                return [
                    key, 
                    { 
                        value: value, 
                        isValid: 
                        validationObject && validationObject[name] 
                            ? validationObject[name].test(value) 
                            : true 
                    }
                ];
            }
            return [
                key, 
                authObj
            ];
        }));

        setFormData(newState);
    };

    const clearInputFields = () => {
        setFormData(initialState);
    }

    return [
        formData,
        onInputChangeHandler,
        clearInputFields
    ];
}

export default useForm;