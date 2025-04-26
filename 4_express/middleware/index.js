exports.logger = (req, res, next) => {
  console.log(
    " 🥰 İSTEK GELDİ 🤪",
    "METHOD: ",
    req.method + " URL: " + req.url
  );

  //arayazılımdan sonra çalışacak olan fonksiyon çalışsın
  next();
};
