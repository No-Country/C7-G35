import styled from 'styled-components';

export const NavContainer = styled.nav`
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #2f2d3f;

  padding: 0 4rem;
`;

export const LinkContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #fff;

  font-size: 18px;
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
