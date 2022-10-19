import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQueryChangeContext } from '../../providers/QueryProviders';

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
  const {
    register,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schemaAddLostPet),
  });

  const queryChange = useQueryChangeContext();
  useEffect(() => {
    queryChange({
      type: watch('type'),
      gender: watch('gender'),
    });
  }, [watch('type'), watch('gender')]);

  console.log(watch());
  return (
    <>
    <div>
        <p>Tipo</p>
        <div>
            <label htmlFor="dogFilter">Perro</label>
            <input type="radio" value='dog' name='type' id='dogFilter' {...register('type')}/>
        </div>
        <div>
            <label htmlFor="catFilter">Gato</label>
            <input type="radio" value='cat' name='type' id='catFilter' {...register('type')}/>
        </div>
    </div>
    <div>
        <p>Genero</p>
        <div>
            <label htmlFor="maleFilter">Macho</label>
            <input type="radio" value='male' name='gender' id='maleFilter'{...register('gender')}/>
        </div>
        <div>
            <label htmlFor="femaleFilter">Hembra</label>
            <input type="radio" value='female' name='gender' id='femaleFilter' {...register('gender')}/>
        </div>
    </div>
    </>
  );
};

export default Filters;
