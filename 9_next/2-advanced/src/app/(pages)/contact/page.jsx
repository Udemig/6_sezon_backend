import Card from "../about/card";
import Form from "./form";

const Contact = () => {
  return (
    <div className="p-10 text-3xl text-center my-20 border border-blue-500">
      <h1 className="font-bold">İletişim Sayfası</h1>

      <ul className="text-lg my-5">
        <li>selam</li>
        <li>naber</li>
        <li>nasılsın</li>
      </ul>

      <Form />

      <Card />

      <span className="server">Server Component (SSR)</span>
    </div>
  );
};

export default Contact;
