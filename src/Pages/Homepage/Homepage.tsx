import Button from '../../Components/Commons/Button/Button';
import Layout from '../../Components/Commons/Layout/Layout';
import './Homepage.scss';

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

const HomePage = () => {
    const onRegisterClick = () => {
        console.log('Do this');
    };
    return (
        <Layout>
            <section className="homepage">
                <HomeHero onRegisterClick={onRegisterClick} />
                <USP />
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
        <section className="usp-section py-16">
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

export default HomePage;
