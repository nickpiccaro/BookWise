import React, { useState } from 'react';
import { Input, Card, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './BooksWheel.css'; // Import CSS file

const { Search } = Input;

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

interface BookWheelProps {
  // Define any props needed for your home page component
  otherBooks: Array<BookData>
}

const BookWheel: React.FC<BookWheelProps> = ({ otherBooks }) => {
  return (
    <div className="image-gallery">
      {otherBooks.map((book, index) => (
        <div key={index} className="bookItem">
            <div className='image'>
                <img className='thumbnail' src={book.thumbnail} alt={book.title} />
            </div>
            <div className='bookInfo'>
                <div> {book.title} </div>
                <div> {book.author} </div>
                <div> {book.categories} </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default BookWheel;