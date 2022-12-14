import { useEffect, useState } from 'react';
import { FileObject } from '@supabase/storage-js/dist/module/lib/types';
import FetchUser from '../../../Services/API/FetchUser';
import { ReactComponent as DeleteIcon } from '../../../Assets/Svg/delete.svg';

export const CDNURL =
    'https://rowqudefqibehplofnhb.supabase.co/storage/v1/object/public/profile-images';

const UserImages = ({ userId, showDelete }: { userId: string; showDelete?: boolean }) => {
    const [userImageList, setUserImage] = useState<FileObject[]>([]);

    const fetchUserImage = () => {
        void FetchUser.getUserImages(userId).then((imageResponse) => {
            setUserImage(imageResponse);
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
                <div className="flex gap-4 flex-wrap user-image-container">
                    {userImageList.map((image) => (
                        <div key={`${CDNURL}/${userId}/${image.name}`}>
                            <img src={`${CDNURL}/${userId}/${image.name}`} alt={image.name} />
                            {showDelete && (
                                <div
                                    className="delete-icon cursor-pointer"
                                    onClick={() => handleImageDelete(image.name)}>
                                    <DeleteIcon />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>No images to display. Please upload images</div>
            )}
        </>
    );
};

export default UserImages;
