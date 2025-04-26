import { IoHome, IoCreateOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { CiHeart, CiSettings } from "react-icons/ci";

export const links = [
  { icon: <IoHome />, title: "Anasayfa", path: "/" },
  { icon: <IoCreateOutline />, title: "Oluştur", path: "/ekle" },
  { icon: <FaRegCompass />, title: "Keşfet", path: "/kesfet" },
  { icon: <CiHeart />, title: "Favoriler", path: "/fav" },
  { icon: <CiSettings />, title: "Yardım", path: "/yardim" },
];
