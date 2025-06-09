const stores = [
  {
    name: "German Butcher Shop",
    address: "123 Main St, Berlin",
    website: "https://germanbutchershop.de",
  },
  {
    name: "Sausage Haus",
    address: "456 Wurst Ave, Munich",
    website: "https://sausagehaus.de",
  },
  {
    name: "Bratwurst Market",
    address: "789 Grill Rd, Hamburg",
    website: "https://bratwurstmarket.de",
  },
];

export default function WhereToBuyPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Where to Buy</h1>
      <p className="mb-6">
        Find our authentic German products at these locations:
      </p>
      <ul className="space-y-4">
        {stores.map((store) => (
          <li key={store.name} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <p>{store.address}</p>
            <a
              href={store.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Visit Website
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
