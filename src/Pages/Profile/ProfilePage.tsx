import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Commons/Layout/Layout';
import {
    IContactDetails,
    IDesiredPartnerDetails,
    IEducationCareerDetails,
    IFamilyDetails,
    ILifestyleDetails,
    IPersonalDetails,
    IUser,
} from '../../Types/GlobalTypes';
import ProfileDetailsBox, {
    ProfileDetailTitle,
} from '../../Components/Users/Profile/ProfileDetailsBox';
import ProfileUtils from '../../Utils/Profile/ProfileUtils';
import CommonUtils from '../../Utils/Common Utils/CommonUtils';
import { ReactComponent as DesiredPartnerIcon } from '../../Assets/Svg/desired-partner.svg';
import { ReactComponent as LifestyleIcon } from '../../Assets/Svg/lifestyle-icon.svg';
import { ReactComponent as FamilyIcon } from '../../Assets/Svg/family-icon.svg';
import { ReactComponent as EducationIcon } from '../../Assets/Svg/education-icon.svg';
import { ReactComponent as ProfileIcon } from '../../Assets/Svg/profile-icon.svg';

import './Profile.scss';
import { useGetUserProfile } from '../../Services/API/UserHooks/getCurrentUserProfile';
import { GridLoader } from 'react-spinners';
import UserImages from '../../Components/Users/Profile/UserImages';

const ProfilePage = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState<IUser>(null);

    const { data, error, isLoading } = useGetUserProfile(userId);

    useEffect(() => {
        if (data) {
            setProfileData(data);
        }
    }, [isLoading]);

    const personalDetails: IPersonalDetails = {
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
        height: profileData?.height,
        self_gotra: profileData?.self_gotra,
        city: profileData?.city,
        profile_description: profileData?.profile_description,
        manglik: profileData?.manglik,
        dob: profileData?.dob,
        gender: profileData?.gender,
        martial_status: profileData?.martial_status,
        state: profileData?.state,
    };
    const educationCareerDetails: IEducationCareerDetails = {
        annual_income: profileData?.annual_income,
        degree: profileData?.degree,
        employed_in: profileData?.employed_in,
        occupation: profileData?.occupation,
        organization_name: profileData?.organization_name,
    };

    const familyDetails: IFamilyDetails = {
        mother_gotra: profileData?.mother_gotra,
        brothers: profileData?.brothers,
        sisters: profileData?.sisters,
        family_status: profileData?.family_status,
        family_type: profileData?.family_type,
        father_occupation: profileData?.father_occupation,
        mother_occupation: profileData?.mother_occupation,
    };

    const contactDetailsProps: IContactDetails = {
        email_address: profileData?.email_address,
        mobile_number: profileData?.mobile_number,
    };

    const lifestyleDetailsProps: ILifestyleDetails = {
        dietary_habit: profileData?.dietary_habit,
        drinking_habit: profileData?.drinking_habit,
        smoking_habit: profileData?.smoking_habit,
        own_car: profileData?.own_car,
        handicapped: profileData?.handicapped,
        nature_handicap: profileData?.nature_handicap,
        own_house: profileData?.own_house,
    };

    const desiredPartnerDetailsProps: IDesiredPartnerDetails = {
        partner_description: profileData?.partner_description,
        partner_age: {
            from: profileData?.partner_age?.from,
            to: profileData?.partner_age?.to,
        },
        partner_height: {
            from: profileData?.partner_height?.from,
            to: profileData?.partner_height?.to,
        },
        partner_income: {
            from: profileData?.partner_income?.from,
            to: profileData?.partner_height?.to,
        },
        partner_occupation: profileData?.partner_occupation,
        partner_smoke: profileData?.partner_smoke,
        partner_drink: profileData?.partner_drink,
        partner_marital_status: profileData?.own_house,
        gender: profileData?.gender,
    };

    return (
        <Layout>
            {profileData?.user_id && !isLoading ? (
                <section className="single-profile-page py-10">
                    <div className="profile-page-inner mx-auto">
                        <div className="two-cols flex gap-3">
                            <div className="details-col ">
                                <ProfileImages userId={userId} />
                                <PersonalDetails props={personalDetails} />
                                <EducationCareerDetails props={educationCareerDetails} />
                                <FamilyDetails props={familyDetails} />
                                <LifestyleDetails props={lifestyleDetailsProps} />
                                <DesiredPartnerDetails props={desiredPartnerDetailsProps} />
                            </div>
                            <div className="flex-1">
                                <ContactDetails props={contactDetailsProps} />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div>
                    <GridLoader color="#fe46ae" />
                </div>
            )}
        </Layout>
    );
};

const ProfileImages = ({ userId }: { userId: string }) => {
    return (
        <div className="details-container">
            <ProfileDetailTitle title="Photos" />
            <UserImages userId={userId} />
        </div>
    );
};

const PersonalDetails = ({ props }: { props: IPersonalDetails }) => {
    const { first_name, last_name, profile_description, dob, gender } = props;
    const age = CommonUtils.getAge(dob);
    const formattedDob = CommonUtils.getFormattedDob(dob);
    const profileDataArray = ProfileUtils.convertPersonalDetailsObj(props, formattedDob);

    return (
        <div className="details-container">
            <h4 className="name-label">
                <span>Full Name - </span> {first_name} {last_name}
                <span className="age">
                    &nbsp;({age}Y {gender.label})
                </span>
            </h4>
            <div className="mb-6">{profile_description}</div>
            <ProfileDetailsBox
                profileData={profileDataArray}
                profileDetailTitle="Basic Details"
                section_icon={<ProfileIcon />}
            />
        </div>
    );
};

const EducationCareerDetails = ({ props }: { props: IEducationCareerDetails }) => {
    const profileDataArray = ProfileUtils.convertEducationCareerDetailsObj(props);

    return (
        <div className="details-container">
            <ProfileDetailsBox
                profileData={profileDataArray}
                profileDetailTitle="Education & Career"
                section_icon={<EducationIcon />}
            />
        </div>
    );
};

const FamilyDetails = ({ props }: { props: IFamilyDetails }) => {
    const profileDataArray = ProfileUtils.convertFamilyDetailsObj(props);

    return (
        <div className="details-container">
            <ProfileDetailsBox
                profileData={profileDataArray}
                profileDetailTitle="Family"
                section_icon={<FamilyIcon />}
            />
        </div>
    );
};

const ContactDetails = ({ props }: { props: IContactDetails }) => {
    const profileDataArray = ProfileUtils.convertContactDetailsObj(props);
    return (
        <div className="details-container contact-details-container p-5 bg-white sticky top-1">
            <ProfileDetailsBox
                profileData={profileDataArray}
                profileDetailTitle="Contact Details"
            />
        </div>
    );
};

const LifestyleDetails = ({ props }: { props: ILifestyleDetails }) => {
    const profileDataArray = ProfileUtils.convertLifestyleDetailsObj(props);
    return (
        <div className="details-container">
            <ProfileDetailsBox
                profileData={profileDataArray}
                profileDetailTitle="Lifestyle"
                section_icon={<LifestyleIcon />}
            />
        </div>
    );
};

const DesiredPartnerDetails = ({ props }: { props: IDesiredPartnerDetails }) => {
    const { partner_description } = props;
    const profileDataArray = ProfileUtils.convertDesiredPartnerObj(props);
    return (
        <div className="details-container">
            <ProfileDetailsBox
                profileData={profileDataArray}
                profileDetailTitle="Desired Partner"
                partner_description={partner_description}
                section_icon={<DesiredPartnerIcon />}
            />
        </div>
    );
};

export default ProfilePage;
