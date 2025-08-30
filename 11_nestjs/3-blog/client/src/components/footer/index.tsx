const Footer = () => {
  return (
    <footer className="text-center text-sm md:text-base text-grey-40 py-2 md:py-3 border-t-[0.5px] border-zinc-700">
      <p>&copy; {new Date().getFullYear()} Tüm Hakları Saklıdır.</p>
    </footer>
  );
};

export default Footer;
