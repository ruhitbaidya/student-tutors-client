import { useState } from 'react';

const DownloadImageComponent = () => {
  const [imageURL, setImageURL] = useState('');
const [blods, setBlob] = useState("");
// const [blodst, setBlobt] = useState("");
  const handleInputChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleDownload = async () => {
    if (!imageURL) {
      alert('Please enter a valid image URL');
      return;
    }

    try {
      const response = await fetch('https://i.ibb.co/zbxSc8n/578ba42b-e19c-4b76-954e-52336e0ada99.jpg', {
        mode: 'no-cors',
      });
      const blob = await response.blob();
      setBlob(URL.createObjectURL(blob));
     // You can use the actual file name from the URL if needed


    } catch (error) {
      console.error('Error downloading the image:', error);
      alert('Failed to download the image. Please check the URL and try again.');
    }
  };

  return (
    <div>
      <h1>Download Image</h1>
      <a href={blods} download="downloaded_image.jpg">download</a>
      <input
        type="text"
        value={imageURL}
        onChange={handleInputChange}
        placeholder="Enter image URL"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadImageComponent;