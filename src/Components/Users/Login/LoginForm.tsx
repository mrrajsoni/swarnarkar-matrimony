/* eslint-disable @typescript-eslint/no-misused-promises */
import { Formik, Form, FormikProps } from 'formik';
import Button from '../../Commons/Button/Button';
import * as Yup from 'yup';
import { useState } from 'react';
import Login from '../../../Utils/API/Login';

export interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    return (
        <section className="form-section">
            <UserLoginForm />
        </section>
    );
};

const UserLoginForm = () => {
    const [showPasswordField, setShowPasswordField] = useState(false);

    const changePasswordVisibility = () => {
        setShowPasswordField((prevState) => !prevState);
    };
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required(),
    });

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                void Login.signInWithEmail(values);
            }}>
            {(props) => (
                <Form method="post" className="registration-form">
                    <EmailInput props={props} />
                    <PasswordInput
                        onPasswordVisibilityChange={changePasswordVisibility}
                        props={props}
                        showPasswordField={showPasswordField}
                    />
                    <Button onClick={undefined} name="Submit" />
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

export default LoginForm;
