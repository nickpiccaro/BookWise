import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { Input, Card, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BookWheel from '../BooksWheel/BooksWheel';
import './BookCard.css'; // Import CSS file

const { Search } = Input;

const ReadMore: React.FC<{ children: ReactNode }> = ({ children }) => {
    let text = children as string;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
        <b>Description:</b> {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? "...read more" : " show less"}
        </span>
        </p>
    );
};

interface BookData {
    title: string,
    author: Array<string>,
    average_rating: number,
    categories:  Array<string>,
    description: string,
    list_price: string|number,
    main_category: string,
    page_count: number,
    published_date: string,
    rating_count: number,
    retail_price: string|number,
    thumbnail: string      
}

interface BookCardProps {
  // Define any props needed for your home page component
  bookData: BookData;
  otherBooks: Array<BookData>;
}

const BookCard: React.FC<BookCardProps> = ({ bookData, otherBooks }) => {
    const isListPriceNA = bookData.list_price === 'N/A';
    const isMainCatNA = bookData.main_category === 'N/A';
  return (
    <div className="bookBody">
        <div className="imageTitle">
            <img className="imageThumbnail"
                src={bookData.thumbnail}
                alt="Image"
            />
            { bookData.title }
        </div>
        <div className="description">
            <div className="title">
                <div style={{ fontWeight: '700', fontSize: '16px'}}>{bookData.title}</div> 
                {bookData.author} - {bookData.published_date}
            </div>
            <div className="rating">
                {bookData.average_rating}
                /5 out of &nbsp;
                {bookData.rating_count}
                &nbsp; reviews
            </div>
            {isListPriceNA ? (
                <div style={{fontStyle: 'italic'}} className='price'>
                    No Price Available
                </div>
            ) : (
                    <div className='price'>
                        ${bookData.list_price} - ${bookData.retail_price}
                    </div>
            )}
            <div className="description">
                <ReadMore>
                    {bookData.description}
                </ReadMore>
            </div>
            {isMainCatNA ? (
                <div className='categories'>
                    <b>Genres:</b> {bookData.categories}
                </div>
            ) : (
                <div className='categories'>
                    <b>Genres:</b> {bookData.main_category} - {bookData.categories}
                </div>
            )}  
        </div>
        <div className='otherBooks'>
            <b>Other Book Possibilities: </b>
            <div className="booksWheel">
                <BookWheel otherBooks={otherBooks} />
            </div>
        </div>
    </div>
  );
};

export default BookCard;