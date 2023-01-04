import { useCallback, useEffect, useState } from 'react';
import Layout from '../../../Components/Commons/Layout/Layout';
import { useUser } from '../../../Context/UserContext';
import { selectValue } from '../../../Types/GlobalTypes';
import CommonUtils from '../../../Utils/Common Utils/CommonUtils';
import FetchUser from '../../../Services/API/FetchUser';
import { CDNURL, fallbackProfileImage } from '../../../Components/Users/Profile/UserImages';
import './ProfileArchive.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '../../../Components/Commons/Button/Button';
import LoadingSpinner from '../../../Components/Commons/LoadingSpinner/LoadingSpinner';
import { debounce } from 'lodash';

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
    const [currentPage, setCurrentPage] = useState(0);
    const [profileData, setProfileData] = useState<IProfileArchiveData[]>(null);
    const [profileCount, setProfileCount] = useState(0);

    const fetchProfileArchiveData = (page: number) => {
        return FetchUser.getArchivePageProfileData(user?.id, user?.gender, page).then(
            (response) => {
                setProfileData(response.data);
                setProfileCount(response.data.length);
                console.log(response.count);

                return response.data;
            },
        );
    };
    const handleRefetch = () => {
        void refetch()
            .then((value) => {
                setProfileData(value.data);
            })
            .catch((reason) => console.log(reason));
    };

    const debouncedRefetch = useCallback(debounce(handleRefetch, 500), []);

    const handlePrevPageState = () => {
        setCurrentPage((prevState) => Math.max(prevState - 1, 0));
        debouncedRefetch();
    };
    const handleNextPageState = () => {
        setCurrentPage((prevState) => prevState + 1);
        debouncedRefetch();
    };

    const { isLoading, refetch } = useQuery(
        ['archiveProfiles'],
        () => fetchProfileArchiveData(currentPage),
        {
            keepPreviousData: true,
            enabled: !!user?.gender && !!user?.id,
        },
    );

    const disabledPrevButton = currentPage === 0;

    const profileTerm =
        profileCount === 1
            ? `Showing ${profileCount} profile`
            : `Showing all ${profileCount} profiles`;
    return (
        <Layout>
            <section className="profile-archive-page flex  py-10">
                <div className="filter-container flex-auto archive-mini-label">Filters</div>
                <div className="profiles-container">
                    <div className="archive-mini-label">{profileTerm}</div>
                    {user?.id && !isLoading ? (
                        <>
                            <div className="flex flex-wrap gap-6">
                                {profileData &&
                                    profileData.map((profile) => {
                                        const userImageArray =
                                            profile?.user_images && profile.user_images.split(',');
                                        const userImage = userImageArray
                                            ? `${CDNURL}/${profile.user_id}/${userImageArray[0]}`
                                            : fallbackProfileImage;

                                        return (
                                            <div className="profile-card" key={profile.user_id}>
                                                <Link to={`/all-profiles/${profile.user_id}`}>
                                                    <ProfileCard
                                                        annual_income={profile.annual_income.label}
                                                        dob={profile.dob}
                                                        first_name={profile.first_name}
                                                        last_name={profile.last_name}
                                                        occupation={profile.occupation}
                                                        height={profile.height.label}
                                                        self_gotra={profile.self_gotra.label}
                                                        userImage={userImage}
                                                    />
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                            <PaginationButtons
                                disabledPrevButton={disabledPrevButton}
                                handlePrevPageState={handlePrevPageState}
                                handleNextPageState={handleNextPageState}
                            />
                        </>
                    ) : (
                        <LoadingSpinner />
                    )}
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
}: {
    first_name: string;
    last_name: string;
    dob: string;
    self_gotra: string;
    occupation: string;
    annual_income: string;
    height: string;
    userImage: string;
}) => {
    const age = CommonUtils.getAge(dob);
    return (
        <div className="profile-card-container">
            <div className="image-container">
                <img src={userImage} alt={`${first_name} profile image`} />
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

const PaginationButtons = ({
    disabledPrevButton,
    handlePrevPageState,
    handleNextPageState,
}: {
    disabledPrevButton: boolean;
    handlePrevPageState: () => void;
    handleNextPageState: () => void;
}) => {
    return (
        <div>
            <Button name="Previous" onClick={handlePrevPageState} disabled={disabledPrevButton} />
            <Button name="Next" onClick={handleNextPageState} />
        </div>
    );
};

export default ProfileArchive;
