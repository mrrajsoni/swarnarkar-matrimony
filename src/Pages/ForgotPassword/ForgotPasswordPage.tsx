import { Form, Formik } from 'formik';
import Layout from '../../Components/Commons/Layout/Layout';
import * as Yup from 'yup';
import CustomInput from '../../Components/Forms/Input/CustomInput';
import Button from '../../Components/Commons/Button/Button';
import './ForgotPassword.scss';
import useSupabaseCall from '../../CustomHooks/useSupabaseCall';
import Login from '../../Services/API/Login';
import { useEffect, useRef, useState } from 'react';
import { SIGN_UP } from '../../Constants/UserMessages';

const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Address is required'),
});

const ForgotPasswordPage = () => {
    const timerRef = useRef(null);
    const [disableButton, setDisableButton] = useState(false);

    const handlePasswordRecovery = (email: string) => {
        void Login.sendPasswordRecovery(email);
    };

    const makeButtonDisable = () => {
        timerRef.current = setTimeout(() => {
            setDisableButton(false);
        }, 60000);
    };
    const { callService, data, error, isLoading } = useSupabaseCall(handlePasswordRecovery);
    useEffect(() => {
        if (isLoading) {
            setDisableButton(true);
        } else if (error) {
            console.log(error.message);
        }
    }, [isLoading, error]);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    const handleOnSubmit = (value: string) => {
        void callService(value);
        makeButtonDisable();
    };

    return (
        <Layout>
            <section className="forgot-password-page py-10">
                <div className="form-section">
                    <h3>Forgot password?</h3>
                    <p>
                        Enter the email address associated with your account and we will send you a
                        link to reset your password.
                    </p>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        onSubmit={(values) => {
                            handleOnSubmit(values.email);
                        }}
                        validationSchema={emailSchema}>
                        {(props) => (
                            <Form className="forgot-password-form mt-6">
                                <CustomInput
                                    props={{
                                        error: props.errors.email,
                                        fieldTouched: props.touched.email,
                                        id: 'email',
                                        label: 'Email address',
                                        onBlur: props.handleBlur,
                                        onChange: props.handleChange,
                                        type: 'email',
                                        value: props.values.email,
                                        isRequired: true,
                                    }}
                                />
                                <Button
                                    className="forgot-password-button"
                                    disabled={disableButton || isLoading}
                                    name="Send Recovery Link"
                                    type="submit"
                                    onClick={undefined}
                                />
                            </Form>
                        )}
                    </Formik>
                    {disableButton ? (
                        <div className="email-sent-message text-center mt-4 underline">
                            {SIGN_UP.FORGOT_PASSWORD}
                        </div>
                    ) : null}
                </div>
            </section>
        </Layout>
    );
};

export default ForgotPasswordPage;
