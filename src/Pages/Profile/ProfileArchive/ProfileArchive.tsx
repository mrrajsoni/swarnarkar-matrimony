import { useEffect, useState } from 'react';
import Layout from '../../../Components/Commons/Layout/Layout';
import { useUser } from '../../../Context/UserContext';
import { selectValue } from '../../../Types/GlobalTypes';
import CommonUtils from '../../../Utils/API/Common Utils/CommonUtils';
import FetchUser from '../../../Utils/API/FetchUser';
import { CDNURL } from '../UserImages';
import './ProfileArchive.scss';

export interface IProfileArchiveData {
    first_name: string;
    last_name: string;
    dob: string;
    self_gotra: selectValue;
    annual_income: selectValue;
    height: selectValue;
    occupation: string;
    user_id: string;
    user_images: string;
}
const ProfileArchive = () => {
    const { user } = useUser();
    const [profileData, setProfileData] = useState<IProfileArchiveData[]>(null);

    useEffect(() => {
        if (user) {
            void FetchUser.getArchivePageProfileData(user?.id, user?.gender).then((response) => {
                setProfileData(response);
            });
        }
    }, [user?.id]);
    console.log(profileData);
    return (
        <Layout>
            <section className="profile-archive-page flex  py-10">
                <div className="filter-container flex-auto">Filters</div>
                <div className="profiles-container flex flex-wrap gap-6">
                    {profileData &&
                        profileData.map((profile) => {
                            const userImageArray = profile.user_images.split(',');
                            const userImage = userImageArray[0];

                            return (
                                <ProfileCard
                                    key={profile.dob}
                                    annual_income={profile.annual_income.label}
                                    dob={profile.dob}
                                    first_name={profile.first_name}
                                    last_name={profile.last_name}
                                    occupation={profile.occupation}
                                    height={profile.height.label}
                                    self_gotra={profile.self_gotra.label}
                                    userImage={userImage}
                                    userId={profile.user_id}
                                />
                            );
                        })}
                </div>
            </section>
        </Layout>
    );
};

const ProfileCard = ({
    first_name,
    last_name,
    dob,
    self_gotra,
    occupation,
    annual_income,
    height,
    userImage,
    userId,
}: {
    first_name: string;
    last_name: string;
    dob: string;
    self_gotra: string;
    occupation: string;
    annual_income: string;
    height: string;
    userImage: string;
    userId: string;
}) => {
    const age = CommonUtils.getAge(dob);
    return (
        <div className="profile-card-container">
            <div className="image-container">
                <img src={`${CDNURL}/${userId}/${userImage}`} alt={`${first_name} profile image`} />
            </div>
            <div className="profile-meta-container">
                <div className="name-gotra-container flex gap-3">
                    <h4 className="profile-name">
                        {first_name} {last_name}
                    </h4>
                    <span className="profile-gotra"> {age}</span>
                </div>
                <div className="height-age-container ">
                    <span>{self_gotra}, </span>
                    <span>{height}</span>
                </div>
                <div className="income-container">
                    <span>{occupation}, </span>
                    <span>{annual_income}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileArchive;
