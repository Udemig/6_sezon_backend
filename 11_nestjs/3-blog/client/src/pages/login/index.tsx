import { Form, Formik } from "formik";
import { loginInitialValues } from "../../utils/constants";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import type { LoginValues } from "../../types";
import { useAuth } from "../../context/auth-context";

const Login = () => {
  const { login } = useAuth();

  // form gönderilince
  const handleSubmit = (values: LoginValues) => {
    login(values);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Hesabına Giriş Yap</h2>
      </div>

      <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
        <Formik initialValues={loginInitialValues} onSubmit={handleSubmit}>
          <Form className="space-y-8">
            <Input label="Kullanıcı Adı" name="username" type="text" />
            <Input label="Şifre" name="password" type="text" />

            <div>
              <button type="submit" className="submit-button">
                Giriş Yap
              </button>
            </div>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm/6 text-grey-50">
          Hesabın yok mu?
          <Link to="/register" className="font-semibold text-yellow-55 hover:text-yellow-60 ps-2">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
