import React, { useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

const SignUp = () => {
    useEffect(() => {
        void getUserData().then((data) => console.log(data));
    }, []);
    return <div>Hi</div>;
};

const getUserData = async () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { data, error, status } = await supabase.from('user_registration').select();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
};

export default SignUp;
