import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faChalkboardTeacher, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import './VRExperience.css';

const VRExperience = () => {
    const experiences = [
        {
            title: 'College Campus',
            imgSrc: 'https://cdn.pixabay.com/photo/2013/01/20/04/53/college-75535_640.jpg',
            link: 'https://framevr.io/collegeview', 
            icon: faUniversity,
        },
        {
            title: 'College Classroom',
            imgSrc: 'https://media.istockphoto.com/id/1267107309/photo/lecture-school-hall-interior-3d-illustration.jpg?s=612x612&w=0&k=20&c=1w4ctewP-4pqz7aXr1Q1XRZa_L_ZA3zt7rbxNpoHnxE=', // Example GIF URL
            link: 'https://framevr.io/collegeinfra',
            icon: faChalkboardTeacher,
        },
        {
            title: 'Programming Lab',
            imgSrc: 'https://img.freepik.com/premium-photo/dark-room-with-clock-wall-that-says-word-computer_900396-14002.jpg', 
            link: 'https://framevr.io/collegelab',
            icon: faLaptopCode,
        },
    ];

    return (
        <div className="vr-experience">
            <h1>VR Experiences</h1>
            <div className="cards-container">
                {experiences.map((experience, index) => (
                    <div className="card" key={index}>
                        <img src={experience.imgSrc} alt={experience.title} style={{
                            height: 'auto',
                            width: '100%',
                        }} className="card-image" />
                        <div className="card-content">
                            <FontAwesomeIcon icon={experience.icon} className="card-icon" />
                            <h2>{experience.title}</h2>
                            <a href={experience.link} target='_blank' className="card-link">Explore</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VRExperience;
