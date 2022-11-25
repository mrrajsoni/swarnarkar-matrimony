import { Field, Form, Formik, FormikProps } from 'formik';
import Button from '../../../Components/Commons/Button/Button';
import CustomInput from '../../../Components/Forms/Input/CustomInput';
import SelectInput from '../../../Components/Forms/Select/SelectInput';
import { Gender } from '../../../Constants/FormOptions';
import { IPersonalDetails } from '../../../Types/GlobalTypes';

const PersonalInfoEditForm = ({
    initialValues,
    onSubmit,
    onCancel,
}: {
    initialValues: IPersonalDetails;
    onSubmit;
    onCancel: (value: boolean) => void;
}) => {
    return (
        <section className="edit-form-section">
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    // updateUserInformation(values);
                }}
                validationSchema={undefined}>
                {(props) => (
                    <Form className="registration-form">
                        <BasicInfo props={props} />
                        {/* <ReligionInfo props={props} />  */}
                        <div>
                            <Button name="Submit" onClick={onSubmit} />
                            <Button name="Cancel" onClick={() => onCancel(false)} />
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
};

const BasicInfo = ({ props }: { props: FormikProps<IPersonalDetails> }) => {
    return (
        <>
            <CustomInput
                props={{
                    id: 'first_name',
                    label: ' First Name',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    type: 'text',
                    value: props.values.first_name,
                }}
            />
            {props.touched.first_name && props.errors.first_name ? (
                <div className="error-container">{props.errors.first_name}</div>
            ) : null}
            <CustomInput
                props={{
                    id: 'last_name',
                    label: 'Last Name',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    type: 'text',
                    value: props.values.last_name,
                }}
            />
            {props.touched.last_name && props.errors.last_name ? (
                <div className="error-container">{props.errors.last_name}</div>
            ) : null}
            <div className="form-container">
                <div>
                    <label className="required" htmlFor="dob">
                        Date of Birth
                    </label>
                    <input
                        min={'1996-04-12'}
                        id="dob"
                        type="date"
                        onChange={props.handleChange}
                        value={props.values.dob}
                        onBlur={props.handleBlur}
                    />
                </div>

                {props.touched.dob && props.errors.dob ? (
                    <div className="error-container">{props.errors.dob}</div>
                ) : null}
            </div>
            <div className="form-container">
                <div>
                    <label className="required" htmlFor="gender">
                        Gender
                    </label>
                    <SelectInput
                        name="gender"
                        onChange={(selectedOption) => {
                            props.setFieldValue('gender', selectedOption);
                        }}
                        id="gender"
                        disabled
                        options={Gender}
                        value={props.values.gender}
                    />
                </div>

                {props.touched.gender && props.errors.gender ? (
                    <div className="error-container">{props.errors.gender.label}</div>
                ) : null}
            </div>
        </>
    );
};

export default PersonalInfoEditForm;
