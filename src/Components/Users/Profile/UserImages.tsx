import { useEffect, useState } from 'react';
import { FileObject } from '@supabase/storage-js/dist/module/lib/types';
import FetchUser from '../../../Services/API/FetchUser';
import { ReactComponent as DeleteIcon } from '../../../Assets/Svg/delete.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const CDNURL =
    'https://rowqudefqibehplofnhb.supabase.co/storage/v1/object/public/profile-images';

export const fallbackProfileImage =
    'https://res.cloudinary.com/rajsoni/image/upload/v1672298631/fallback-user-image_rublxa.webp';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    lazyLoad: true,
};

const UserImages = ({ userId, showDelete }: { userId: string; showDelete?: boolean }) => {
    const [userImageList, setUserImage] = useState<FileObject[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const fetchUserImage = () => {
        void FetchUser.getUserImages(userId).then((imageResponse) => {
            setUserImage(imageResponse);
            setIsFetching(false);
        });
    };
    useEffect(() => {
        if (userId) {
            fetchUserImage();
        }
    }, [userId]);

    const handleImageDelete = (imageName: string) => {
        void FetchUser.deleteUserImage(userId, imageName);
        fetchUserImage();
    };
    return (
        <>
            {userImageList.length > 0 ? (
                isFetching ? (
                    <div>Fetching images</div>
                ) : (
                    <div className="user-image-container">
                        <Slider {...settings}>
                            {userImageList.map((image) => (
                                <div
                                    className="user-image-wrapper"
                                    key={`${CDNURL}/${userId}/${image.name}`}>
                                    <img
                                        src={`${CDNURL}/${userId}/${image.name}`}
                                        alt={image.name}
                                    />
                                    {showDelete && (
                                        <div
                                            className="delete-icon cursor-pointer"
                                            onClick={() => handleImageDelete(image.name)}>
                                            <DeleteIcon />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Slider>
                    </div>
                )
            ) : (
                <div className="">No images to show</div>
            )}
        </>
    );
};

export default UserImages;
