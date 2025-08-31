import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  to: string;
  className?: string;
}
const Button: React.FC<Props> = ({ text, to, className }) => {
  return (
    <Link
      to={to}
      className={`${className} flex items-center gap-2 border bg-dark-08 border-dark-15 w-fit px-4 py-2 rounded-md hover:bg-dark-15 transition`}
    >
      <span className="whitespace-nowrap">{text}</span>
      <FaArrowRight className="text-yellow-55 rotate-[310deg]" />
    </Link>
  );
};

export default Button;
