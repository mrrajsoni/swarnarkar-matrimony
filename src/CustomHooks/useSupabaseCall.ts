import { useState } from 'react';

export default function useSupabaseCall(callMethod) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    async function callService(...args) {
        setLoading(true);
        try {
            // eslint-disable-next-line prefer-rest-params
            const { data, error } = await callMethod(...args);
            if (error) {
                setError(error);
            } else {
                setData(data);
            }
        } catch {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        callService,
        isLoading,
        error,
        data,
    };
}
