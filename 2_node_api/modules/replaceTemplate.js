// card html'ini ve ürün bilgilerini parametre olarak alıcak.
// card html'inin içeirisinde değişken olarak tanımlanan değerlerin yerine ürün bilgilerini ekleyecek bir fonksiyon yazalım.

const replaceTemplate = (html, data) => {
  let output = html.replace(/{%PRODUCTNAME%}/g, data.productName);

  // fiyat , miktar , görsel, id ve besin değerleri değişkemlerini değiştiriyoruz.
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%NUTRIENTS%}/g, data.id);

  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%FROM%}/g, data.from);

  //eğer ürün organik değilse  {%NOT_ORGANIC%} yerine not-organik class'ını ekle
  if (!data.organic) {
    // data.organic === false
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  } else {
    //eğer ürün organikse boş string ile değiştir
    output = output.replace(/{%NOT_ORGANIC%}/g, "");
  }

  // oluşturduğumuz yeni -mgüncelnnemiş card html'ini döndür
  return output;
};

//replaceTemplate isminde ki fonskiyonu farklı dosyalarda kullanma niyetimiz varsa export etmemiz gerekli

module.exports = replaceTemplate;
