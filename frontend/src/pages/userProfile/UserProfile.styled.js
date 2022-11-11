import styled from 'styled-components';

export const WrapperUserProfile = styled.div`
  color: var(--clr-blue-dark);
`;

export const WrapperSaludo = styled.div`
  background-color: var(--clr-pink);
  padding: 2rem;
`;

export const Saludo = styled.p`
  font-size: 2rem;
`;

export const UserName = styled.h2`
  font-size: 3.5rem;
`;

export const WrapperButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const WrapperTodasLasMascotas = styled.div`
  padding: 1rem;
`;

export const WapperInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WrapperMascotasRegistradas = styled.div`
  margin-bottom: 1.5rem;
`;

export const Titulo = styled.h3`
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  border-left: 1rem solid var(--clr-blue-dark);
  border-radius: 5px;
`;

export const Descripcion = styled.p`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--clr-grey-dark);
`;

export const DescripcionSinRegistro = styled.p`
  padding: 1rem;
  color: var(--clr-grey-dark);
  background-color: var(--clr-grey-medium);
`;

export const WrapperListadoCards = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.dialog`
    width: max-content;
    height: auto;
    border: none;
    margin: 2rem auto;
    box-shadow: rgba(0, 0, 0, .8) 0px 20px 30px -10px;
    border-radius: 7px;
    &&::backdrop{
      background-color: rgba(0, 0, 0, .8);
    }
`;

export const WrapperModal = styled.div`
  z-index: 4456;
  border: none;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

export const DatosSolicitados = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const LabelMascotaPerdida = styled.label`
  font-weight: bolder;
`;

export const InputMarcarPedido = styled.input`
    padding: 0.5rem;
`;

export const FormDatos = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const WrapperBotones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
