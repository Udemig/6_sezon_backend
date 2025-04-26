import React from "react";

const Sort = ({ setOrder }) => {
  return (
    <select
      className="rounded-md p-2"
      defaultValue=""
      onChange={(e) => setOrder(e.target.value)}
    >
      <option value="" disabled>
        Süreye Göre
      </option>
      <option value="asc">Artan</option>
      <option value="desc">Azalan</option>
    </select>
  );
};

export default Sort;
