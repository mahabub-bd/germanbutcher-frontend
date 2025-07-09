import { HeadingPrimary } from "@/components/common/heading-primary";
import { Database, Eye, FileText, Lock, Shield, Users } from "lucide-react";
import React from "react";

const PrivacyPolicyComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primaryColor to-primaryColor/80 p-4 rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <HeadingPrimary
            title="Privacy Policy"
            subtitle="Your privacy is important to us. Learn how we collect, use, and
            protect your information."
          />
        </div>

        {/* Main Content */}
        <div className="">
          {/* Introduction */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Introduction
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy manages the manner in which{" "}
              <span className="font-semibold text-primaryColor">
                German Butcher
              </span>{" "}
              collects, uses, maintains and discloses information collected from
              users of the{" "}
              <span className="font-semibold">germanbutcherbd.com</span> website
              or any kind of platform such as mobile applications. This privacy
              policy is applicable for the Site with all products and services
              offered by German Butcher.
            </p>
          </div>

          {/* Information Collection */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <Database className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                How We Collect Information
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              When you use our website, we collect and store your personal
              information which is provided by you. Our goal in doing so is to
              provide you a safe, efficient, smooth shopping experience. This
              allows us to provide services and features that most likely meet
              your needs, and to customize our website to make your experience
              safer and easier.
            </p>

            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 p-6 rounded-xl border border-primaryColor/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primaryColor" />
                Ways We Collect Information
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primaryColor rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We receive and store any information you enter on our website
                  or give us in any other way.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primaryColor rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We use the information that you provide for responding to your
                  requests, customizing future shopping, improving our stores,
                  and communicating with you.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primaryColor rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We store certain types of information whenever you interact
                  with us, including cookies and web browser information.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primaryColor rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We obtain certain types of information when your web browser
                  accesses germanbutcherbd.com or advertisements served by us.
                </li>
              </ul>
            </div>
          </div>

          {/* Information Protection */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-primaryColor/10 p-3 rounded-lg mr-4">
                <Lock className="w-6 h-6 text-primaryColor" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Information Protection
              </h2>
            </div>
            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 p-6 rounded-xl border border-primaryColor/20">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-primaryColor">
                  Information about our customers is an important part of our
                  business, and we are not in the business of selling it to
                  others.
                </span>
              </p>
            </div>
          </div>

          {/* Information Disclosure */}
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                When We Share Information
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We release account and other personal information when we believe
              release is appropriate to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">
                  Legal Compliance
                </h4>
                <p className="text-sm text-gray-700">
                  Comply with the law and legal requirements
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">
                  Terms Enforcement
                </h4>
                <p className="text-sm text-gray-700">
                  Enforce our Terms of Use and other agreements
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Safety Protection
                </h4>
                <p className="text-sm text-gray-700">
                  Protect rights, property, or safety of users
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Fraud Prevention
                </h4>
                <p className="text-sm text-gray-700">
                  Exchange information for fraud protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
