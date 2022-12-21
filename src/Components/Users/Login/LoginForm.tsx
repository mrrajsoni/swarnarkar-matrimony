/* eslint-disable @typescript-eslint/no-misused-promises */
import { Formik, Form, FormikProps } from 'formik';
import Button from '../../Commons/Button/Button';
import * as Yup from 'yup';
import { useState } from 'react';
import Login, { IloginData } from '../../../Services/API/Login';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import CustomInput from '../../Forms/Input/CustomInput';

export interface LoginFormValues {
    email: string;
    password: string;
}

enum LOGIN_ERRORS {
    EMAIL_NOT_CONFIRMED = 'Email not confirmed',
    INVALID_CREDENTIALS = 'Invalid login credentials',
}
const LoginForm = () => {
    const [loginError, setLoginError] = useState('');
    const [showPasswordField, setShowPasswordField] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (values) => {
        void Login.signInWithEmail(values).then((value) => {
            if (value.error) {
                setLoginError(value.error.message);
            }
        });
    };

    const handleShowPasswordField = () => {
        setShowPasswordField((prevState) => !prevState);
    };

    return (
        <section className="form-section">
            <div className="welcome-message text-center mb-9">Welcome back! Proceed to login</div>
            <UserLoginForm
                handleLogin={handleLogin}
                errorMessage={loginError}
                setShowPasswordField={handleShowPasswordField}
                showPasswordField={showPasswordField}
                navigate={navigate}
            />
            <NewUserPrompt />
        </section>
    );
};

const UserLoginForm = ({
    handleLogin,
    errorMessage,
    showPasswordField,
    setShowPasswordField,
    navigate,
}: {
    handleLogin: (values: IloginData) => void;
    errorMessage: string;
    showPasswordField: boolean;
    setShowPasswordField: () => void;
    navigate: NavigateFunction;
}) => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                handleLogin(values);
            }}>
            {(props) => (
                <Form method="post" className="registration-form">
                    <EmailInput props={props} />
                    <PasswordInput
                        onPasswordVisibilityChange={setShowPasswordField}
                        props={props}
                        showPasswordField={showPasswordField}
                    />
                    <LoginError error={errorMessage} />
                    <ForgotPassword navigate={navigate} />
                    <Button onClick={undefined} type="submit" name="Submit" />
                </Form>
            )}
        </Formik>
    );
};

const EmailInput = ({ props }: { props: FormikProps<LoginFormValues> }) => {
    return (
        <CustomInput
            props={{
                error: props.errors.email,
                fieldTouched: props.touched.email,
                id: 'email',
                label: 'Email Address',
                onBlur: props.handleBlur,
                onChange: props.handleChange,
                type: 'email',
                value: props.values.email,
                isRequired: true,
            }}
        />
    );
};

const PasswordInput = ({
    props,
    showPasswordField,
    onPasswordVisibilityChange,
}: {
    props: FormikProps<LoginFormValues>;
    showPasswordField: boolean;
    onPasswordVisibilityChange: () => void;
}) => {
    return (
        <div className="form-container">
            <div className="relative">
                <CustomInput
                    props={{
                        error: props.errors.password,
                        fieldTouched: props.touched.password,
                        id: 'password',
                        label: 'Password',
                        onBlur: props.handleBlur,
                        onChange: props.handleChange,
                        type: showPasswordField ? 'text' : 'password',
                        value: props.values.password,
                        isRequired: true,
                    }}
                />
                <img
                    onClick={onPasswordVisibilityChange}
                    className="eye-icon absolute"
                    src="https://res.cloudinary.com/rajsoni/image/upload/v1666615487/eye_ge3ubz.png"
                    alt="show-password"
                />
            </div>
        </div>
    );
};

const NewUserPrompt = () => {
    return (
        <div className="new-signup-prompt-message text-center mt-8">
            Here for the first time?
            <span className="register-link cursor-pointer">
                <Link to="/register">Register for Free</Link>
            </span>
        </div>
    );
};

const ForgotPassword = ({ navigate }: { navigate: NavigateFunction }) => {
    const handleNavigation = () => {
        navigate('/forgot-password');
    };
    return (
        <div className="forgot-password-container flex justify-end">
            <div onClick={handleNavigation} className="forgot-password-link cursor-pointer">
                Forgot password?
            </div>
        </div>
    );
};

const LoginError = ({ error }: { error: string }) => {
    switch (error) {
        case LOGIN_ERRORS.EMAIL_NOT_CONFIRMED:
            return <ErrorMessageBox error={error} message=". Resend email confirmation" />;
        case LOGIN_ERRORS.INVALID_CREDENTIALS:
            return (
                <ErrorMessageBox
                    error={error}
                    message=". Please check your email or password again"
                />
            );

        default:
            break;
    }
};

const ErrorMessageBox = ({ error, message }: { error: string; message: string }) => {
    return (
        <div className="error-container">
            {error}
            {message}
        </div>
    );
};

export default LoginForm;
