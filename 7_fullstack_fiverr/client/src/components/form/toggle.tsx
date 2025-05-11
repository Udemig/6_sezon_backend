interface Props {
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggle = ({ setIsChecked }: Props) => {
  return (
    <div className="flex gap-5 items-center mb-5">
      <p>Satıcı Hesabını Etkinleştir</p>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={(e) => setIsChecked(e.target.checked)}
          type="checkbox"
          className="sr-only peer"
          name="isSeller"
        />
        <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-20 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95" />
      </label>
    </div>
  );
};

export default Toggle;
