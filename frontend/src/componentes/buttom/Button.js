import styled from 'styled-components';

const Buttom = styled.a`
  width: min(80%, 350px);
  border: none;
  background-color: ${props => (props.estado === 'Encontrado' ? 'var(--clr-blue-dark)' : 'var(--clr-pink-medium)')};
  color: #fff;
  border-radius: 10px;
  padding: 0.8rem;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
`;

const ButtonComponent = ({ texto, estado, path }) => {
  return <Buttom href={path} estado={estado}>{texto}</Buttom>;
};

export default ButtonComponent;
