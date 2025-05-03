import { model, Schema} from "mongoose";

// User tarzındaki nesnemizin içinde barınacak özellikleri burada belirleriz.
// Bu bir TypeScript tür belirlemesidir.

export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
    // çünkü fotoyu dosya olarak değil link olarak tutuyoruz
    photo: string,
    country: string,
    isSeller: boolean,
    createdAt: Date,
    updatedAt: Date,
    phone?: string,
    desc?: string,
    toObject: ()=>any
}


// mongodb'nin kullanabilmesi için üstte oluşturduğumuz Type belirlemesini de kullanarak
// bir şema oluşturmalıyız

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: [true,"Lütfen username alanını belirleyin."]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Lütfen email alanını belirleyin."]
        },
        password: {
            type: String,
            required: [true, "Lütfen password alanını belirleyin."]
        },
        country:{
            type: String,
            required: [true,"Lütfen country alanını belirleyin"]
        },
        photo:{
            type: String,
            default: "https://picsum.photos/200"
        },
        isSeller:{
            type: Boolean,
            default: false
        },
        phone: {
            type: String
        },
        desc: {
            type: String
        }
    }
    ,
    {
        // createdAt ve updatedAt değerlerini kendimiz belirlemiyoruz, bunlar tamamen mongo tarafından yönetiliyor
        timestamps: true
    }
)


// Şemayı kullanarak veritabanında yeni bir alt kısım oluştur

const User = model<IUser>("User",userSchema);

export default User;