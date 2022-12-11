/* eslint-disable @typescript-eslint/no-misused-promises */
import { Formik, Form, FormikProps } from 'formik';
import Button from '../../Commons/Button/Button';
import * as Yup from 'yup';
import { useState } from 'react';
import { IloginData } from '../../../Services/API/Login';
import { Link } from 'react-router-dom';
import { useUser } from '../../../Context/UserContext';

export interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { userLogin } = useUser();

    const handleLogin = (values) => {
        userLogin(values);
    };
    return (
        <section className="form-section">
            <div className="welcome-message text-center mb-9">Welcome back! Proceed to login</div>
            <UserLoginForm handleLogin={handleLogin} />
            <NewUserPrompt />
        </section>
    );
};

const UserLoginForm = ({ handleLogin }: { handleLogin: (values: IloginData) => void }) => {
    const [showPasswordField, setShowPasswordField] = useState(false);

    const changePasswordVisibility = () => {
        setShowPasswordField((prevState) => !prevState);
    };

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
                        onPasswordVisibilityChange={changePasswordVisibility}
                        props={props}
                        showPasswordField={showPasswordField}
                    />
                    <ForgotPassword />
                    <Button onClick={undefined} type="submit" name="Submit" />
                </Form>
            )}
        </Formik>
    );
};

const EmailInput = ({ props }: { props: FormikProps<LoginFormValues> }) => {
    return (
        <div className="form-container">
            <div>
                <div>
                    <label className="required" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={props.handleChange}
                        value={props.values.email}
                        onBlur={props.handleBlur}
                    />
                </div>

                {props.touched.email && props.errors.email ? (
                    <div className="error-container">{props.errors.email}</div>
                ) : null}
            </div>
        </div>
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
            <div>
                <div>
                    <label className="required" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        {showPasswordField ? (
                            <input
                                id="password"
                                name="password"
                                type="text"
                                onChange={props.handleChange}
                                value={props.values.password}
                                onBlur={props.handleBlur}
                            />
                        ) : (
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={props.handleChange}
                                value={props.values.password}
                                onBlur={props.handleBlur}
                            />
                        )}
                        <img
                            onClick={onPasswordVisibilityChange}
                            className="eye-icon absolute"
                            src="https://res.cloudinary.com/rajsoni/image/upload/v1666615487/eye_ge3ubz.png"
                            alt="show-password"
                        />
                    </div>
                </div>

                {props.errors.password && props.touched.password ? (
                    <div className="error-container">{props.errors.password}</div>
                ) : null}
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

const ForgotPassword = () => {
    return (
        <div className="forgot-password-container flex justify-between">
            <div className="forgot-password-link cursor-pointer">Forgot password?</div>
        </div>
    );
};

export default LoginForm;
