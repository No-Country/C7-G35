import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { useQueryChangeContext } from '../../providers/QueryProviders';

const MainWrapperFilter = styled.form`
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;
const WrapperInputFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding-bottom: 1rem;
  &&:nth-child(even) {
    background-color: var(--clr-grey-medium);
  }
`;
const TitleInput = styled.p`
  padding: 0.8rem;
  color: #fff;
  background-color: var(--clr-blue-dark);
`;
const WrapperLabelInput = styled.div`
  margin-inline: 1rem;
`;
const InputCheckeable = styled.input`
  margin-right: 0.5rem;
`;

const InputList = styled.input`
  padding: 0.5rem;
`;
const LabelInput = styled.label``;

const schemaAddLostPet = yup
  .object({
    type: yup.string(),
    gender: yup.string(),
    size: yup.string(),
    color: yup.array().ensure(),
    breed: yup.string(),
    location: yup.string(),
    age: yup.string(),
    isCastrated: yup.boolean(),
    description: yup.string(),
    date: yup.string(),
  })
  .required();

const Filters = () => {
  const { register, getValues, reset } = useForm({
    resolver: yupResolver(schemaAddLostPet),
  });

  const [datos, setDatos] = useState('');
  const queryChange = useQueryChangeContext();
  useEffect(() => {
    queryChange({
      ...datos,
    });
  }, [datos]);

  return (
    <MainWrapperFilter
      onChange={() => {
        setDatos(getValues());
      }}
    >
      <WrapperInputFilter>
        <TitleInput>Tipo</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='dog'
            id='dogFilter'
            {...register('type')}
          />
          <LabelInput htmlFor='dogFilter'>Perro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='cat'
            id='catFilter'
            {...register('type')}
          />
          <LabelInput htmlFor='catFilter'>Gato</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='catEmptyFilter'
            {...register('type')}
          />
          <LabelInput htmlFor='catEmptyFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Genero</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='male'
            id='maleFilter'
            {...register('gender')}
          />
          <LabelInput htmlFor='maleFilter'>Macho</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='female'
            name='gender'
            id='femaleFilter'
            {...register('gender')}
          />
          <LabelInput htmlFor='femaleFilter'>Hembra</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            name='gender'
            id='femaleEmptyFilter'
            {...register('gender')}
          />
          <LabelInput htmlFor='femaleEmptyFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Tamaño</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='small'
            id='sizeFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='sizeFilter'>Pequeño</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='medium'
            id='mediumFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='mediumFilter'>Mediano</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='big'
            id='bigFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='bigFilter'>Grande</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='emptySizeFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='emptySizeFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Edad</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='puppy'
            id='ageFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='ageFilter'>Cachorro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='adult'
            id='adultFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='adultFilter'>Adulto</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='senior'
            id='seniorFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='seniorFilter'>Adulto Mayor</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='emptyAgeFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='emptyAgeFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Color</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='white'
            id='colorWhiteFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorWhiteFilter'>Blanco</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='darkBrown'
            id='colorBrownFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorBrownFilter'>Marron Oscuro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='black'
            id='colorBlackFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorBlackFilter'>Negro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='blonde'
            id='colorBlondeFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorBlondeFilter'>Rubio</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='grey'
            id='colorGreyFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorGreyFilter'>Gris</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='orange'
            id='colorOrangeFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorOrangeFilter'>Naranja</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>¿Esta castrado?</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value={true}
            id='neuteredFilter'
            {...register('isCastrated')}
          />
          <LabelInput htmlFor='neuteredFilter'>Si lo esta</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value={false}
            id='notNeuteredFilter'
            {...register('isCastrated')}
          />
          <LabelInput htmlFor='notNeuteredFilter'>No lo esta</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='isCastratedEmptyFilter'
            {...register('isCastrated')}
          />
          <LabelInput htmlFor='isCastratedEmptyFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <LabelInput>
          Choose a browser from this list:
          <InputList list='Razas' {...register('breed')} />
        </LabelInput>
        <datalist id='Razas'>
          <option value='Chrome' />
          <option value='Firefox' />
          <option value='Internet Explorer' />
          <option value='Opera' />
          <option value='Safari' />
          <option value='Microsoft Edge' />
        </datalist>
      </WrapperInputFilter>
    </MainWrapperFilter>
  );
};

export default Filters;
