import { Link } from "react-router-dom";
import Form from "./form";
import User from "./user";
import Links from "./links";
import { useProfile } from "../../service/auth";
import type { FC } from "react";

const Header: FC = () => {
  const { user } = useProfile();

  return (
    <header className="p-5 shadow">
      <div className="max flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/logo.png" alt="fiverr logo" className="w-[100px]" />
        </Link>

        <Form />

        <div className="flex items-center gap-2 relative group">
          {user ? <User user={user} /> : <Links />}
        </div>
      </div>
    </header>
  );
};

export default Header;
