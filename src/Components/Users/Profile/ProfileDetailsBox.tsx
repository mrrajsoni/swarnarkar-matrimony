import ProfileField from '../../Commons/ProfileField/ProfileField';

const ProfileDetailsBox = ({
    profileDetailTitle,
    onEditClick,
    profileData,
    showEditButton,
    partner_description,
    section_icon,
}: {
    profileDetailTitle: string;
    onEditClick?: () => void;
    profileData: { label: string; field: string }[];
    showEditButton?: boolean;
    partner_description?: string;
    section_icon?: any;
}) => {
    return (
        <div>
            <ProfileDetailTitle
                title={profileDetailTitle}
                onClick={onEditClick}
                showEditButton={showEditButton}
                section_icon={section_icon}
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

export const ProfileDetailTitle = ({
    title,
    onClick,
    showEditButton,
    section_icon,
}: {
    title: string;
    onClick?: () => void;
    showEditButton?: boolean;
    section_icon?: any;
}) => {
    return (
        <div className="details-title flex">
            {section_icon}
            {title}
            {showEditButton && (
                <div onClick={onClick} className="cursor-pointer ml-auto">
                    Edit
                </div>
            )}
        </div>
    );
};
export default ProfileDetailsBox;
