import { Form, Formik, FormikProps } from 'formik';
import Button from '../../../Commons/Button/Button';
import CustomInput from '../../Input/CustomInput';
import SelectInput from '../../Select/SelectInput';
import * as Yup from 'yup';
import Registration from '../../../../Services/API/SignUp';
import { ILifestyleDetails } from '../../../../Types/GlobalTypes';
import { Diets, DrinkingSmoking, HandicapNature, YesNo } from '../../../../Constants/FormOptions';

const validationSchema = Yup.object().shape({
    dietary_habit: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    drinking_habit: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    smoking_habit: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    own_car: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    own_house: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    handicapped: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
    nature_handicap: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
    }).nullable(),
});

const LifestyleEditForm = ({
    initialValues,
    onSubmit,
    onCancel,
    userId,
}: {
    initialValues: ILifestyleDetails;
    onSubmit: (value: boolean) => void;
    onCancel: (value: boolean) => void;
    userId: string;
}) => {
    const handleSubmit = (values: ILifestyleDetails) => {
        const updatedValues = Object.keys(initialValues).reduce((acc, key) => {
            if (initialValues[key] !== values[key]) {
                acc = {
                    ...acc,
                    [key]: values[key] === '' ? null : values[key],
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
                        <LifestyleInfo props={props} />
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

const LifestyleInfo = ({ props }: { props: FormikProps<ILifestyleDetails> }) => {
    return (
        <>
            <SelectInput
                isRequired={false}
                label="Dietary Habits"
                name="dietary_habit"
                onChange={(selectedOption) => {
                    props.setFieldValue('dietary_habit', selectedOption);
                }}
                id="dietary_habit"
                options={Diets}
                value={props.values.dietary_habit}
            />

            <SelectInput
                isRequired={false}
                label="Drinking Habits"
                name="drinking_habit"
                onChange={(selectedOption) => {
                    props.setFieldValue('drinking_habit', selectedOption);
                }}
                id="drinking_habit"
                options={DrinkingSmoking}
                value={props.values.drinking_habit}
            />
            <SelectInput
                isRequired={false}
                label="Smoking Habits In"
                name="smoking_habit"
                onChange={(selectedOption) => {
                    props.setFieldValue('smoking_habit', selectedOption);
                }}
                id="smoking_habit"
                options={DrinkingSmoking}
                value={props.values.smoking_habit}
            />
            <SelectInput
                isRequired={false}
                label="Own a house"
                name="own_house"
                onChange={(selectedOption) => {
                    props.setFieldValue('own_house', selectedOption);
                }}
                id="own_house"
                options={YesNo}
                value={props.values.own_house}
            />
            <SelectInput
                isRequired={false}
                label="Own a car"
                name="own_car"
                onChange={(selectedOption) => {
                    props.setFieldValue('own_car', selectedOption);
                }}
                id="own_car"
                options={YesNo}
                value={props.values.own_car}
            />
            <SelectInput
                isRequired={false}
                label="Challenged"
                name="handicapped"
                onChange={(selectedOption) => {
                    props.setFieldValue('handicapped', selectedOption);
                }}
                id="handicapped"
                options={YesNo}
                value={props.values.handicapped}
            />
            {props.values.handicapped?.value === ' physically_birth' ||
            props.values.handicapped?.value === ' physically_accident' ? (
                <SelectInput
                    isRequired={false}
                    label="Nature of the challenge"
                    name="nature_handicap"
                    onChange={(selectedOption) => {
                        props.setFieldValue('nature_handicap', selectedOption);
                    }}
                    id="nature_handicap"
                    options={HandicapNature}
                    value={props.values.nature_handicap}
                />
            ) : null}
        </>
    );
};

export default LifestyleEditForm;
