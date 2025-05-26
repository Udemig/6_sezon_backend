import type { FC } from "react";
import type { ICategory } from "../../types";

interface Props {
  label: string;
  options: ICategory[];
  name?: string;
}

const Select: FC<Props> = ({ label, options, name }) => {
  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>

      <select
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 rounded-md p-2.5 placeholder-gray-400 text-dark focus:border-blue-500"
      >
        {options.map((category, key) => (
          <option key={key} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
