import { Formik, FormikProps, Form } from 'formik';
import { Gotra } from '../../../../Constants/FormOptions';
import Button from '../../../Commons/Button/Button';
import SelectInput from '../../../Forms/Select/SelectInput';
import * as Yup from 'yup';
import SignUp from '../../../../Utils/API/SignUp';
import { IUser, selectValue } from '../../../../Types/GlobalTypes';
import CustomTextarea from '../../../Forms/TextArea/CustomTextarea';

export interface IUserFamilyData {
    self_gotra: selectValue;
    mother_gotra: selectValue;
    profile_description: string;
}

const FamilyFormIntialValues: IUserFamilyData = {
    self_gotra: { label: '', value: '' },
    mother_gotra: { label: '', value: '' },
    profile_description: '',
};

const validationSchema = Yup.object().shape({
    self_gotra: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    mother_gotra: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }),
    profile_description: Yup.string()
        .required('Required')
        .min(200, 'Please write minimum 200 characters'),
});
const FamilyForm = ({ user }: { user: IUser }) => {
    const updateUserInformation = (values: IUserFamilyData) => {
        void SignUp.updateFamilyInfo(values, user.id);
    };
    return (
        <section className="form-section">
            <Formik
                initialValues={FamilyFormIntialValues}
                onSubmit={(values) => {
                    updateUserInformation(values);
                }}
                validationSchema={validationSchema}>
                {(props) => (
                    <Form className="registration-form">
                        <FamilyDetails props={props} />
                        <Button name="Create Profile" onClick={undefined} />
                    </Form>
                )}
            </Formik>
        </section>
    );
};

const FamilyDetails = ({ props }: { props: FormikProps<IUserFamilyData> }) => {
    return (
        <>
            <SelectInput
                label="Gotra"
                isRequired
                name="self_gotra"
                onChange={(selectedOption) => {
                    props.setFieldValue('self_gotra', selectedOption);
                }}
                id="self_gotra"
                options={Gotra}
                value={props.values.self_gotra}
                placeHolder="Select your gotra"
            />

            {props.touched.self_gotra && props.errors.self_gotra ? (
                <div className="error-container">{props.errors.self_gotra.label}</div>
            ) : null}

            <SelectInput
                name="mother_gotra"
                onChange={(selectedOption) => {
                    props.setFieldValue('mother_gotra', selectedOption);
                }}
                id="mother_gotra"
                options={Gotra}
                value={props.values.mother_gotra}
                label="  Mother Gotra"
                isRequired
            />

            {props.touched.mother_gotra && props.errors.mother_gotra ? (
                <div className="error-container">{props.errors.mother_gotra.label}</div>
            ) : null}

            <CustomTextarea
                props={{
                    id: 'profile_description',
                    label: 'Write about yourself in minimum 200 characters. Mention your ambitions, expectations, likings or dislikings.',
                    onBlur: props.handleBlur,
                    onChange: props.handleChange,
                    value: props.values.profile_description,
                    isRequired: true,
                    name: 'profile_description',
                }}
            />
            {props.touched.profile_description && props.errors.profile_description ? (
                <div className="error-container">{props.errors.profile_description}</div>
            ) : null}
        </>
    );
};

export default FamilyForm;
