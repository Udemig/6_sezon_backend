import { getCurrentUser } from "@/lib/auth-utils";
import Car from "@/lib/models/Car";
import { Order } from "@/lib/models/Order";
import connectMongo from "@/lib/mongodb";
import { generateCarImageUrl } from "@/lib/utils";
import { Car as CarType, CheckoutBody } from "@/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// stripe kurulum
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// catalog'a eklemek için fonksiyon
const createStripeProduct = async (car: CarType) => {
  return await stripe.products.create({
    name: car.make + " " + car.modelName,
    images: [generateCarImageUrl(car)],
    description: car.description,
    default_price_data: {
      currency: "TRY",
      unit_amount: car.pricePerDay * 40.39 * 100,
    },
    metadata: {
      car_id: car._id.toString(),
    },
  });
};

// catalog'daki aracı bulan fonksiyon
const getStripeProduct = async (car: CarType) => {
  return (
    await stripe.products.search({
      query: `metadata['car_id']:"${car._id.toString()}"`,
    })
  ).data[0];
};

export async function POST(req: Request) {
  try {
    // 1) veritabanına bağlan
    await connectMongo();

    //2) kullanıcı oturum verisini al
    const user = await getCurrentUser();

    // 2.1) kullanıcı oturum verisi yoksa hata dön
    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı oturumu bulunamadı" },
        { status: 401 }
      );
    }

    // 3) isteğin body kısmında gelen verileri al
    const body: CheckoutBody = await req.json();

    // 4) kiralınıcak aracın verisini al
    const car: CarType | null = await Car.findById(body.carId);

    // 4.1) arac bulunamadıysa hata dön
    if (car === null) {
      return NextResponse.json({ message: "Arac bulunamadı" }, { status: 404 });
    }

    // 5) kiralanacak araç stripe product catalog'da var mı
    let stripeProduct = await getStripeProduct(car);

    // eğer stripe product catalog'da araç yoksa ekle
    if (!stripeProduct) {
      // 6) stripe product catalog'a aracın verisini ekle
      stripeProduct = await createStripeProduct(car);
    }

    // 7) ürünün stripe tarafından oluşturulan id değerini ve satın alınacak günü belirle
    const productInfo = {
      price: stripeProduct.default_price,
      quantity: Math.ceil(
        (new Date(body.endDate).getTime() -
          new Date(body.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    };

    // 7.1) sipariş verisini oluştur
    const order = await Order.create({
      product: car._id,
      user: user.id,
      price: car.pricePerDay * productInfo.quantity * 40.39,
      currency: "TRY",
      type: "rental",
      rental: {
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        days: productInfo.quantity,
        pickupLocation: body.pickupLocation,
        dropoffLocation: body.dropoffLocation,
        notes: body.notes,
      },
      status: "pending",
    });

    // 8) stripe ödeme oturumunu oluştur
    const session = await stripe.checkout.sessions.create({
      line_items: [productInfo as Stripe.Checkout.SessionCreateParams.LineItem],
      mode: "payment",
      success_url: `${
        process.env.NEXTAUTH_URL
      }/success?orderId=${order._id.toString()}`,
      cancel_url: `${
        process.env.NEXTAUTH_URL
      }/cancel?orderId=${order._id.toString()}`,
      metadata: {
        orderId: order._id.toString(),
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "Ödeme oturumu oluşturuldu",
      url: session.url,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Bir hata oluştu", error: err },
      { status: 500 }
    );
  }
}
