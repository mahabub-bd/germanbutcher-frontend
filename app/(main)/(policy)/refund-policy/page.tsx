import { HeadingPrimary } from "@/components/common/heading-primary";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  RefreshCw,
  Shield,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const RefundPolicyComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primaryColor to-primaryColor/80 p-4 rounded-full shadow-lg">
              <RefreshCw className="w-12 h-12 text-white" />
            </div>
          </div>
          <HeadingPrimary
            title=" Refund Policy"
            subtitle=" We want you to be completely satisfied with your purchase from
            German Butcher. Learn about our refund and return process."
          />
        </div>

        {/* Main Content */}
        <div className=" overflow-hidden ">
          {/* Return Window */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Return Window
              </h2>
            </div>
            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 p-6 rounded-xl border border-primaryColor/20">
              <p className="text-gray-700 leading-relaxed mb-4">
                You have{" "}
                <span className="font-semibold text-primaryColor">7 days</span>{" "}
                from the date of delivery to return eligible items for a full
                refund. For perishable food items, returns must be initiated
                within{" "}
                <span className="font-semibold text-primaryColor">
                  24 hours
                </span>{" "}
                of delivery.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">
                    Non-perishable items: 7 days
                  </span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-sm text-gray-700">
                    Perishable items: 24 hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Eligible Items */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <Package className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Eligible Items for Return
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Returnable Items
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Unopened packaged items in original condition
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Defective or damaged products
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Wrong items delivered
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Non-perishable specialty items
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Non-Returnable Items
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Opened or consumed perishable items
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Custom-made or special order items
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Items without original packaging
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Items past the return window
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <Shield className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                How to Return Items
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primaryColor text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Contact Customer Service
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Call us at{" "}
                    <span className="font-semibold text-primaryColor">
                      +880-1234-567890
                    </span>{" "}
                    or email{" "}
                    <span className="font-semibold text-primaryColor">
                      support@germanbutcherbd.com
                    </span>{" "}
                    to initiate a return request.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primaryColor text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Get Return Authorization
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Our team will provide you with a return authorization number
                    and instructions for returning the item.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primaryColor text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Package & Send
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Package the item in its original packaging with the return
                    authorization number and send it back to us.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primaryColor text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Receive Refund
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Once we receive and inspect the returned item, we&quot;ll process
                    your refund within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Methods */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <CreditCard className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Refund Methods
              </h2>
            </div>

            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 p-6 rounded-xl border border-primaryColor/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Original Payment Method
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Credit/Debit Card refunds: 3-5 business days
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Mobile Banking: 1-2 business days
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Bank Transfer: 2-3 business days
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Store Credit
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Instant credit to your account
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Valid for 1 year from issue date
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Can be used for any purchase
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <AlertTriangle className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Important Notes
              </h2>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Shipping costs are non-refundable unless the return is due
                    to our error or a defective product.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Customers are responsible for return shipping costs unless
                    otherwise specified.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Refunds will be processed in the same currency as the
                    original purchase.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    For health and safety reasons, we cannot accept returns of
                    opened perishable items unless they are defective.
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    This policy may be updated from time to time. Please check
                    our website for the most current version.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Our customer service team is here to help with any questions about
            returns or refunds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <Link
              href="tel:+880-1234-567890"
              className="text-primaryColor hover:text-primaryColor/80 font-medium"
            >
              📞 +880-1234-567890
            </Link>
            <Link
              href="mailto:support@germanbutcherbd.com"
              className="text-primaryColor hover:text-primaryColor/80 font-medium"
            >
              ✉️ support@germanbutcherbd.com
            </Link>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Customer service hours: Sunday - Thursday, 9:00 AM - 6:00 PM (GMT+6)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyComponent;
