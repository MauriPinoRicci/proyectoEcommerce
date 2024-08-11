import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  const [message, setMessage] = useState(null);

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <style>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <Formik
        initialValues={{
          name: '',
          email: '',
          birthdate: '',
          nDni: '',
          username: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Nombre es requerido'),
          email: Yup.string().email('Correo inválido').required('Correo es requerido'),
          birthdate: Yup.string()
            .matches(
              /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
              'Fecha debe estar en formato DD/MM/YYYY'
            )
            .required('Fecha de nacimiento es requerida'),
          nDni: Yup.number().typeError('Debe ser un número').required('DNI es requerido'),
          username: Yup.string().required('Nombre de usuario es requerido'),
          password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Contraseña es requerida'),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Confirmación de contraseña es requerida'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post('http://localhost:3000/users/register', values);
            setMessage('Registro exitoso');
            resetForm(); // Limpia el formulario después del envío exitoso
          } catch (error) {
            setMessage('Error en el registro. Inténtalo nuevamente.');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Nombre</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Correo</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="birthdate">Fecha de Nacimiento</label>
              <Field type="text" name="birthdate" placeholder="DD/MM/YYYY" />
              <ErrorMessage name="birthdate" component="div" />
            </div>

            <div>
              <label htmlFor="nDni">DNI</label>
              <Field type="number" name="nDni" />
              <ErrorMessage name="nDni" component="div" />
            </div>

            <div>
              <label htmlFor="username">Nombre de Usuario</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
              <Field type="password" name="passwordConfirmation" />
              <ErrorMessage name="passwordConfirmation" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Registrar
            </button>
          </Form>
        )}
      </Formik>

      {message && <div>{message}</div>}
    </div>
  );
};

export default Register;
