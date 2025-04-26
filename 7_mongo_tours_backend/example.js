
// EMBEDDING yani veri gömmeli ilişki
const order = {
    orderID:1,
    cargo:true,
    address:"blabla",
    totalPrice: 10000,

    customer: {
        id:2,
        name:"furkan",
        surname:"ercan",
        email:"blabla",
        phone:123123
    }
    ,

    products: [
        {
            id:3,
            name:"shampoo",
            price: 10,
            stock: 20
        },
        {
            id:3,
            name:"shampoo",
            price: 10,
            stock: 20
        },
        {
            id:3,
            name:"shampoo",
            price: 10,
            stock: 20
        }
    ]
}



// 1kb 10kb

const user = {
    id:2,
    name:"furkan",
    surname:"ercan",
    email:"blabla",
    phone:123123
}

const product = {
    id:3,
    name:"shampoo",
    price: 10,
    stock: 20
}



// REFERENCING (referans gösterme örneği)


const referencedOrder = {
    orderID:1,
    cargo:true,
    address:"blabla",
    totalPrice: 10000,

    customer: 2
    ,

    products: [3,3,3]
}


// POPULATION (ÇOĞALTMA) (VERİ ÇEKME)

const frontendeGonderilenVeri = {
    orderID:1,
    cargo:true,
    address:"blabla",
    totalPrice: 10000,

    // populate kullanarak veri çekilmiş hali
    customer: {
        name:"furkan",
        id:123,
        totalOrders:5
    }
    ,

    products: [3,3,3]
}