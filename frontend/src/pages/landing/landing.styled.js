import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  background: var(--clr-pink);
  background: radial-gradient(
    circle,
    rgba(247, 142, 150, 0.5) 0%,
    var(--clr-pink) 55%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding: 1rem;
  @media screen and (min-width: 1000px) {
    padding: 3rem 8rem;
  }
  @media screen and (min-width: 1200px) {
    background: radial-gradient(
      circle,
      rgba(247, 142, 150, 0.5) 0%,
      var(--clr-pink) 22%
    );
    flex-direction: row;
    padding: 3rem 8rem 0rem;
  }
`;

export const ColumnaUno = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  @media screen and (min-width: 1200px) {
    order: 2;
    flex: 5;
  }
`;

export const ImgPerros = styled.img`
  width: 90%;
  margin: 0 auto;
`;

export const ColumnaDos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media screen and (min-width: 1200px) {
    order: 1;
    align-self: flex-start;
    flex: 3;
    width: 50%;
    align-items: flex-start;
  }
`;

export const HeaderTitle = styled.div`
  color: #fff;
  text-align: center;
  width: 70%;
  font-size: 2rem;
  margin: 0 auto;
  line-height: 1.8rem;
  font-family: 'Macondo', cursive;
  margin-top: 2rem;
  @media screen and (min-width: 1000px) {
    font-size: 4rem;
    line-height: normal;
  }
  @media screen and (min-width: 1200px) {
    width: 100%;
    text-align: left;
    margin: 0;
  }
`;

export const SobreNosotrosWrapper = styled.section`
  background-color: var(--clr-pink-medium);
  padding: 1rem;
  gap: 2rem;
  position: relative;
  @media screen and (min-width: 1000px) {
    display: flex;
    padding: 0 8rem 2rem;
  }
  @media screen and (min-width: 1200px) {
    display: flex;
    gap: 1rem;
    padding: 0 14rem 2rem;
  }
`;

export const IconoHuella = styled.div`
  display: none;
  @media screen and (min-width: 1000px) {
    position: absolute;
    font-size: 6rem;
    right: 2rem;
    top: -4.5rem;
    rotate: 45deg;
    color: #fff;
  }
`;

export const WrapperImg = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  @media screen and (min-width: 1000px) {
    flex: 2.5;
  }
`;

export const ImagenSobreNosotros = styled.img`
  width: 100%;
  -webkit-box-shadow: 7px 6px 3px -5px #000;
  -moz-box-shadow: 7px 6px 3px -5px #000;
  box-shadow: 7px 6px 3px -5px #000;
`;
export const Descripcion = styled.div`
  color: #fff;
  @media screen and (min-width: 1000px) {
    flex: 3;
  }
`;
export const TituloDesc = styled.h3`
  margin-bottom: 0;
  font-family: 'Macondo', cursive;
  font-weight: normal;
  font-size: 2rem;
`;
export const TextoDesc = styled.p``;
