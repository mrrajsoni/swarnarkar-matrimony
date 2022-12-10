import { useState } from 'react';
import Layout from '../../Components/Commons/Layout/Layout';
import ProfileField from '../../Components/Commons/ProfileField/ProfileField';
import { useUser } from '../../Context/UserContext';
import {
    IContactDetails,
    IDesiredPartnerDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    ILifestyleDetails,
    IPersonalDetails,
    IProfileImageDetails,
} from '../../Types/GlobalTypes';
import CommonUtils from '../../Utils/API/Common Utils/CommonUtils';
import './EditProfile.scss';
import CareerEducationEditForm from './EditProfileForms/CareerEducationEditForm';
import DesiredPartnerEditForm from './EditProfileForms/DesiredPartnerEditForm';
import FamilyEditForm from './EditProfileForms/FamilyEditForm';
import ImageEditForm from './EditProfileForms/ImageEditForm';
import LifestyleEditForm from './EditProfileForms/LifestyleEditForm';
import PersonalInfoEditForm from './EditProfileForms/PersonalInfoEditForm';
import UserImages from './UserImages';

const initialFormState = {
    showPersonalInfoForm: false,
    showCareerInfoForm: false,
    showFamilyInfoForm: false,
    showLifestyleForm: false,
    showDesiredPartnerForm: false,
    showProfileImageForm: false,
};

export type setShowEditFormType = React.Dispatch<
    React.SetStateAction<{
        showPersonalInfoForm: boolean;
        showCareerInfoForm: boolean;
        showFamilyInfoForm: boolean;
        showLifestyleForm: boolean;
        showDesiredPartnerForm: boolean;
        showProfileImageForm: boolean;
    }>
>;

const EditProfile = () => {
    const [inEditMode, setInEditMode] = useState(initialFormState);
    const { user } = useUser();

    const personalDetails: IPersonalDetails = {
        id: user?.id,
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
        state: user?.state,
        showEditForm: inEditMode.showPersonalInfoForm,
        setShowEditForm: setInEditMode,
    };
    const educationCareerDetails: IEducationCareerDetails = {
        annual_income: user?.annual_income,
        degree: user?.degree,
        employed_in: user?.employed_in,
        occupation: user?.occupation,
        id: user?.id,
        showEditForm: inEditMode.showCareerInfoForm,
        organization_name: user?.organization_name,
        setShowEditForm: setInEditMode,
    };

    const familyDetails: IFamilyDetails = {
        mother_gotra: user?.mother_gotra,
        id: user?.id,
        brothers: user?.brothers,
        sisters: user?.sisters,
        family_status: user?.family_status,
        family_type: user?.family_type,
        father_occupation: user?.father_occupation,
        mother_occupation: user?.mother_occupation,
        showEditForm: inEditMode.showFamilyInfoForm,
        setShowEditForm: setInEditMode,
    };

    const contactDetailsProps: IContactDetails = {
        email_address: user?.email_address,
        mobile_number: user?.mobile_number,
    };

    const lifestyleDetailsProps: ILifestyleDetails = {
        dietary_habit: user?.dietary_habit,
        drinking_habit: user?.drinking_habit,
        smoking_habit: user?.smoking_habit,
        own_car: user?.own_car,
        setShowEditForm: setInEditMode,
        handicapped: user?.handicapped,
        nature_handicap: user?.nature_handicap,
        showEditForm: inEditMode.showLifestyleForm,
        own_house: user?.own_house,
        id: user?.id,
    };

    const desiredPartnerDetailsProps: IDesiredPartnerDetails = {
        partner_description: user?.partner_description,
        partner_age: {
            from: user?.partner_age?.from,
            to: user?.partner_age?.to,
        },
        partner_height: {
            from: user?.partner_height?.from,
            to: user?.partner_height?.to,
        },
        partner_income: {
            from: user?.partner_income?.from,
            to: user?.partner_height?.to,
        },
        setShowEditForm: setInEditMode,
        partner_occupation: user?.partner_occupation,
        partner_smoke: user?.partner_smoke,
        partner_drink: user?.partner_drink,
        partner_marital_status: user?.own_house,
        gender: user?.gender,
        id: user?.id,
        showEditForm: inEditMode.showDesiredPartnerForm,
    };

    const profileImageProps: IProfileImageDetails = {
        user_images: user?.user_images,
        setShowEditForm: setInEditMode,
        showEditForm: inEditMode.showProfileImageForm,
        id: user?.id,
    };

    const onSubmit = (success: boolean) => {
        if (success) {
            setInEditMode(initialFormState);
        }
    };
    return (
        <Layout>
            {user?.id ? (
                <section className="edit-profile-page py-10 ">
                    <div className="edit-profile-inner mx-auto">
                        Login
                        <div className="two-cols flex gap-3">
                            <div className="details-col ">
                                <ProfileImages props={profileImageProps} onSubmit={onSubmit} />
                                <PersonalDetails props={personalDetails} onSubmit={onSubmit} />
                                <EducationCareerDetails
                                    props={educationCareerDetails}
                                    onSubmit={onSubmit}
                                />
                                <FamilyDetails props={familyDetails} onSubmit={onSubmit} />
                                <LifestyleDetails
                                    props={lifestyleDetailsProps}
                                    onSubmit={onSubmit}
                                />
                                <DesiredPartnerDetails
                                    props={desiredPartnerDetailsProps}
                                    onSubmit={onSubmit}
                                />
                            </div>
                            <div className="flex-1">
                                <ContactDetails props={contactDetailsProps} />
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </Layout>
    );
};

const ProfileImages = ({
    props,
    onSubmit,
}: {
    props: IProfileImageDetails;
    onSubmit: (success: boolean) => void;
}) => {
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showProfileImageForm: value,
            };
        });
    };
    const { user_images, setShowEditForm, showEditForm, id } = props;
    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Basic Details"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <UserImages userId={id} />
                </>
            ) : (
                <ImageEditForm
                    userImageNames={user_images}
                    onCancel={handleEditFormVisibility}
                    onSubmit={onSubmit}
                    userId={id}
                />
            )}
        </div>
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

const PersonalDetails = ({
    props,
    onSubmit,
}: {
    props: IPersonalDetails;
    onSubmit: (success: boolean) => void;
}) => {
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
        state,
        id,
    } = props;

    const age = CommonUtils.getAge(dob);
    const formattedDob = CommonUtils.getFormattedDob(dob);
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
                        <ProfileField label="Date of Birth" field={formattedDob} />
                        <ProfileField label="Height" field={height.label} />
                        <ProfileField label="Marital Status" field={martial_status.label} />
                        <ProfileField label="Gotra" field={self_gotra.label} />
                        <ProfileField label="City" field={city} />
                        <ProfileField label="State" field={state.label} />
                        <ProfileField label="Manglik" field={manglik ? 'Yes' : 'No'} />
                    </ul>
                </>
            ) : (
                <PersonalInfoEditForm
                    onCancel={handleEditFormVisibility}
                    onSubmit={onSubmit}
                    initialValues={props}
                    userId={id}
                />
            )}
        </div>
    );
};

const EducationCareerDetails = ({
    props,
    onSubmit,
}: {
    props: IEducationCareerDetails;
    onSubmit: (value: boolean) => void;
}) => {
    const {
        annual_income,
        degree,
        employed_in,
        occupation,
        setShowEditForm,
        showEditForm,
        id,
        organization_name,
    } = props;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showCareerInfoForm: value,
            };
        });
    };

    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Education & Career"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Annual Income" field={annual_income.label} />
                        <ProfileField label="Degree" field={degree} />
                        <ProfileField label="Employed In" field={employed_in.label} />
                        <ProfileField label="Occupation" field={occupation} />
                        <ProfileField
                            label="Organization Name"
                            field={
                                organization_name !== '' && organization_name
                                    ? organization_name
                                    : 'Not filled in'
                            }
                        />
                    </ul>
                </>
            ) : (
                <CareerEducationEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={id}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

const FamilyDetails = ({
    props,
    onSubmit,
}: {
    props: IFamilyDetails;
    onSubmit: (value: boolean) => void;
}) => {
    const {
        mother_gotra,
        setShowEditForm,
        showEditForm,
        brothers,
        family_status,
        family_type,
        father_occupation,
        id,
        mother_occupation,
        sisters,
    } = props;

    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showFamilyInfoForm: value,
            };
        });
    };
    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Family"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Mother's Gotra" field={mother_gotra.label} />
                        <ProfileField
                            label="Mother's Occupation"
                            field={mother_occupation?.label ?? ''}
                        />
                        <ProfileField
                            label="Father's Occupation"
                            field={father_occupation?.label ?? ''}
                        />
                        <ProfileField label="No. of Brothers" field={brothers?.label ?? ''} />
                        <ProfileField label="No. of Sisters" field={sisters?.label ?? ''} />
                        <ProfileField label="Family Type" field={family_type?.label ?? ''} />
                        <ProfileField label="Family Status" field={family_status?.label ?? ''} />
                    </ul>
                </>
            ) : (
                <FamilyEditForm
                    initialValues={props}
                    onSubmit={onSubmit}
                    onCancel={handleEditFormVisibility}
                    userId={id}
                />
            )}
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

const LifestyleDetails = ({
    props,
    onSubmit,
}: {
    props: ILifestyleDetails;
    onSubmit: (value: boolean) => void;
}) => {
    const {
        setShowEditForm,
        showEditForm,
        dietary_habit,
        drinking_habit,
        handicapped,
        id,
        nature_handicap,
        own_car,
        own_house,
        smoking_habit,
    } = props;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showLifestyleForm: value,
            };
        });
    };

    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Lifestyle"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <ul>
                        <ProfileField label="Dietary Habits" field={dietary_habit?.label ?? ''} />
                        <ProfileField label="Drinking Habits" field={drinking_habit?.label ?? ''} />
                        <ProfileField
                            label="Smoking Habits In"
                            field={smoking_habit?.label ?? ''}
                        />
                        <ProfileField label="Own a house" field={own_house?.label ?? ''} />
                        <ProfileField label="Own a car" field={own_car?.label ?? ''} />
                        <ProfileField label="Challenged" field={handicapped?.label ?? ''} />
                        {handicapped?.value === 'physically_accident' ||
                        handicapped?.value === 'physically_birth' ? (
                            <ProfileField
                                label="Nature of challenge"
                                field={nature_handicap.label}
                            />
                        ) : null}
                    </ul>
                </>
            ) : (
                <LifestyleEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={id}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

const DesiredPartnerDetails = ({
    props,
    onSubmit,
}: {
    props: IDesiredPartnerDetails;
    onSubmit: (value: boolean) => void;
}) => {
    const {
        setShowEditForm,
        showEditForm,
        id,
        partner_age,
        partner_description,
        partner_drink,
        partner_height,
        partner_income,
        partner_marital_status,
        partner_occupation,
        partner_smoke,
    } = props;
    const handleEditFormVisibility = (value: boolean) => {
        setShowEditForm((prevState) => {
            return {
                ...prevState,
                showDesiredPartnerForm: value,
            };
        });
    };

    return (
        <div className="details-container">
            {!showEditForm ? (
                <>
                    <ProfileDetailTitle
                        title="Desired Partner"
                        onClick={() => handleEditFormVisibility(true)}
                    />
                    <div className="mb-6">{partner_description ?? ''}</div>
                    <ul>
                        <ProfileField label="Age" field={partner_age.from?.label ?? ''} />
                        <ProfileField label="Height" field={partner_height.from?.label ?? ''} />
                        <ProfileField
                            label="Annual Income"
                            field={partner_income.from?.label ?? ''}
                        />
                        <ProfileField label="Occupation" field={partner_occupation?.label ?? ''} />
                        <ProfileField
                            label="Marital Status"
                            field={partner_marital_status?.label ?? ''}
                        />
                        <ProfileField label="Drink" field={partner_drink?.label ?? ''} />
                        <ProfileField label="Smoke" field={partner_smoke?.label ?? ''} />
                    </ul>
                </>
            ) : (
                <DesiredPartnerEditForm
                    initialValues={props}
                    onCancel={handleEditFormVisibility}
                    userId={id}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default EditProfile;
