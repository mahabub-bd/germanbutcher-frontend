import {
  AlertTriangle,
  CreditCard,
  Link,
  MessageSquare,
  Phone,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import React from "react";

const HowToOrderPage: React.FC = () => {
  const steps = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-red-600" />,
      title: "Browse Our Selection",
      description:
        "Explore our premium meats and specialty products in our online store.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: "Place Your Order",
      description:
        "Add items to your cart and proceed through our secure checkout.",
    },
    {
      icon: <Truck className="w-8 h-8 text-red-600" />,
      title: "Delivery or Pickup",
      description: "Choose between home delivery or store pickup at checkout.",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Enjoy Quality Meats",
      description:
        "Receive your order and enjoy German Butcher's premium quality.",
    },
  ];

  const deliveryOptions = [
    {
      title: "Home Delivery",
      details: [
        "Dhaka Metro: Next-day delivery",
        "Outside Dhaka: 2-3 business days",
        "Delivery fee based on location",
      ],
    },
    {
      title: "Store Pickup",
      details: [
        "Available at all German Butcher locations",
        "Ready in 2 hours after ordering",
        "No pickup fees",
      ],
    },
  ];

  const paymentMethods = [
    { name: "Credit/Debit Cards", icon: "💳" },
    { name: "Mobile Banking", icon: "📱" },
    { name: "Cash on Delivery", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">How to Order</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Getting premium meats from German Butcher is quick and easy
          </p>
        </div>
      </div>

      {/* Ordering Steps */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple Ordering Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow these easy steps to get German Butcher`&apos;s premium products
            delivered to your door
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <div className="bg-red-100 w-10 h-10 mx-auto -mt-11 mb-3 rounded-full flex items-center justify-center text-red-600 font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Options */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Delivery Options
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the delivery method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliveryOptions.map((option, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="w-6 h-6 text-red-600 mr-3" />
                  {option.title}
                </h3>
                <ul className="space-y-3">
                  {option.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0  w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-3 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800 flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
              Important Delivery Notes
            </h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>
                • Perishable items require immediate refrigeration upon delivery
              </li>
              <li>
                • Delivery times may vary during holidays and peak seasons
              </li>
              <li>• Someone must be present to receive the order</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Options
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We accept multiple secure payment methods
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm text-center"
              >
                <div className="text-3xl mb-2">{method.icon}</div>
                <h3 className="font-medium">{method.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 p-6 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-green-800 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 mr-3" />
              100% Secure Payments
            </h3>
            <p className="text-center text-green-700">
              All transactions are encrypted and secure. We never store your
              payment information.
            </p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Ordering?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our customer service team is happy to assist with your order
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team
              </p>
              <Link
                href="tel:+8801234567890"
                className="text-red-600 font-medium hover:text-red-800"
              >
                +880 1234 567890
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Get instant help through our online chat
              </p>
              <button className="text-red-600 font-medium hover:text-red-800">
                Start Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToOrderPage;
