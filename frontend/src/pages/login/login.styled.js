import styled from 'styled-components';

export const WrapperLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 2rem;
`;

export const WrapperLinkLogo = styled.div`
  padding: 2rem;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(500px, 80%);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
export const Link = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;
  align-items: center;
`;
export const LogoGoogle = styled.img`
  width: 70%;
  object-fit: contain;
`;

export const Texto = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;
