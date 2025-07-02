import Myorder from "@/components/user-account/Myorder";
import { fetchProtectedData } from "@/utils/api-utils";
import { Order } from "@/utils/types"; // Assuming you have an Order type

export default async function UserOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const endpoint = `orders/user/${id}`;

  const userOrders: Order[] = await fetchProtectedData(endpoint);

  return (
    <div className="h-full mt-1">
      <Myorder orders={userOrders} />
    </div>
  );
}