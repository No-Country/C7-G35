import { GiSittingDog, GiEgyptianBird } from 'react-icons/gi';
import { FaCat, FaRegDotCircle } from 'react-icons/fa';
import { TbGenderMale, TbGenderFemale } from 'react-icons/tb';
import styled from 'styled-components';
import { RadioButtonIconComponent, InputTextComponent, TextAreaComponent } from '../../componentes/inputs/Inputs';
import { RadioButtonsIconsGroup } from '../../componentes/forms/GroupForms';

const WrapperMascotaPerdida = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
`;

const AddPet = () => {
  return (
    <WrapperMascotaPerdida>
      <h2>Los primeros 4 campos son obligatorios</h2>
      <RadioButtonsIconsGroup titulo={'Se perdio mi...'}>
        <RadioButtonIconComponent
          labelTexto={'Perro'}
          labelIcono={<GiSittingDog />}
          idFor={'typePerro'}
          name={'type'}
        />
        <RadioButtonIconComponent
          labelTexto={'Gato'}
          labelIcono={<FaCat />}
          idFor={'typeGato'}
          name={'type'}
        />
        <RadioButtonIconComponent
          labelTexto={'Ave'}
          labelIcono={<GiEgyptianBird />}
          idFor={'typeAve'}
          name={'type'}
        />
      </RadioButtonsIconsGroup>

      <RadioButtonsIconsGroup titulo={'Es...'}>
        <RadioButtonIconComponent
          labelTexto={'Macho'}
          labelIcono={<TbGenderMale />}
          idFor={'generoPerdidoMacho'}
          name={'gender'}
        />
        <RadioButtonIconComponent
          labelTexto={'Hembra'}
          labelIcono={<TbGenderFemale />}
          idFor={'generoPerdidoHembra'}
          name={'gender'}
        />
      </RadioButtonsIconsGroup>

      <RadioButtonsIconsGroup orientacion={'vertical'}>
        <RadioButtonIconComponent
          labelTexto={'No es de raza'}
          labelIcono={<FaRegDotCircle />}
          idFor={'sinRaza'}
          name={'breed'}
          orientacion={'horizontal'}
        />
        <RadioButtonIconComponent
          labelTexto={'Su raza es...'}
          labelIcono={<FaRegDotCircle />}
          idFor={'tieneRaza'}
          name={'breed'}
          orientacion={'horizontal'}
        />
      </RadioButtonsIconsGroup>

      <RadioButtonsIconsGroup titulo={'De edad es...'} orientacion={'vertical'}>
        <RadioButtonIconComponent
          labelTexto={'Cachorro'}
          labelIcono={<FaRegDotCircle />}
          idFor={'perdidoCachorro'}
          name={'age'}
          orientacion={'horizontal'}
        />
        <RadioButtonIconComponent
          labelTexto={'Adulto'}
          labelIcono={<FaRegDotCircle />}
          idFor={'perdidoAdulto'}
          name={'age'}
          orientacion={'horizontal'}
        />

        <RadioButtonIconComponent
          labelTexto={'Adulto mayor'}
          labelIcono={<FaRegDotCircle />}
          idFor={'perdidoAdultoMayor'}
          name={'age'}
          orientacion={'horizontal'}
        />
      </RadioButtonsIconsGroup>

      <InputTextComponent label={'Responde al nombre de...'}/>

      <RadioButtonsIconsGroup titulo={'¿Esta castrado o esterilizada?'} orientacion={'vertical'}>
        <RadioButtonIconComponent
          labelTexto={'Sí, si lo esta.'}
          labelIcono={<FaRegDotCircle />}
          idFor={'castradoPerdido'}
          name={'isCastrated'}
          orientacion={'horizontal'}
        />
        <RadioButtonIconComponent
          labelTexto={'No, no lo esta.'}
          labelIcono={<FaRegDotCircle />}
          idFor={'noCastradoPerdido'}
          name={'isCastrated'}
          orientacion={'horizontal'}
        />

        <RadioButtonIconComponent
          labelTexto={'No se/No recuerdo'}
          labelIcono={<FaRegDotCircle />}
          idFor={'noSabeCastradoPerdido'}
          name={'isCastrated'}
          orientacion={'horizontal'}
        />
      </RadioButtonsIconsGroup>

      <TextAreaComponent label={'Tiene algo que lo diferencia'} placeholder={'Alguna marca, sicatriz, o cualquier cosa que lo diferencie'} />
    </WrapperMascotaPerdida>
  );
};

export default AddPet;
