import styled from 'styled-components';
import {
  InputTextComponent,
  TextAreaComponent,
} from '../../componentes/inputs/Inputs';
import { RadioButtonsIconsGroup } from '../../componentes/forms/GroupForms';
import { razasLista } from '../../helpers/ListaRazas';
import { mascotaTipoOpciones } from '../../helpers/Tipo';
import { Genero } from '../../helpers/Genero';
import { RazaOpciones } from '../../helpers/Raza';
import { edad } from '../../helpers/Edad';

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
      <RadioButtonsIconsGroup titulo={'Se perdio mi...'} data={mascotaTipoOpciones}/>

      <RadioButtonsIconsGroup titulo={'Es...'} data={Genero}/>

      <RadioButtonsIconsGroup orientacion={'vertical'} data={RazaOpciones} dataListArray={razasLista}/>

      <RadioButtonsIconsGroup titulo={'De edad es...'} orientacion={'vertical'} data={edad}/>

      <InputTextComponent label={'Responde al nombre de...'} />

      <TextAreaComponent
        label={'Tiene algo que lo diferencia'}
        placeholder={
          'Alguna marca, sicatriz, o cualquier cosa que lo diferencie'
        }
      />
    </WrapperMascotaPerdida>
  );
};

export default AddPet;
