import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useStore } from 'react-redux';

interface RootState {
    app: {
        wasLogout: boolean;
    };
}

export const useResetForm = (reset: UseFormReset<any>) => {
    const store = useStore();

    useEffect(() => {
        let currentLogout = (store.getState() as RootState).app.wasLogout;
        return store.subscribe(() => {
            let prevLogout = currentLogout;
            currentLogout = (store.getState() as RootState).app.wasLogout;

            if (prevLogout !== currentLogout) {
                reset();
            }
        });
    }, [reset, store]);
};
