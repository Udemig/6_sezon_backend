const { deleteOne } = require('../models/tourModel');
const User = require('../models/userModel');
const APIFeatures = require('../utils/apiFeatures');
const c = require('../utils/catchAsync')

// Bir belgeyi silme / güncelleme / hepsini alma / bir tanesini alma gibi durumlarda sadece model ismini değiştirip aynı kodu sürekli yazıyorduk ve gereksiz kod kalabalığına sebep oluyordu.

// Dışraıdan parametre olarak aldığı model'e göre gerekli işlemi yapan fonksiyonları yaz.


// Silme Fonksiyonu

exports.deleteOne = (model) => c(
    async(req,res,next) => {
        await model.findByIdAndDelete(req.params.id);

        res.status(204).json({success:true,message:`${model.modelName} başarıyla silindi.`})
    }
)



// deleteOne(User)  BU ŞEKİLDE ÇAĞRINCA ŞUNA EŞİT OLUYOR:

// (User) => c(
//     async(req,res,next) => {
//         await User.findByIdAndDelete(req.params.id);
//     }
// )


// deleteOne(Tour)  BU ŞEKİLDE ÇAĞRINCA ŞUNA EŞİT OLUYOR:

// (Tour) => c(
//     async(req,res,next) => {
//         await Tour.findByIdAndDelete(req.params.id);
//     }
// )




// güncelleme

exports.updateOne = (model) => c(
    async(req,res,next) => {

        // id'ye göre bir veri bul ve güncelle, 
        // {new: true} dediğimizde hem güncelle, hem de güncellenmiş veriyi döndür anlamına gelir.
        
        const doc = await model.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json({success:true,message:`${model.modelName} başarıyla güncellendi.`,data: doc})
    }
)




// Bir tane döküman al

exports.getOne = (Model,populateOptions) => 
    c(
        async(req,res,next)=>{
            // sorgu oluştur
            let query = Model.findById(req.params.id)

            if(populateOptions){
                query = query.populate(populateOptions);
            }

            const doc = await query;

            res.status(200).json({
                success:true,
                message:`${Model.modelName} başarıyla alındı.`,
                data: doc})
        }
    )


    // bütün dokumanları al
exports.getAll = (Model) => 
    c(async(req,res,next)=>{
        // api/reviews yada başka bir yerden bütün verileri çekme fonksiyonu
        // api/tours/123/reviews > 123 id'li turun bütün yorumlarını getir.


        let filters = {};

        if (req.params.tourId) filters = {tour: req.params.tourId}

        // filtreleme, sıralama, pagination mantıkları için standart bir sistem oluştur (bunu zaten oluşturmuştuk)
        const features = new APIFeatures(Model.find(filters),req.query,req.formattedQuery)
        .filter()
        .limit()
        .sort()
        .pagination()


        // sorguyu çalıştıralım

        const documents = await features.query

        // client'a veritabanından gelen veriyi gönder

        res.status(200).json({
            success:true,
            message: `Bütün ${Model.modelName} türündeki veriler getirildi.`,
            results: documents.length,
            data: documents
        })

    })


    // oluşturma

exports.createOne = (Model) =>
    c(
         async(req,res,next) => {

            const newDocument = await Model.create(req.body);

            res.status(201).json({
                success:true,
                message: `${Model.modelName} başarıyla oluşturuldu`,
                data: newDocument
             })
         }
    )


// Eğer böyle bir şekilde belirlersek review oluşturma isteklerinde kullanıcının IDsini göndermek zorudnda kalmayız. Ama backend açısından kodumuz biraz daha karmaşıklaşır.

// exports.createOne = (Model) =>
//     c(
//          async(req,res,next) => {

            
//             let query = req.body;

//             if(Model.modelName === "Review"){
//                 query = {...query,user:req.user._id}
//             }

//             const newDocument = await Model.create(query);

//             res.status(201).json({
//                 success:true,
//                 message: `${Model.modelName} başarıyla oluşturuldu`,
//                 data: newDocument
//              })
//          }
//     )