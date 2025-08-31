import { Form, Formik } from "formik";
import { registerInitialValues } from "../../utils/constants";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import type { RegisterValues } from "../../types";
import { useAuth } from "../../context/auth-context";

const Register = () => {
  const { register } = useAuth();

  // form gönderilince
  const handleSubmit = (values: RegisterValues) => {
    register(values);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Yeni Hesap Oluştur</h2>
      </div>

      <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
        <Formik initialValues={registerInitialValues} onSubmit={handleSubmit}>
          <Form className="space-y-8">
            <Input label="Kullanıcı Adı" name="username" type="text" />
            <Input label="Email Adresi" name="email" type="email" />
            <Input label="Şifre" name="password" type="text" />

            <div>
              <button type="submit" className="submit-button">
                Kayıt Ol
              </button>
            </div>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm/6 text-grey-50">
          Hesabın var mı?
          <Link to="/login" className="font-semibold text-yellow-55 hover:text-yellow-60 ps-2">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
