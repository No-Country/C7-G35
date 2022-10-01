import styled from 'styled-components';

const Buttom = styled.button`
  width: 80%;
  border: none;
  background-color: ${props => (props.estado === 'Encontrado' ? 'var(--clr-pink)' : 'var(--clr-blue-dark)')};
  color: #fff;
  border-radius: 10px;
  padding: 0.8rem;
  font-size: 1.2rem;
`;

const ButtonComponent = ({ texto, estado }) => {
  return <Buttom estado={estado}>{texto}</Buttom>;
};

export default ButtonComponent;
