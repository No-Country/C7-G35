import React, { useState, useEffect } from 'react';
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
        }
      },
    );
    myWidgetConect.open();
    myWidgetConect.close();
    setmyWidget(myWidgetConect);// eslint-disable-next-line
  }, []);

  async function uploadImage() {
    await myWidget.open();
  }

  return (
    <div>
      <button type='submit' onClick={() => uploadImage()}>
        Subir foto
      </button>
    </div>
  );
}
