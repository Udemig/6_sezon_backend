import mongoose from "mongoose";

// env'deki veritabanı url'i
const MONGO_URI = process.env.MONGO_URI;

// mevcut bağlantıyı tutucağımız nesne
const cached: {
  connection?: typeof mongoose; //
  promise?: Promise<typeof mongoose>;
} = {};

// veritabanına bağlanıcak ve bağlanıyı cache'e atıcak
// fonksiyon tekrar çağrıldığında zaten cache'de mevcut bir bağlantı varsa yenisini oluşturmak yerine cache'dekini alıcak
async function connectMongo(): Promise<typeof mongoose> {
  if (!MONGO_URI) {
    throw new Error("Lütfen MONGO_URI değişkenini .env'de tanımlayın");
  }

  // mevcut bir bağlantı varsa:
  if (cached.connection) {
    // mevcut vt bağplantısını döndür yenisini oluşturma
    return cached.connection;
  }

  // mevcut bir bağlantı yoksa:
  if (!cached.promise) {
    // yeni vt bağlantısı oluştur
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  // mevcut vt promise'e bağlanmaya çalış
  try {
    cached.connection = await cached.promise;
  } catch (err) {
    cached.promise = undefined;
    throw err;
  }

  // mevcu vt bağlantısını return et
  return cached.connection;
}

export default connectMongo;
