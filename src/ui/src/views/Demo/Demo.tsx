import React, { useState } from 'react';
import { Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BookDataService from '../../services/books.service'
import DogDataService from '../../services/dogs.service'
import TextractDataService from '../../services/textract.service'
import '../../views/Demo/Demo.css'; // Import CSS file

const { Search } = Input;

interface DemoPageProps {
  // Define any props needed for your home page component
}

const Home: React.FC<DemoPageProps> = () => {
  const onSearch = (value: string) => {
      // Add your logic here
      console.log("DEBUG | searchValue: ", value);
      return BookDataService.search(value)
        .then(response => {
          console.log("obtained book results");
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        })
    };

    const getDogs = () => {
      // Add your logic here
      console.log("DEBUG | gettingDogs: ");
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
      return TextractDataService.upload(file)
        .then(response => {
          const texts = response;
          console.log("List of text", response);
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
    </div>
  );
};

export default Home;