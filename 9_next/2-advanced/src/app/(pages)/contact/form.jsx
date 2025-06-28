"use client";

const Form = () => {
  return (
    <div className="border-red-500 border p-5 my-10">
      <form className="text-lg my-9">
        <input type="text" className="border me-3" />
        <button onClick={() => alert("selam")}>Gönder</button>
      </form>

      <span className="client">Client Component (CSR)</span>
    </div>
  );
};

export default Form;
