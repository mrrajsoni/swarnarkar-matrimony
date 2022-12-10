import ProfileField from '../../Commons/ProfileField/ProfileField';

const ProfileDetailsBox = ({
    profileDetailTitle,
    onEditClick,
    profileData,
    showEditButton,
    partner_description,
}: {
    profileDetailTitle: string;
    onEditClick?: () => void;
    profileData: { label: string; field: string }[];
    showEditButton?: boolean;
    partner_description?: string;
}) => {
    return (
        <div>
            <ProfileDetailTitle
                title={profileDetailTitle}
                onClick={onEditClick}
                showEditButton={showEditButton}
            />
            {partner_description ? <div className="mb-6">{partner_description ?? ''}</div> : null}
            <ul>
                {profileData.map((data) => {
                    const mainLabel =
                        data.label && data.label !== '' ? data.label : 'Not filled in';
                    return <ProfileField key={data.label} label={mainLabel} field={data.field} />;
                })}
            </ul>
        </div>
    );
};

const ProfileDetailTitle = ({
    title,
    onClick,
    showEditButton,
}: {
    title: string;
    onClick?: () => void;
    showEditButton?: boolean;
}) => {
    return (
        <div className="details-title flex justify-between">
            {title}
            {showEditButton && (
                <div onClick={onClick} className="cursor-pointer">
                    Edit
                </div>
            )}
        </div>
    );
};
export default ProfileDetailsBox;
