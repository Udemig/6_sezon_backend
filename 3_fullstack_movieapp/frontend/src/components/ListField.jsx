import React from "react";

const ListField = ({ label, arr }) => {
  return (
    <div>
      <h2 className="font-semibold mb-1"> {label}: </h2>

      <div className="flex gap-3 flwx-wrap">
        {arr.map((item) => (
          <span className="p-2 px-4 rounded-full font-semibold bg-gray-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ListField;
