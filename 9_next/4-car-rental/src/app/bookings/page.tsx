import { getOrders } from "@/lib/services/order.service";

const BookingsPage = async () => {
  const data = await getOrders();

  console.log(data);

  return (
    <div>
      <h1>Siparişlerim</h1>
    </div>
  );
};

export default BookingsPage;
