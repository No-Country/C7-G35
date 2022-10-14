import React, { useState } from 'react';
import { UploadPhotoComponente } from '../../componentes/inputs/Inputs';
import UploadImg from '../../componentes/uploadImage/UploadImg';

const AddPhoto = () => {
  const [imgUrl, setImgUrl] = useState('');
  return (
    <div>
      <UploadPhotoComponente />
      <div style={{ marginTop: '15px', fontWeight: 'bold' }}>
        <UploadImg setimgUp={setImgUrl} />
        {imgUrl && <img src={imgUrl} width='100' height='150' />}
      </div>
    </div>
  );
};

export default AddPhoto;
