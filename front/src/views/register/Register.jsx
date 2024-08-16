import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import validationSchema from "../../utils/validateRegister";
import styles from "./Register.module.css";
import English from "../../assets/bandera.png";

const RegisterForm = () => {
  const [message, setMessage] = useState(null);

  return (
    <div>
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
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post("http://localhost:3000/users/register", values);
            setMessage("Registro exitoso");
            resetForm();
          } catch (error) {
            setMessage("Error en el registro. Inténtalo nuevamente.");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.registerContainer}>
            <img className={styles.headerImg} src={English} alt="Logo" />
            <h1 className={styles.registerTitle}>Registro De Usuario</h1>
            <h2 className={styles.formTitle}>Ingrese sus datos 👇</h2>
           
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field type="text" name="name" className={styles.inputField} />
              <ErrorMessage name="name">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="email">Correo:</label>
              <Field type="email" name="email" className={styles.inputField} />
              <ErrorMessage name="email">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="birthdate">Fecha de Nacimiento:</label>
              <Field
                type="text"
                name="birthdate"
                placeholder="DD/MM/YYYY"
                className={styles.inputField}
              />
              <ErrorMessage name="birthdate">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="nDni">DNI:</label>
              <Field type="number" name="nDni" className={styles.inputField} />
              <ErrorMessage name="nDni">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="username">Nombre de Usuario:</label>
              <Field
                type="text"
                name="username"
                className={styles.inputField}
              />
              <ErrorMessage name="username">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="password">Contraseña:</label>
              <Field
                type="password"
                name="password"
                className={styles.inputField}
              />
              <ErrorMessage name="password">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="passwordConfirmation">Confirmar Contraseña:</label>
              <Field
                type="password"
                name="passwordConfirmation"
                className={styles.inputField}
              />
              <ErrorMessage name="passwordConfirmation">
                {msg => <div className={styles.errorMessage}>{msg}</div>}
              </ErrorMessage>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.buttonRegistrar}>
              Registrar
            </button>

            {message && <div className={styles.message}>{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
