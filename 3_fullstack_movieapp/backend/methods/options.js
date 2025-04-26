const optionsRequest = (req, res) => {
  /*
* frontend'den bir post/put/patch/delete isteği atıldığında tarayıcı öncelikle serverın  bu istek tiplerinin kabul ettiğini kontrol etmek amacıyla OPTIONS http methoduyla istek atar.


*Eğer Optıons isteğine cevap göndermezsek yukarıda ki istek türlerinin API'nın kabul etmediği zannediyor ve asıl isteği hiç bir zaman atmıyor.


* Optıons isteği gelince doğru header'lar cevap fönderirsek options'ın arkasından asıl isteği atıyor.

*/
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.end();
};

module.exports = optionsRequest;
