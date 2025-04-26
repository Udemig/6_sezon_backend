import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

const controlId = (req, res, next) => {
  //json dosyasındaki veriler arasında parametreyle gelen id'li eleman var mı ?
  const found = data.find((i) => i.id === req.params.id);

  //eğer elaman bulunamazsa hata gönder
  if (!found) {
    return res
      .status(404)
      .json({ message: "aradığınız id'li eleman bulunamadı" });
  }

  //req nesnesi içerisine bulunan ekle
  req.foundRecipe = found;

  //sorun yoksa sonra kş adıma devam et
  next();
};

export default controlId;
