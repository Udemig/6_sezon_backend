module.exports = (req, res, next) => {
  //urlden gelen parametre > duration: { lte: '10' }, price:{gte:"300"} }
  //mongodbnin istediği format > duration: { $lte: '10' }, price:{$gte:"300"} }

  // yapılması gereken urlden parametrelerle eğer ki bir mongodb operatörü başına "$" ekle

  //1) istek ile gelen parametrelere eriş
  const queryObj = { ...req.query };

  //! filtrelemye tabi tutulmayacak olan parametreleri (sort,fields,page,limit) query nesnesi içerisinden kaldır
  // delete queryObj.sort
  // delete queryObj.fields;
  // delete queryObj.page;
  // delete queryObj.limit;


  const fields = ["sort", "fields", "page", "limit"];
  fields.forEach((el) => delete queryObj[el]);

  //2) replace kullanabilmek için stringe çevir
  let queryStr = JSON.stringify(queryObj);

  //3) bütün operatörlerin başına $ ekle
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|ne)\b/g,
    (found) => `$${found}`
  );

  console.log(queryStr); //"duration":{"lte":"10"},"price":{"$gt":"400"}

  //4) request nesnesine formatlanmış query ekliyoruz.
  req.formattedQuery = JSON.parse(queryStr);

  //sonra ki fonskiyonun çalışmasına izein ver
  next();
};
