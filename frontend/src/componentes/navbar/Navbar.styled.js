import styled from 'styled-components';

export const NavContainer = styled.nav`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2f2d3f;
  padding: 0.5rem;
`;

export const LinkHome = styled.a`
  width: 10rem;
`;

export const ImgLogo = styled.img`
  width: 100%;
`;

export const LinkContainer = styled.span`
  background-color: var(--clr-blue-dark);
  position: absolute;
  top: 100px;
  z-index: 2222;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  gap: 3rem;
  transition: .7s ease translate;
  translate:0 ${(props) => (props.clicked ? '0' : '-150%')} ;
`;

export const IconoMenu = styled.button`
  background-color: transparent;
  border: none;
  font-size: 3rem;
  color: #fff;
  cursor: pointer;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const Button = styled.button`
  background-color: #ed747d;
  padding: 10px 35px;

  color: #fff;
  font-size: 18px;
  font-weight: 600;

  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
