import { useCallback, useState } from 'react';
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
import Filters from '../../../Components/Commons/Filters/Filters';

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
    employed_in: selectValue;
    manglik: boolean;
    martial_status: selectValue;
}

interface IProfileData {
    data: IProfileArchiveData[];
    filters: Set<unknown>;
}

const ProfileArchive = () => {
    const { user } = useUser();
    const [currentPage, setCurrentPage] = useState(0);
    const [profileData, setProfileData] = useState<IProfileArchiveData[]>(null);
    const [filteredProfileData, setFilteredProfileData] = useState<IProfileData>({
        data: null,
        filters: new Set(),
    });
    const [profileCount, setProfileCount] = useState(0);

    const fetchProfileArchiveData = (page: number) => {
        return FetchUser.getArchivePageProfileData(user?.id, user?.gender, page).then(
            (response) => {
                setProfileData(response.data);
                setFilteredProfileData((prevState) => {
                    return {
                        ...prevState,
                        data: response.data,
                    };
                });
                setProfileCount(response.data.length);
                return response.data;
            },
        );
    };
    const handleRefetch = () => {
        void refetch()
            .then((value) => {
                setProfileData((prevState) => {
                    return {
                        ...prevState,
                        data: value.data,
                    };
                });
            })
            .catch((reason) => console.log(reason));
    };

    const debouncedRefetch = useCallback(debounce(handleRefetch, 500), []);

    const handleFilterChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilteredProfileData((previousState) => {
                return updateFilters(profileData, previousState, event, setProfileCount);
            });
        },
        [profileData, setFilteredProfileData],
    );
    const handlePaginationState = (isPrevButton: boolean) => {
        setCurrentPage((prevState) => (isPrevButton ? Math.max(prevState - 1, 0) : prevState + 1));
        debouncedRefetch();
    };

    const { isLoading, refetch } = useQuery(
        ['archiveProfiles'],
        () => fetchProfileArchiveData(currentPage),
        {
            keepPreviousData: true,
            enabled: !!user?.gender && !!user?.id,
            cacheTime: 120000,
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
                <div className="filter-container flex-auto">
                    <h5 className="archive-mini-label">Filters</h5>
                    <Filters onFilterChange={handleFilterChange} />
                </div>
                <div className="profiles-container">
                    <h5 className="archive-mini-label">{profileTerm}</h5>
                    {user?.id && !isLoading ? (
                        <>
                            <div className="flex flex-wrap gap-6">
                                {filteredProfileData.data &&
                                    filteredProfileData.data.map((profile) => {
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
                                handlePaginationState={handlePaginationState}
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
    handlePaginationState,
}: {
    disabledPrevButton: boolean;
    handlePaginationState: (value: boolean) => void;
}) => {
    return (
        <div>
            <Button
                name="Previous"
                onClick={() => handlePaginationState(true)}
                disabled={disabledPrevButton}
            />
            <Button name="Next" onClick={() => handlePaginationState(false)} />
        </div>
    );
};

function updateFilters(
    profileData: IProfileArchiveData[],
    state: IProfileData,
    event: React.ChangeEvent<HTMLInputElement>,
    setProfileCount: React.Dispatch<React.SetStateAction<number>>,
) {
    const filters = new Set(state.filters);
    let products = profileData;

    if (event.target.checked) {
        filters.add(event.target.value);
    } else {
        filters.delete(event.target.value);
    }

    if (filters.size && products?.length > 0) {
        products = products.filter((product) => {
            return (
                filters.has(product.employed_in.value) || filters.has(product.martial_status.value)
            );
        });
    }
    setProfileCount(products.length);
    return {
        filters,
        data: products,
    };
}

export default ProfileArchive;
