import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Commons/Button/Button';
import Layout from '../../Components/Commons/Layout/Layout';
import { ReactComponent as ProfileIcon } from '../../Assets/Svg/employee-profile.svg';
import { ReactComponent as SignUpIcon } from '../../Assets/Svg/upload.svg';
import { ReactComponent as ConnectIcon } from '../../Assets/Svg/call.svg';

import './Homepage.scss';
import Title from '../../Components/Commons/Title/Title';

const uspList = [
    {
        icon: 'https://res.cloudinary.com/rajsoni/image/upload/v1665826577/security_1_jkwr4u.png',
        alt: 'verified profiles',
        desc: 'Genuine and verified profiles',
    },
    {
        icon: 'https://res.cloudinary.com/rajsoni/image/upload/v1665826239/user_covyhb.png',
        alt: 'only for Maidh Kshatriya Swarnakar community',
        desc: 'Made only for Maidh Kshatriya Swarnakar community',
    },
    {
        icon: 'https://res.cloudinary.com/rajsoni/image/upload/v1665826239/no-fee_xymfo5.png',
        alt: 'No fee',
        desc: 'No platform fee or hidden charges. 100% free for the community',
    },
];

const ProcessStepList = [
    {
        icon: <SignUpIcon />,
        title: '1. Sign up for FREE',
        desc: 'Create your free profile on the platform',
    },
    {
        icon: <ProfileIcon />,
        title: '2. Browse Profiles',
        desc: 'Once your account is created, you can view detailed profiles of the registered members',
    },
    {
        icon: <ConnectIcon />,
        title: '3. Connect Offline',
        desc: 'After successful registration, you can view the contact details of all the members and connect with them offline',
    },
];
const HomePage = () => {
    const navigate = useNavigate();
    const onRegisterClick = () => {
        navigate('/register');
    };
    return (
        <Layout>
            <section className="homepage">
                <HomeHero onRegisterClick={onRegisterClick} />
                <USP />
                <AboutPlatform />
                <ProcessSteps />
                <CallToAction onRegisterClick={onRegisterClick} />
            </section>
        </Layout>
    );
};

const HomeHero = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
    return (
        <section className="flex items-center fluid-container homepage-hero-section">
            <div className="flex-1">
                <h1>A dedicated matrimonial site for Maidh Kshatriya Swarnakar Community</h1>
                <Button name="Register Now" onClick={onRegisterClick} />
            </div>
            <div className="flex-1">
                <img
                    src="https://res.cloudinary.com/rajsoni/image/upload/v1665810856/Sliders/swarnakar_matrimony_hero_image_nubwll.webp"
                    alt="swarnakar matrimony hero image"
                />
            </div>
        </section>
    );
};

const USP = () => {
    return (
        <section className="usp-section py-24">
            <div className="fluid-container flex justify-between">
                {uspList.map((usp) => (
                    <div key={usp.alt} className="flex items-center gap-5">
                        <img className="usp-icon" src={usp.icon} alt={usp.alt} />
                        <div>{usp.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const AboutPlatform = () => {
    return (
        <section className="about-platform-section text-center py-24 bg-white">
            <div>
                <Title
                    props={{
                        title: 'Welcome to Swarnkar Matrimonial',
                        showUnderline: true,
                    }}
                />
                <p>
                    This platform provides a stage for all the young individuals, divorced, or
                    widows of our Maidh Kshatriya Swarnkar community to create their marriage
                    profile and view all the other prospects under a single platform. This doesn`t
                    invovle any sort of fees or charges. It`s my small token of contribution for the
                    people of the community.
                </p>

                <div className="purpose-platform-container">
                    <Title
                        props={{
                            title: 'Purpose of the platform',
                            showUnderline: true,
                        }}
                    />

                    <p>
                        I have seen people sharing outdated bio-data through WhatsApp with the
                        limited information, and unclear photo. Also, more often than not it`s might
                        not reach to the potential member. To solve such issues, I came up with a
                        thought of creating this platform where an individual can update their
                        profile with the latest information and also upload multiple images. At the
                        same time, it`s very likely to reach to more members of the community.
                    </p>
                </div>
            </div>
        </section>
    );
};

const ProcessSteps = () => {
    return (
        <section className="process-steps-section py-24">
            <Title
                props={{
                    title: 'Find the right partner for you',
                    className: 'text-center',
                }}
            />
            <div className="flex process-steps-container">
                {ProcessStepList.map((processStep) => (
                    <div key={processStep.desc}>
                        <div>{processStep.icon}</div>
                        <div>
                            <h6>{processStep.title}</h6>
                            <p>{processStep.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const CallToAction = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
    const curvedArrowSrc =
        'https://res.cloudinary.com/rajsoni/image/upload/v1672373533/turn-right-arrow-with-broken-line_s2pucg.png';
    return (
        <section className="call-to-action-section py-24 bg-white text-center">
            <div>
                <Title
                    props={{
                        title: 'Make your own profile now',
                        className: 'text-center',
                        showUnderline: true,
                    }}
                />
                <img className="curved-arrow" src={curvedArrowSrc} alt="curved-arrow-icon" />
                <Button name="Register Now" onClick={onRegisterClick} />
            </div>
        </section>
    );
};

export default HomePage;
