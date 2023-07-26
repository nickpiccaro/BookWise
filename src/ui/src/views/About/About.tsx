import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Divider } from 'antd';
import BookCard from '../../components/BookCard/BookCard';
import '../../views/About/About.css'; // Import CSS file
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';


interface AboutPageProps {
  // Define any props needed for your home page component
}

const Welcome: React.FC<AboutPageProps> = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home");
    };

    const openGithub = () => {
        window.open('https://github.com/nickpiccaro', '_blank');
    };
    const openLinkedin = () => {
        window.open('https://www.linkedin.com/in/nicholas-piccaro-03a128182', '_blank');
    };
    const openEmail = () => {
        window.open('mailto:npiccaro10@gmail.com', '_blank');
    };

  return (
    <div className="aboutBody">
        <div className="aboutheader">
            <div className='abouttitle'>
                About this Project
            </div>
            <div className='linkBack'>
            <Button type="primary" shape="round" icon={<ArrowLeftOutlined />} size={"large"} onClick={handleClick}>
                Go Back to Project
            </Button>
            </div>
        </div>
        <div className="aboutbody">
            <div>
                <b>Objective:</b> <br></br>
                Create a fully functional application to simplify book searching and purchasing using ML tools and technologies.
            </div>
            <div>
                <b>Background:</b> <br></br>
                The idea arose for this project when I was standing in a book store, looking at a bookshelf and realizing I had to grab the book, then enter the title and author into a search bar, then click on Google Books or Amazon, find the respective book, then read all the reviews and the description, then detirmine if its a good price. At the end of the day after all that work I only looked at one book. I decided that there had to be a better way to solve this problem.       
            </div>

            <div>
                <br></br> 
                <b>Skills Demonstrated:</b>
                <ul>
                    <li>Utilizing ML Tools and Technologies to demonstrate my capabilites and understanding.</li>
                    <li>YOLO Object Detection for book identification and segmentation.</li>
                    <li>Optical Character Recognition (OCR) using Pytesseract for text detection.</li>
                </ul>
            </div>

            <div>
                <b>Application Stack:</b>
                <ul>
                    <li>Flask: Backend framework for I found to be very effective at integrating with ML models in Python.</li>
                    <li>ReactJS: Frontend framework for building the user interface.</li>
                </ul>
            </div>

            <div>
                <b>Deployment:</b>
                <ul>
                    <li>Deployed on Heroku, for my first personal project deployment.</li>
                </ul>
            </div>

            <div>
                <b>Future ML Improvements:</b>
                <ul>
                    
                    <li>Enhance text detection through custom models or technologies like Amazon Textract.</li>
                    <li>Develop and train a personalized YOLO implementation for better and more specific book identification.</li>
                </ul>
            </div>

            <div>
                <b>Future Features:</b>
                <ul>
                    <li>Enhance the user interface, making it more versatile and linking to external bookstores.</li>
                    <li>Implement user capabilities like secure login and the ability to save searched books.</li>
                    <li>Develop a mobile interface for both iOS and Android platforms.</li>
                </ul>
            </div>

            <div>
                <b>Long-term goal:</b> Publish the application on app stores for wider accessibility.
            </div>
        </div>
        <div className='aboutfooter'>
            <div className="socialBar">
                <GithubOutlined onClick={openGithub}/>

                <LinkedinOutlined onClick={openLinkedin}/>

                <MailOutlined onClick={openEmail}/>
            </div>
        </div>
        
    </div>
  );
};

export default Welcome;