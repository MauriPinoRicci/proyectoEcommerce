import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./Register.module.css";
import English from "../../assets/bandera.png";

const Register = () => {
  const [message, setMessage] = useState(null);

  return (
    <div className={styles.registerContainer}>
      <img className={styles.headerImg} src={English} alt="Logo" />
      <h1 className={styles.registerTitle}>Registro de Usuario</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          birthdate: "",
          nDni: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Nombre es requerido"),
          email: Yup.string()
            .email("Correo inválido")
            .required("Correo es requerido"),
          birthdate: Yup.string()
            .matches(
              /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
              "Fecha debe estar en formato DD/MM/YYYY"
            )
            .required("Fecha de nacimiento es requerida"),
          nDni: Yup.number()
            .typeError("Debe ser un número")
            .required("DNI es requerido"),
          username: Yup.string().required("Nombre de usuario es requerido"),
          password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("Contraseña es requerida"),
          passwordConfirmation: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben coincidir"
            )
            .required("Confirmación de contraseña es requerida"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post("http://localhost:3000/users/register", values);
            setMessage("Registro exitoso");
            resetForm(); // Limpia el formulario después del envío exitoso
          } catch (error) {
            setMessage("Error en el registro. Inténtalo nuevamente.");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className={styles.formTitle}>Ingrese sus datos 👇</h2>
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field type="text" name="name" className={styles.inputField} />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Correo:</label>
              <Field type="email" name="email" className={styles.inputField} />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="birthdate">Fecha de Nacimiento:</label>
              <Field
                type="text"
                name="birthdate"
                placeholder="DD/MM/YYYY"
                className={styles.inputField}
              />
              <ErrorMessage name="birthdate" component="div" />
            </div>

            <div>
              <label htmlFor="nDni">DNI:</label>
              <Field type="number" name="nDni" className={styles.inputField} />
              <ErrorMessage name="nDni" component="div" />
            </div>

            <div>
              <label htmlFor="username">Nombre de Usuario:</label>
              <Field
                type="text"
                name="username"
                className={styles.inputField}
              />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Contraseña:</label>
              <Field
                type="password"
                name="password"
                className={styles.inputField}
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="passwordConfirmation">Confirmar Contraseña:</label>
              <Field
                type="password"
                name="passwordConfirmation"
                className={styles.inputField}
              />
              <ErrorMessage name="passwordConfirmation" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.buttonRegistrar}>
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
