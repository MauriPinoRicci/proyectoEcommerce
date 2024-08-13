import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../utils/validateLogin';
import styles from "../login/login.module.css"

const LoginForm = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setMessageType('success');
        setMessage(result.message || 'Login successful');
      } else {
        setMessageType('error');
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Network error: ' + error.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.loginContainer}>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>

      {message && (
        <div className={messageType === 'success' ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
