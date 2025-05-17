import { Link } from "react-router-dom";
import Input from "../../components/form/input";
import Toggle from "../../components/form/toggle";
import { useState, type FormEvent } from "react";
import { useRegister } from "../../service/auth";
import type { IRegisterData } from "../../types";

const Register = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.currentTarget);

    // bütün inputlardaki verileri al
    const userData = Object.fromEntries(formData.entries()) as unknown as IRegisterData;

    // satıcı hesabıb bilgisini nesne içerisne ekle
    userData.isSeller = isChecked;

    // api'a kaydolma isteği at
    mutate(userData);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 md:gap-10 md:pt-24">
        <div>
          <h1 className="title">Yeni Hesap Oluştur</h1>

          <Input label="İsim" name="username" />
          <Input label="Email" name="email" type="email" />
          <Input label="Fotoğraf" name="profilePicture" type="file" />
          <Input label="Ülke" name="country" />
          <Input label="Şifre" name="password" type="text" />
        </div>

        <div>
          <h1 className="title">Satıcı Olmak İstiyorum</h1>

          <Toggle setIsChecked={setIsChecked} />

          <Input label="Telefon" name="phone" disabled={!isChecked} required={!isChecked} />
          <Input label="Açıklama" name="description" disabled={!isChecked} required={!isChecked} type="textarea" />

          <button disabled={isPending} type="submit" className="form-button">
            Kaydol
          </button>

          <p className="mt-5 text-gray-500">
            Hesabınız var mı?
            <Link to="/login" className="ms-3 text-blue-500">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
