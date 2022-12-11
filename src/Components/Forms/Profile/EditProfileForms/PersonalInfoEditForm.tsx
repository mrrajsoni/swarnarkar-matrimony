import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import CustomInput from '../../Input/CustomInput';
import SelectInput from '../../Select/SelectInput';
import CustomTextarea from '../../TextArea/CustomTextarea';
import {
    Gender,
    Gotra,
    Height,
    IndianState,
    Marital_Status,
} from '../../../../Constants/FormOptions';
import { IPersonalDetails } from '../../../../Types/GlobalTypes';
import * as Yup from 'yup';
import Registration from '../../../../Services/API/SignUp';

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('Required')
        .matches(/^[a-zA-Z]+$/, 'Must only be alphabets'),
    last_name: Yup.string()
        .required('Required')
        .matches(/^[a-zA-Z]+$/, 'Must only be alphabets'),
    dob: Yup.string().required('Required'),
    height: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    manglik: Yup.string(),
    self_gotra: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    state: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    city: Yup.string().required('Required'),
    profile_description: Yup.string()
        .required('Required')
        .min(200, 'Please write minimum 200 characters'),
});

const PersonalInfoEditForm = ({
    initialValues,
    onSubmit,
    onCancel,
    userId,
}: {
    initialValues: IPersonalDetails;
    onSubmit: (value: boolean) => void;
    onCancel: (value: boolean) => void;
    userId: string;
}) => {
    const handleSubmit = (values: IPersonalDetails) => {
        const updatedValues = Object.keys(initialValues).reduce((acc, key) => {
            if (initialValues[key] !== values[key]) {
                acc = {
                    ...acc,
                    [key]: values[key],
                };
            }
            return acc;
        }, {});
        void Registration.editProfileUpdate(updatedValues, userId);
        onSubmit(true);
    };
    return (
        <section className="edit-form-section">
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                validationSchema={validationSchema}>
                {(props) => (
                    <Form className="registration-form">
                        <BasicInfo props={props} />
                        <AdditionalBasicInfo props={props} />
                        <div className="flex gap-4 justify-center">
                            <Button name="Submit" type="submit" onClick={undefined} />
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
                    label: 'First Name',
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
            <CustomInput
                props={{
                    id: 'dob',
                    label: 'Date of Birth',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    type: 'date',
                    value: props.values.dob,
                }}
            />
            {props.touched.dob && props.errors.dob ? (
                <div className="error-container">{props.errors.dob}</div>
            ) : null}

            <SelectInput
                isRequired={false}
                label="Gender"
                name="gender"
                onChange={(selectedOption) => {
                    props.setFieldValue('gender', selectedOption);
                }}
                id="gender"
                disabled
                options={Gender}
                value={props.values.gender}
            />

            {props.touched.gender && props.errors.gender ? (
                <div className="error-container">{props.errors.gender.label}</div>
            ) : null}
        </>
    );
};

const AdditionalBasicInfo = ({ props }: { props: FormikProps<IPersonalDetails> }) => {
    return (
        <>
            <CustomInput
                props={{
                    id: 'city',
                    label: 'City',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    type: 'text',
                    value: props.values.city,
                }}
            />

            <SelectInput
                isRequired={false}
                label="State"
                name="state"
                onChange={(selectedOption) => {
                    props.setFieldValue('state', selectedOption);
                }}
                id="state"
                options={IndianState}
                value={props.values.state}
            />

            {props.touched.height && props.errors.height ? (
                <div className="error-container">{props.errors.height.label}</div>
            ) : null}
            {props.touched.city && props.errors.city ? (
                <div className="error-container">{props.errors.city}</div>
            ) : null}
            <SelectInput
                isRequired={false}
                label="Marital Status"
                name="martial_status"
                onChange={(selectedOption) => {
                    props.setFieldValue('martial_status', selectedOption);
                }}
                disabled
                id="martial_status"
                options={Marital_Status}
                value={props.values.martial_status}
            />
            {props.touched.martial_status && props.errors.martial_status ? (
                <div className="error-container">{props.errors.martial_status.label}</div>
            ) : null}
            <SelectInput
                isRequired={false}
                label="Gotra"
                name="self_gotra"
                onChange={(selectedOption) => {
                    props.setFieldValue('self_gotra', selectedOption);
                }}
                id="self_gotra"
                options={Gotra}
                value={props.values.self_gotra}
            />
            {props.touched.self_gotra && props.errors.self_gotra ? (
                <div className="error-container">{props.errors.self_gotra.label}</div>
            ) : null}

            <SelectInput
                isRequired={false}
                label="Height"
                name="height"
                onChange={(selectedOption) => {
                    props.setFieldValue('height', selectedOption);
                }}
                id="height"
                options={Height}
                value={props.values.height}
            />

            {props.touched.height && props.errors.height ? (
                <div className="error-container">{props.errors.height.label}</div>
            ) : null}

            <CustomTextarea
                props={{
                    id: 'profile_description',
                    label: 'Profile Description',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    value: props.values.profile_description,
                    isRequired: false,
                    name: 'profile_description',
                }}
            />
            {props.touched.profile_description && props.errors.profile_description ? (
                <div className="error-container">{props.errors.profile_description}</div>
            ) : null}
        </>
    );
};

export default PersonalInfoEditForm;
