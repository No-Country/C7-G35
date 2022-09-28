import styled from 'styled-components';
import CardMascota from '../cardMascota/CardMascota';

const WrapperPosteosRecientes = styled.section`
`;

const WrapperTitle = styled.div`
`;

const Line = styled.div`
`;

const Title = styled.h2`
`;

const GroupCards = styled.div``;

const PosteosRecientes = ({ titulo }) => {
  return (
    <WrapperPosteosRecientes>
        <WrapperTitle>
            <Line/>
            <Title>{titulo}</Title>
            <Line/>
        </WrapperTitle>
        <GroupCards>
            <CardMascota/>
        </GroupCards>
    </WrapperPosteosRecientes>
  );
};

export default PosteosRecientes;
