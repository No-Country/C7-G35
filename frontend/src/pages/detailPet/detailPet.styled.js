import styled from 'styled-components';

export const WrapperDetailPet = styled.section`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 7px;
  overflow: hidden;
  width: min(800px, 90%);
  margin: 3rem auto;
  background-color: var(--clr-pink-light);
`;
export const WrapperImgPet = styled.div`
  width: 100%;
  height: 400px;
`;
export const ImgPet = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
export const WrapperDataPet = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
`;
export const NameWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-direction: column;
`;
export const NamePet = styled.h2`
  color: var(--clr-pink-medium);
`;

export const UnderLine = styled.span`
  background-color: var(--clr-pink-medium);
  height: 1rem;
  width: 70%;
  border-radius: 1rem;
`;
export const WrapperMoreData = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 1rem;
  @media screen and (min-width: 500px) {
    justify-content: space-around;
  }
`;

export const ColumnaUno = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`;
export const BoxData = styled.div`
  font-size: 1.5rem;
`;
export const Key = styled.p`
  color: var(--clr-pink);
`;
export const Value = styled.p`
  font-weight: 600;
`;
