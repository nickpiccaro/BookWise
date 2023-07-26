import React, { useState, useRef, useCallback } from 'react';
import { Input, Button, Upload, message, Popover } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BookDataService from '../../services/books.service'
import DogDataService from '../../services/dogs.service'
import TextractDataService from '../../services/textract.service'
import '../../views/Home/Home.css'; // Import CSS file
import BookCard from '../../components/BookCard/BookCard';
import spine1 from '../../views/Home/spine1.jpg'
import spine2 from '../../views/Home/spine2.jpg'
import spine3 from '../../views/Home/spine3.jpg'


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
    const sampleImageFiles = [spine1, spine2, spine3];
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [books, setBookResults] = useState<Array<BookData>[]>([]);
    const [sampleImageStates, setSampleImageStates] = useState<boolean[]>(
      sampleImageFiles.map(() => false)
    );


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
        <div style={{ marginTop: 8}}>Upload</div>
      </div>
    );

    


    const hide = (index: number) => {
      // Step 3: Use the index to update the state of the corresponding sample image
      setSampleImageStates((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    };
  
    const handleOpenChange = (index: number, newOpen: boolean) => {
      // Step 4: Use the index to update the state of the corresponding sample image
      setSampleImageStates((prevState) => {
        const newState = [...prevState];
        newState[index] = newOpen;
        return newState;
      });
    };

    // Step 2: Create a click event handler for the sample images
    const handleSampleImageClick = (index: number) => () => {
      hide(index); // Hide the popover when sample image is clicked
      fetch(sampleImageFiles[index])
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "sample-image.jpg", { type: "image/jpeg" });
          handleUpload(file);
        })
        .catch((error) => {
          console.error("Error converting imageUrl to File:", error);
        });
    };

    
    

  return (
    <div className="homeBody">
      <div className="header">
        <div className="details">
          <div className = "logo">
            BookWise
          </div>
          <div className="instructions">
            Upload your own image of a bookshelf or choose from one of our sample images...
          </div>
        </div>
        <div className="upload">
          <div className='sampleImages'>
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
                <img src={imageUrl} alt="uploaded" style={{ width: '100%', border: '2px solid green', }} />
              ) : (
                uploadButton
              )}
            </Upload>
            {sampleImageFiles.map((fileName, index) => (
              <Popover 
                content={(
                  <div className="samplePopover">
                    <img
                      key={index}
                      src={fileName} // Replace with the actual path to the images
                      alt={`Sample ${index + 1}`}
                      style={{width: 'auto', height: '400px',margin: '5px', cursor: 'pointer' }}
                    />
                    <Button 
                      style={{ fontFamily:'monospace', fontWeight:'700', backgroundColor:'#32a852'}} 
                      type="primary" 
                      onClick={handleSampleImageClick(index)}
                    >
                      Detect and ID Books in Sample Image
                    </Button>
                  </div>)} 
                title="Upload this sample?" 
                trigger="click"
                key={index}
                open={sampleImageStates[index]} // Step 5: Use the corresponding state for each sample image
                onOpenChange={(newOpen) => handleOpenChange(index, newOpen)}
              >
                  <img
                    className ="bookImg"
                    key={index}
                    src={fileName} // Replace with the actual path to the images
                    alt={`Sample ${index + 1}`}
                    style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
                  />
              </Popover>
            ))}
          </div>
        </div>
      </div>
      
      <div className="body">
        {loading ? ( // If loading is true, show the loading icon
          <div className="loadingIcon">
            <LoadingOutlined style={{ fontSize: 24 }} />
            <span>Detecting and IDing your books...</span>
          </div>
        ) : (
          // If loading is false, show the books
          books.map((bookArr, index) => (
            <div key={index} className="bookCard">
              {bookArr.length > 0 && <BookCard bookData={bookArr[0]} otherBooks={bookArr.slice(1)} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;