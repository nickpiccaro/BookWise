import React, { useState } from 'react';
import { Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BookDataService from '../../services/books.service'
import DogDataService from '../../services/dogs.service'
import TextractDataService from '../../services/textract.service'
import '../../views/Home/Home.css'; // Import CSS file
import BookCard from '../../components/BookCard/BookCard';

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

interface HomePageProps {
  // Define any props needed for your home page component
}

const Home: React.FC<HomePageProps> = () => {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [books, setBookResults] = useState<Array<BookData>[]>([]);

    const handleUpload = async (file: any) => {
      setLoading(true);
      try {
        const response = await TextractDataService.upload(file);
        const texts = response.data;
        const bookResults: Array<BookData[]> = [];
    
        for (let i = 0; i < texts.length; i++) {
          if (texts[i].length !== 0) {
            const textResponse = await BookDataService.search(texts[i]);
            const books = textResponse.data.books;
            bookResults.push(books);
          }
        }
    
        setLoading(false);
        console.log("DEBUG } bookResults: ", bookResults);
        setBookResults(bookResults);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    const beforeUpload = (file: File) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }

      return isJpgOrPng;
    };

    const handleChange = (info: any) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }

      if (info.file.status === 'done') {
        // Get the uploaded image URL
        const imageUrl = URL.createObjectURL(info.file.originFileObj);
        setImageUrl(imageUrl);
        setLoading(false);
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

  return (
    <div className="homeBody">
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={({ file }) => handleUpload(file)}
        onChange={handleChange}
      >
        {imageUrl && typeof imageUrl === 'string' ? (
          <img src={imageUrl} alt="uploaded" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <div>
      {books.map((bookArr, index) => (
        <div key={index} className="bookCard">
          {bookArr.length > 0 && <BookCard bookData={bookArr[0]} otherBooks={bookArr.slice(1)} />}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Home;