import styled from 'styled-components';

export const WrapperCard = styled.div`
  position: relative;
  padding: 1rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.estado === 'rescues' ? 'var(--clr-blue-light)' : 'var(--clr-pink-light)')};
  backface-visibility: .9;
  border-radius: 1rem;
  width: min(20rem, 100%);
`;

export const IconoHuella = styled.div`
  position: absolute;
  right: -5px;
  top: -20px;
  font-size: 3rem;
  rotate: 45deg;
  color: ${props => (props.estado === 'rescues' ? 'var(--clr-blue-dark)' : 'var(--clr-pink-medium)')};
`;

export const NombreMascota = styled.h3`
  font-size: 2rem;
  margin: 0 0 1rem;
  font-family: 'Macondo', cursive;
`;

export const WrapperImagen = styled.div`
  width: 80%;
  aspect-ratio: 1/1;
  border-radius: 100rem;
  overflow: hidden;
  margin-bottom: .5rem;
`;
export const ImagenMascota = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
export const Fecha = styled.p`
  font-weight: bolder;
  margin: 1rem 0;
`;

export const WrapperButtons = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  `;

export const ActionButton = styled.button`
  border: none;
  border-radius: 100vh;
  color: #fff;
  background-color: red;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 0;
  height: 2.5rem;
  aspect-ratio: 1/1;
`;
