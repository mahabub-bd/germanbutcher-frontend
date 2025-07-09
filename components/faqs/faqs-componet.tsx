"use client";

import { faqData } from "@/constants";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  HelpCircle,
  Mail,
  Phone,
  Shield,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import React, { useState } from "react";

const categories = [
  { name: "All", icon: HelpCircle },
  { name: "Products & Quality", icon: Shield },
  { name: "Orders & Shopping", icon: ShoppingCart },
  { name: "Delivery & Shipping", icon: Truck },
  { name: "Payment & Pricing", icon: CreditCard },
  { name: "Returns & Support", icon: Users },
];

const FAQPageComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primaryColor to-primaryColor/80 p-4 rounded-full shadow-lg">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about German Butcher products,
            orders, delivery, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor"
            />
            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? "bg-primaryColor text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="p-6">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No FAQs Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or category filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {faq.question}
                        </h3>
                        <span className="text-sm text-primaryColor font-medium mt-1 inline-block">
                          {faq.category}
                        </span>
                      </div>
                      <div className="ml-4">
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-primaryColor" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primaryColor" />
                        )}
                      </div>
                    </button>
                    {openItems.includes(faq.id) && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Still Have Questions?
            </h2>
            <p className="text-gray-600">
              Our customer support team is here to help you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 p-6 rounded-xl border border-primaryColor/20">
              <div className="flex items-center mb-4">
                <div className="bg-primaryColor/20 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-primaryColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 text-sm">
                    Get immediate assistance
                  </p>
                </div>
              </div>
              <p className="text-primaryColor font-semibold">
                +880-1234-567890
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Sunday - Thursday, 9:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 p-6 rounded-xl border border-primaryColor/20">
              <div className="flex items-center mb-4">
                <div className="bg-primaryColor/20 p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-primaryColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 text-sm">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
              <p className="text-primaryColor font-semibold">
                support@germanbutcherbd.com
              </p>
              <p className="text-gray-600 text-sm mt-1">
                For detailed inquiries and support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPageComponent;
