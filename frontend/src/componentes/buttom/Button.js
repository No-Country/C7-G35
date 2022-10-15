import styled from 'styled-components';

const Button = styled.a`
  width: min(80%, 350px);
  border: none;
  background-color: ${props => (props.estado === 'Encontrado' ? 'var(--clr-blue-dark)' : 'var(--clr-pink-medium)')};
  color: #fff;
  border-radius: 10px;
  padding: 0.8rem;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const ButtonShort = styled(Button)`
  width: inherit;
  padding: .8rem 1.5rem;
 `;

const RoundedButton = styled.a`
    border: none;
    height: 10rem;
    width: 10rem;
    color: #fff;
    font-size: 2rem;
    border-radius: 100vh;
    background-color: ${props => (props.estado === 'Encontrado' ? 'var(--clr-blue-dark)' : 'var(--clr-pink-medium)')};
    cursor: pointer;
 `;

export const ButtonComponent = ({
  texto, estado, path, type, as,
}) => {
  return <Button as={as} href={path} estado={estado} type={type}>{texto}</Button>;
};

export const ButtonComponentShort = ({
  texto, estado, path, type, as, onClick,
}) => {
  return <ButtonShort
  as={as} href={path} estado={estado} type={type} onClick={onClick}>{texto}</ButtonShort>;
};

export const RoundedButtonComponent = ({
  texto, estado, path, type, as, onClick,
}) => {
  return <RoundedButton
  as={as} href={path} estado={estado} type={type} onClick={onClick}>{texto}</RoundedButton>;
};
