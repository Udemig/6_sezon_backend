import { ErrorMessage, Field } from "formik";

interface Props {
  label: string;
  name: string;
  type: string;
}

const Input: React.FC<Props> = ({ label, name, type }) => {
  return (
    <div className="relative">
      <label htmlFor={name}>{label}</label>

      <div className="mt-2">
        <Field
          as={type === "textarea" ? "textarea" : "input"}
          id={name}
          name={name}
          type={type}
          required
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
            ${type === "textarea" ? "min-h-[200px] max-h-[600px]" : ""}`}
        />
      </div>

      <ErrorMessage name={name} component="div" className="text-red-500 absolute -bottom-6 text-sm" />
    </div>
  );
};

export default Input;
