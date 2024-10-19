import React from 'react';
import './TestimonialCard.css'; 

interface Testimonial {
    id: number;
    name: string;
    text: string;
    image: string; 
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        text: 'Studying at this university has been a transformative experience. The faculty is supportive and the campus life is vibrant!',
        image: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg' // Replace with actual image path
    },
    {
        id: 2,
        name: 'Mark Smith',
        text: 'The resources available for students are exceptional. I have had the opportunity to work on real-world projects that enhanced my skills.',
        image: 'https://png.pngtree.com/png-vector/20240204/ourlarge/pngtree-avatar-job-student-flat-portrait-of-man-png-image_11606889.png' // Replace with actual image path
    },
    {
        id: 3,
        name: 'Sophia Lee',
        text: 'I have made lifelong friends here and have grown both personally and academically. Highly recommend!',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS04iZgV8Y6DCGyTj0XnFRGoiCIO_YvYebx5pGOv46Vtv76SggiInYqqvON4JnhBbyA7AI&usqp=CAU' // Replace with actual image path
    }
];

const TestimonialCard: React.FC = () => {
    return (
        <div className="testimonial-card-container">
            <h2>What Our Students Say</h2>
            <div className="testimonial-cards">
                {testimonials.map((testimonial) => (
                    <div className="testimonial-card" key={testimonial.id}>
                        <img src={testimonial.image} alt={testimonial.name} className="student-image" />
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialCard;
