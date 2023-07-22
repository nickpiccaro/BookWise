import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard/BookCard';
import '../../views/Welcome/Welcome.css'; // Import CSS file


interface WelcomePageProps {
  // Define any props needed for your home page component
}

const Welcome: React.FC<WelcomePageProps> = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home");
    };

  return (
    <div className="welcomeBody" onClick={handleClick}>
        <div className="textBody">
            <div className="textItems">
                <div className="welcomeText">
                    Welcome to...
                </div>
                <div className="labelText">
                    BookWise
                </div>
                <div className="subText">
                    by Nick Piccaro
                </div>
            </div>
        </div>
        <div className="instructionText">
            click anywhere to continue
        </div>
    </div>
  );
};

export default Welcome;