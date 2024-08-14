import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  username: Yup.string().required('El Usuario es Requerido'),
  password: Yup.string().required('La Contraseña es Requerida'),
});
