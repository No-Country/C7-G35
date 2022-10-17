import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../componentes/buttom/Button';
import UploadImg from '../../componentes/uploadImage/UploadImg';
import { useFormContext } from '../../providers/FormProviders';

const FormImagen = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--clr-pink-light);
  min-height: 100vh;
  padding: 2rem 0;
`;

const Mensaje = styled.div`
  font-size: 4rem;
  text-align: center;
  width: min(800px, 100%);
`;
const Resalta = styled.span`
  font-weight: 700;
`;

const WrapperFoto = styled.div`
  margin: 1rem auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(800px, 100%);
`;

const WrapperFotoPreview = styled.div`
  background-color: #fff;
  padding: 0.5rem;
  width: min(100%, 500px);
  height: 400px;
  overflow: hidden;
  margin: 2rem 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 3px;
`;

const FotoSubida = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const AddPhoto = () => {
  const { id } = useFormContext();
  const [imgUrl, setImgUrl] = useState('');

  const Token = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleAddFoto = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:8000/api/pets/${id}/images`,
      {
        imageUrl: imgUrl,
      },
      {
        headers: { Authorization: `Bearer ${Token?.token}` },
      },
    );
    navigate('/user');
  };

  return (
    <FormImagen onSubmit={handleAddFoto}>
      <Mensaje>
        <Resalta>Ya casi! </Resalta>
        Sube al menos 1 foto de tu mascota
      </Mensaje>
      <WrapperFoto>
        <UploadImg setimgUp={setImgUrl} />
        {imgUrl && (
          <WrapperFotoPreview>
            <FotoSubida src={imgUrl} alt='Foto mascota' />
          </WrapperFotoPreview>
        )}
      </WrapperFoto>

      {imgUrl && (
        <ButtonComponent as={'button'} type={'submit'} texto={'Enviar'} />
      )}
    </FormImagen>
  );
};

export default AddPhoto;
