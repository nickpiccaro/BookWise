import React, { useState } from 'react';
import { Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BookDataService from '../../services/books.service'
import DogDataService from '../../services/dogs.service'
import TextractDataService from '../../services/textract.service'
import BookCard from '../../components/BookCard/BookCard';
import '../../views/Demo/Demo.css'; // Import CSS file

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
        thumbnail: string,      
}

interface DemoPageProps {
  // Define any props needed for your home page component
}

const Demo: React.FC<DemoPageProps> = () => {
    const [bookData, setBookData] = useState<BookData>({
      author: ['James Dawson'],
      average_rating: 4.5,
      categories:  ['Juvenile Nonfiction'],
      description: "Former PSHCE teacher and acclaimed YA author James Dawson gives an uncensored look at sexual orientation and gender identity. Including testimonials from people across the gender and sexual spectrums, this frank, funny, fully inclusive book explores everything anyone who ever dared to wonder wants to know - from sex to politics, how to pull, stereotypes, how to come-out and more. Former PSHCE teacher and acclaimed YA author James Dawson gives an uncensored look at sexual orientation and gender identity. Including testimonials from people across the gender and sexual spectrums, this frank, funny, fully inclusive book explores everything anyone who ever dared to wonder wants to know - from sex to politics, how to pull, stereotypes, how to come-out and more. Former PSHCE teacher and acclaimed YA author James Dawson gives an uncensored look at sexual orientation and gender identity. Including testimonials from people across the gender and sexual spectrums, this frank, funny, fully inclusive book explores everything anyone who ever dared to wonder wants to know - from sex to politics, how to pull, stereotypes, how to come-out and more.",
      list_price: "N/A",
      main_category: "N/A",
      page_count: 272,
      published_date: "2014",
      rating_count: 2,
      retail_price: "N/A",
      thumbnail: "http://books.google.com/books/content?id=SoOjoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      title: "This Book is Gay"
    });

  const onSearch = (value: string) => {
      // Add your logic here
      console.log("DEBUG | searchValue: ", value);
      return BookDataService.search(value)
        .then(response => {
          console.log("obtained book results", response);
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        })
    };

    const getDogs = () => {
      // Add your logic here
      console.log("DEBUG | gettingDogs demo: ");
      return DogDataService.getAll()
        .then(response => {
          console.log("obtained dogs");
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        });
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUpload = async (file: any) => {
      setLoading(true);
      // const bookResults = []
      return TextractDataService.upload(file)
        .then(response => {
          const texts = response.data;
          console.log("List of text", texts);
          for(let i=0; i<texts.length; i++){
            if(texts[i].length !== 0){
              const textResponse = BookDataService.search(texts[i])
                .then(response => {
                  // bookResults.append(respond);
                  console.log("DEBUG | search: ", texts[i], " response: ", response);
                })
                .catch(e => {
                  console.error(e);
                  return Promise.reject(e);
                })
              }
            }
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
          return Promise.reject(e);
        });
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
      <div className="intro">
        <div className="introLead">Hello, I am...</div>
        <div className="introName">Nick Piccaro</div>
        <div className="introInfo">Software Engineer | ML Engineer </div>
      </div>
      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      <Button type="primary" onClick={getDogs}>Dogs</Button>

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

    <BookCard bookData={bookData} otherBooks = {[bookData, bookData, bookData, bookData]}/>
    <BookCard bookData={bookData} otherBooks = {[bookData, bookData, bookData, bookData]}/>
    </div>
  );
};

export default Demo;