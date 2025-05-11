import { memo } from "react";

interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  multiple?: boolean;
}

const Input = ({
  label,
  name,
  max,
  min,
  placeholder,
  type = "text",
  disabled = false,
  required = true,
  multiple = false,
}: Props) => {
  return (
    <div className="mb-5">
      <label htmlFor={name}>{label}</label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="input-field min-h-[100px] max-h-[250px]"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          min={min}
          max={max}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          multiple={multiple}
          className="input-field"
        />
      )}
    </div>
  );
};

export default memo(Input);
