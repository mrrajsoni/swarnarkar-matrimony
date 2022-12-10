import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Commons/Layout/Layout';
import { IUser } from '../../Types/GlobalTypes';
import FetchUser from '../../Utils/API/FetchUser';

const ProfilePage = (props) => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState<IUser>(null);

    useEffect(() => {
        if (userId) {
            void FetchUser.getUserData(userId).then((response) => {
                setProfileData(response[0]);
            });
        }
    }, [userId]);
    console.log(profileData);
    return (
        <Layout>
            <section className="single-profile-page"></section>
        </Layout>
    );
};

export default ProfilePage;
