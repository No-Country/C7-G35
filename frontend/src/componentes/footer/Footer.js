import React from 'react';
import petSpaceLogo from '../../assets/petspace-logo.png';
import instagramLogo from '../../assets/instagram.svg';
import twitterLogo from '../../assets/twitter.svg';
import facebookLogo from '../../assets/facebook.svg';

import {
  Contact,
  ContactsContainer,
  FollowUsContainer,
  FooterContainer,
  InstagramIcon,
  Logo,
  LogoContainer,
  Reserved,
  SocialMedia,
  SocialMediaContainer,
  Title,
  TwitterIcon,
  YoutubeIcon,
} from './footer.styled';

const Footer = () => {
  return (
    <footer>
      <FooterContainer>
        <LogoContainer>
          <Logo src={petSpaceLogo} />
        </LogoContainer>
        <ContactsContainer>
          <Title>Contáctanos</Title>
          <Contact>petsapce@gmail.com</Contact>
          <Contact>+57 3125702575</Contact>
          <Reserved>
            <p>© 2021 PetSpace. Derechos reservados a PetSpace.</p>
          </Reserved>
        </ContactsContainer>
        <FollowUsContainer>
          <Title>Síguenos</Title>
          <SocialMediaContainer>
            <SocialMedia href="https://www.instagram.com/" target="_blank">
              <InstagramIcon src={instagramLogo} />
            </SocialMedia>
            <SocialMedia href="https://twitter.com/?lang=es" target="_blank">
              <TwitterIcon src={twitterLogo} />
            </SocialMedia>
            <SocialMedia href="https://www.facebook.com/" target="_blank">
              <YoutubeIcon src={facebookLogo} />
            </SocialMedia>
          </SocialMediaContainer>
        </FollowUsContainer>
      </FooterContainer>
    </footer>
  );
};

export default Footer;
