import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import SelectInput from '../../Select/SelectInput';
import { IFamilyDetails } from '../../../../Types/GlobalTypes';
import * as Yup from 'yup';
import Registration from '../../../../Services/API/SignUp';
import {
    MotherOccupation,
    FatherOccupation,
    Siblings,
    Gotra,
    FamilyStatus,
    FamilyType,
} from '../../../../Constants/FormOptions';

const validationSchema = Yup.object().shape({
    mother_gotra: Yup.object({
        label: Yup.string().required('Required'),
        value: Yup.string(),
    }).nullable(),
    father_occupation: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    brothers: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    sisters: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),

    mother_occupation: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    family_status: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    family_type: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
});

const FamilyEditForm = ({
    initialValues,
    onSubmit,
    onCancel,
    userId,
}: {
    initialValues: IFamilyDetails;
    onSubmit: (value: boolean) => void;
    onCancel: (value: boolean) => void;
    userId: string;
}) => {
    const handleSubmit = (values: IFamilyDetails) => {
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
                        <FamilyInfo props={props} />
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

const FamilyInfo = ({ props }: { props: FormikProps<IFamilyDetails> }) => {
    return (
        <>
            <SelectInput
                isRequired={false}
                label="Mother's Gotra"
                name="mother_gotra"
                onChange={(selectedOption) => {
                    props.setFieldValue('mother_gotra', selectedOption);
                }}
                id="mother_gotra"
                options={Gotra}
                value={props.values.mother_gotra}
            />

            {props.touched.mother_gotra && props.errors.mother_gotra ? (
                <div className="error-container">{props.errors.mother_gotra.label}</div>
            ) : null}

            <SelectInput
                isRequired={false}
                label="Mother's Occupation/Status"
                name="mother_occupation"
                onChange={(selectedOption) => {
                    props.setFieldValue('mother_occupation', selectedOption);
                }}
                id="mother_occupation"
                options={MotherOccupation}
                value={props.values.mother_occupation}
            />

            <SelectInput
                isRequired={false}
                label="Father's Occupation/Status"
                name="father_occupation"
                onChange={(selectedOption) => {
                    props.setFieldValue('father_occupation', selectedOption);
                }}
                id="father_occupation"
                options={FatherOccupation}
                value={props.values.father_occupation}
            />

            <SelectInput
                isRequired={false}
                label="No. of Brothers"
                name="brothers"
                onChange={(selectedOption) => {
                    props.setFieldValue('brothers', selectedOption);
                }}
                id="brothers"
                options={Siblings}
                value={props.values.brothers}
            />

            <SelectInput
                isRequired={false}
                label="No. of Sisters"
                name="sisters"
                onChange={(selectedOption) => {
                    props.setFieldValue('sisters', selectedOption);
                }}
                id="sisters"
                options={Siblings}
                value={props.values.sisters}
            />

            <SelectInput
                isRequired={false}
                label="Family Status"
                name="family_status"
                onChange={(selectedOption) => {
                    props.setFieldValue('family_status', selectedOption);
                }}
                id="family_status"
                options={FamilyStatus}
                value={props.values.family_status}
            />
            <SelectInput
                isRequired={false}
                label="Family Type"
                name="family_type"
                onChange={(selectedOption) => {
                    props.setFieldValue('family_type', selectedOption);
                }}
                id="family_type"
                options={FamilyType}
                value={props.values.family_type}
            />
        </>
    );
};

export default FamilyEditForm;
