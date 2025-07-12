import Myorder from "@/components/user-account/Myorder";
import { fetchProtectedData } from "@/utils/api-utils";
import { Order } from "@/utils/types";

export default async function UserOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const endpoint = `orders/user/${id}`;

  const userOrders: Order[] = await fetchProtectedData(endpoint);

  return (
    <div className="p-4">
      <Myorder orders={userOrders} />
    </div>
  );
}
