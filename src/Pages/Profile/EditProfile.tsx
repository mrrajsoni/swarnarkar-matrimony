import { useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import ProfileField from '../../Components/Commons/ProfileField/ProfileField';
import { useUser } from '../../Context/UserContext';
import {
    IContactDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    IPersonalDetails,
} from '../../Types/GlobalTypes';
import CommonUtils from '../../Utils/API/Common Utils/CommonUtils';
import './EditProfile.scss';
import PersonalInfoEditForm from './EditProfileForms/PersonalInfoEditForm';

const EditProfile = () => {
    const [inEditMode, setInEditMode] = useState({
        showPersonalInfoForm: false,
        showCareerInfoForm: false,
        showFamilyInfoForm: false,
        showHobbyInfoForm: false,
    });
    const { user } = useUser();
    const personalDetails: IPersonalDetails = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        height: user?.height,
        self_gotra: user?.self_gotra,
        city: user?.city,
        profile_description: user?.profile_description,
        manglik: user?.manglik,
        dob: user?.dob,
        gender: user?.gender,
        martial_status: user?.martial_status,
        showEditForm: inEditMode.showPersonalInfoForm,
        setShowEditForm: setInEditMode,
    };
    const educationCareerDetails: IEducationCareerDetails = {
        annual_income: user?.annual_income,
        degree: user?.degree,
        employed_in: user?.employed_in,
        occupation: user?.occupation,
    };

    const familyDetails: IFamilyDetails = {
        mother_gotra: user?.mother_gotra,
    };

    const contactDetailsProps: IContactDetails = {
        email_address: user?.email_address,
        mobile_number: user?.mobile_number,
    };
    return (
        <Layout>
            {user?.id ? (
                <section className="edit-profile-page py-10 ">
                    <div className="edit-profile-inner mx-auto">
                        Login
                        <div className="two-cols flex gap-3">
                            <div className="details-col w-9/12">
                                <PersonalDetails props={personalDetails} />
                                <EducationCareerDetails props={educationCareerDetails} />
                                <FamilyDetails props={familyDetails} />
                            </div>
                            <div>
                                <ContactDetails props={contactDetailsProps} />
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
};

const ProfileDetailTitle = ({ title, onClick }: { title: string; onClick: () => void }) => {
    return (
        <div className="details-title flex justify-between">
            {title}
            <div onClick={onClick} className="cursor-pointer">
                Edit
            </div>
        </div>
    );
};

const PersonalDetails = ({ props }: { props: IPersonalDetails }) => {
    const {
        city,
        first_name,
        height,
        last_name,
        self_gotra,
        profile_description,
        manglik,
        dob,
        gender,
        martial_status,
        setShowEditForm,
        showEditForm,
    } = props;

    const age = CommonUtils.getAge(dob);
    const reverseDob = dob.split('').reverse().join('');
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showPersonalInfoForm: value,
            };
        });
    };
    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <h4 className="name-label">
                        <span>Full Name - </span> {first_name} {last_name}
                        <span className="age">
                            &nbsp;({age}Y {gender.label})
                        </span>
                    </h4>
                    <div className="mb-6">{profile_description}</div>
                    <ProfileDetailTitle
                        title="Basic Details"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Date of Birth" field={reverseDob} />
                        <ProfileField label="Height" field={height.label} />
                        <ProfileField label="Marital Status" field={martial_status.label} />
                        <ProfileField label="Gotra" field={self_gotra.label} />
                        <ProfileField label="City" field={city} />
                        <ProfileField label="Manglik" field={manglik ? 'Yes' : 'No'} />
                    </ul>
                </>
            ) : (
                <PersonalInfoEditForm
                    onCancel={handleEditFormVisibility}
                    onSubmit={undefined}
                    initialValues={props}
                />
            )}
        </div>
    );
};

const EducationCareerDetails = ({ props }: { props: IEducationCareerDetails }) => {
    const { annual_income, degree, employed_in, occupation } = props;
    return (
        <div className="details-container">
            <ProfileDetailTitle title="Education & Career" onClick={undefined} />
            <ul>
                <ProfileField label="Annual Income" field={annual_income.label} />
                <ProfileField label="Degree" field={degree} />
                <ProfileField label="Employed In" field={employed_in.label} />
                <ProfileField label="Occupation" field={occupation} />
            </ul>
        </div>
    );
};

const FamilyDetails = ({ props }: { props: IFamilyDetails }) => {
    const { mother_gotra } = props;
    return (
        <div className="details-container">
            <ProfileDetailTitle title="Family" onClick={undefined} />
            <ul>
                <ProfileField label="Mother Gotra" field={mother_gotra.label} />
            </ul>
        </div>
    );
};

const ContactDetails = ({ props }: { props: IContactDetails }) => {
    const { email_address, mobile_number } = props;
    return (
        <div className="details-container contact-details-container p-5 bg-white sticky top-1">
            <ProfileDetailTitle title="Contact Details" onClick={undefined} />
            <ul>
                <ProfileField label="Email Address" field={email_address} />
                <ProfileField label="Mobile Number" field={mobile_number} />
            </ul>
        </div>
    );
};

export default EditProfile;
