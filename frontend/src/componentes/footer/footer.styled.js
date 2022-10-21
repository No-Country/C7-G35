import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #2f2d3f;

  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  gap: 2rem;
  ;

  font-family: 'Macondo', monospace;
  color: #fff;

  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 40px;
`;
export const FollowUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  gap: 2rem;
`;

export const Logo = styled.img``;

export const Title = styled.h1`
  letter-spacing: 2px;
`;

export const Contact = styled.p`
  font-size: 24px;
`;

export const Reserved = styled.div`
  font-size: 24px;
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

export const SocialMedia = styled.a``;

export const InstagramIcon = styled.img`
  width: 64px;
  height: 64px;
`;
export const TwitterIcon = styled.img`
  width: 64px;
  height: 64px;
`;
export const YoutubeIcon = styled.img`
  width: 64px;
  height: 64px;
`;
