// api isteğini beklediğimiz süreyi simüle eden fonksiyon
const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export default delay;
