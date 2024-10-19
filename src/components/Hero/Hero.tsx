import React from 'react';
import './Hero.css'; 
import TextEffect from './TextEffect';
const CollegeDescription: React.FC = () => {


    return (
        <div className="container" >
            
            <div className="left" style={{
            display: 'flex',
            flexDirection: 'column'
        }}><TextEffect />
                <p>Discover new horizons and explore the wonders of the world with us. Let your journey begin here.</p>
            </div>
            <div className="right">
                <img src="https://evelynlearning.b-cdn.net/wp-content/uploads/2021/05/5352431C-087C-44AC-9CCB-16E4AE234ED0.jpeg" alt="Adventure Image"/>
            </div>
        </div>
    );
};

export default CollegeDescription;
