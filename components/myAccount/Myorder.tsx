function Myorder() {
  const order = [
    {
      id: 1,
      order_number: 'ORD12345',
      order_date: '2025-06-27',
      order_status: 'Processing',
      total: 1200,
      shipping_fee: 50,
      payment_status: 'Paid',
    },
    {
      id: 2,
      order_number: 'ORD12346',
      order_date: '2025-06-25',
      order_status: 'Shipped',
      total: 850,
      shipping_fee: 0,
      payment_status: 'Pending',
    },
  ];

  return (
    <div>
      <div className="bg-white p-4 md:p-6 shadow-[-1px_2px_8.5px_4px_rgba(0,0,0,0.06)] rounded-lg  overflow-x-auto">
        <h4 className="text-lg font-semibold mb-3">My Orders</h4>
        <table className="min-w-full border border-gray-200 !text-sm  sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase !text-xs sm:text-sm font-semibold">
              <th className="border border-gray-200 whitespace-nowrap p-3">
                Order #
              </th>
              <th className="border border-gray-200 whitespace-nowrap p-3">
                Placed On
              </th>
              <th className="border border-gray-200 whitespace-nowrap p-3">
                Status
              </th>
              <th className="border border-gray-200 whitespace-nowrap p-3 ">
                Total
              </th>
              <th className="border border-gray-200 whitespace-nowrap p-3">
                Shipping Fee
              </th>
              <th className="border border-gray-200 whitespace-nowrap p-3">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 ? (
              order.map((item: any, idx) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition duration-150 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="border border-gray-200 p-3">
                    {item.order_number}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {item.order_date}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {item.order_status}
                  </td>
                  <td className="border border-gray-200 p-3 ">
                    TK {item.total || 679}
                  </td>
                  <td className="border border-gray-200 p-3 ">
                    TK {item.shipping_fee ? item.shipping_fee : 0}
                  </td>
                  <td className="border border-gray-200 p-3">
                    {item.payment_status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center border border-gray-200 p-6 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myorder;
