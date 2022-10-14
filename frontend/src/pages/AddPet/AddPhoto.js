import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadImg from '../../componentes/uploadImage/UploadImg';
import { useFormContext } from '../../providers/FormProviders';

const AddPhoto = () => {
  // const [cookies, setCookie] = useCookies(['token']);
  const { id } = useFormContext();
  const [imgUrl, setImgUrl] = useState('');
  // function onChange() {
  //   setCookie('token', { path: '/' });
  // }

  const Token = JSON.parse(localStorage.getItem('token'));
  console.log(Token);
  const handleAddFoto = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:8000/api/pets/${id}/images`,
      {
        imageUrl: imgUrl,
      },
      {
        headers: { Authorization: `Bearer ${Token.token}` },
      },
    );
    console.log('enviado');
  };

  return (
    <form onSubmit={handleAddFoto}>
      <div style={{ marginTop: '15px', fontWeight: 'bold' }}>
        <UploadImg setimgUp={setImgUrl} />
        {imgUrl && <img src={imgUrl} width='100' height='150' />}
      </div>
      <button type='submit'>Enviar</button>
    </form>
  );
};

export default AddPhoto;
