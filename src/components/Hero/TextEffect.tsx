import React, { useEffect, useState } from 'react';

const TextEffect: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const phrases = [
        'Vibrant College Life',
        'Innovative Learning Experiences',
        'Diverse Campus Cultures',
        'Engaging Extracurricular Activities',
        'Lasting Friendships'
    ];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 150;
    const deletingSpeed = 75;
    const pauseTime = 2000;

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        const isFinishedTyping = !isDeleting && displayText === currentPhrase;
        const isFinishedDeleting = isDeleting && displayText === '';

        if (isFinishedTyping) {
            setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isFinishedDeleting) {
            setIsDeleting(false);
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setDisplayText((prev) => prev.slice(0, -1));
            } else {
                setDisplayText((prev) => currentPhrase.slice(0, prev.length + 1));
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhraseIndex, phrases]);


    const textStyle: React.CSSProperties = {
        fontSize: '2rem',
        fontWeight: 'bold',
        backgroundImage: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
        WebkitBackgroundClip: 'text',
        color: 'transparent', 
        textAlign: 'center',
        margin: '20px 0',
        transition: 'color 0.5s ease-in-out',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }}>
            <h2 style={textStyle}>Experience the {displayText}!</h2>
        </div>
    );
};

export default TextEffect;
