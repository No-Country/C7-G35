import styled from 'styled-components';

const WrapperCard = styled.div`

`;

const NombreMascota = styled.h3``;
const ImagenMascota = styled.img``;
const Fecha = styled.p``;
const VerMas = styled.button``;

const CardMascota = () => {
  return (
    <WrapperCard>
        <NombreMascota>Mateo</NombreMascota>
        <ImagenMascota/>
        <Fecha>12 12 12</Fecha>
        <VerMas>Ver mas Detalle</VerMas>
    </WrapperCard>
  );
};

export default CardMascota;
