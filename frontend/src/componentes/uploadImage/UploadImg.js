import React, { useState, useEffect } from 'react';
import { ButtonComponentShort } from '../buttom/Button';
import { translationEs, stylesColor } from './UploadImageConfig';

export default function UploadImg({ setimgUp }) {
  const [myWidget, setmyWidget] = useState({});

  useEffect(() => {
    const myWidgetConect = window.cloudinary.createUploadWidget(
      {
        cloudName: 'makelaar',
        uploadPreset: 'amojar0m',
        language: 'es',
        buttonClass: 'bg-action',
        text: translationEs,
        styles: stylesColor,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setimgUp(result.info.url);
          console.log(result.info.url);
        }
      },
    );
    myWidgetConect.open();
    myWidgetConect.close();
    setmyWidget(myWidgetConect);
  }, []);

  async function uploadImage(e) {
    e.preventDefault();
    await myWidget.open();
  }
  return (
    <div>
      <ButtonComponentShort as={'button'} type={'submit'} texto={'Elegir imagen'} onClick={(e) => uploadImage(e)} >
        Subir foto
      </ButtonComponentShort>
    </div>
  );
}
