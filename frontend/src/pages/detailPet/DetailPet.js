import { TbGenderMale } from 'react-icons/tb';
import styled from 'styled-components';

const WrapperDetailPet = styled.section`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 7px;
    overflow: hidden;
    width: min(800px, 90%);
    margin: 3rem auto;
    background-color: var(--clr-pink-light);
`;
const WrapperImgPet = styled.div`
    width: 100%;
    height: 400px;
`;
const ImgPet = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;
const WrapperDataPet = styled.div`
    padding: 1rem;
    display: grid;
    place-items: center;
`;
const NameWrapper = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;  
    flex-direction: column;
`;
const NamePet = styled.h2`
    color: var(--clr-pink-medium);
`;

const UnderLine = styled.span`
    background-color: var(--clr-pink-medium);
    height: 1rem;
    width: 70%;
    border-radius: 1rem;
`;
const WrapperMoreData = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 4rem;
    padding: 2rem 1rem;
`;
const BoxData = styled.div`
    font-size: 1.5rem;
`;
const Key = styled.p`
    color: var(--clr-pink);
`;
const Value = styled.p`
    font-weight: 600;
`;

const DetailPet = () => {
  return (
    <WrapperDetailPet>
        <WrapperImgPet>
        <ImgPet src='https://media.ambito.com/p/cb928e70188562a84888b60513e8134c/adjuntos/239/imagenes/040/169/0040169794/mascotas-perrosjpg.jpg' alt='perro perdido'/>
        </WrapperImgPet>
        <WrapperDataPet>
        <NameWrapper>
            <NamePet>Teo</NamePet>
            <UnderLine></UnderLine>
        </NameWrapper>
        <WrapperMoreData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
            <BoxData>
                <Key>Raza</Key>
                <Value>No tiene</Value>
            </BoxData>
        </WrapperMoreData>
        </WrapperDataPet>
    </WrapperDetailPet>
  );
};

export default DetailPet;
