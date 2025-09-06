import type { FC } from "react";

interface Props {
  tag: string;
}

const Tag: FC<Props> = ({ tag }) => {
  return (
    <div
      className={`${
        tag === "Hepsi" && "bg-zinc-900 text-white"
      }flex-1 text-center capitalize bg-dark-15 border-[0.5px] border-dark-20 text-grey-60 p-[10px] lg:p-[18px] 2xl:p-[30px] rounded-md cursor-pointer min-w-[120px] small-text`}
    >
      {tag}
    </div>
  );
};

export default Tag;
