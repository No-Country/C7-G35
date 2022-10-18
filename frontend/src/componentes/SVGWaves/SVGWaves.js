import styled from 'styled-components';

const SVG = styled.svg`
  fill: ${(props) => (props.color === 'pinkMedium' ? 'var(--clr-pink-medium)' : 'var(--clr-pink)')};
  position: relative;
  top: ${(props) => props.top || '0px'};
  z-index: -1;
`;

export const SVGWavesSuperior = ({ top, color }) => {
  return (
    <SVG
        color={color}
        top={top}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path d='M0,64L48,90.7C96,117,192,171,288,202.7C384,235,480,245,576,234.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </SVG>
  );
};

export const SVGWavesInferior = ({ top, color }) => {
  return (
      <SVG
      top={top}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1440 320'
    >
      <path d='M0,64L48,90.7C96,117,192,171,288,202.7C384,235,480,245,576,234.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
    </SVG>
  );
};
