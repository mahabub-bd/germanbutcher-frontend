import { HeadingPrimary } from "@/components/common/heading-primary";
import { Database, Eye, FileText, Lock, Shield, Users } from "lucide-react";
import React from "react";

const PrivacyPolicyComponent: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <Shield className="w-8 h-8 text-gray-700" />
            </div>
          </div>
          <HeadingPrimary
            title="Privacy Policy"
            subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
          />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="border-b pb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold">Introduction</h2>
            </div>
            <p className="text-gray-700">
              This Privacy Policy manages the manner in which{" "}
              <span className="font-semibold">German Butcher</span> collects,
              uses, maintains and discloses information collected from users of
              the <span className="font-semibold">germanbutcherbd.com</span>{" "}
              website or any kind of platform such as mobile applications. This
              privacy policy is applicable for the Site with all products and
              services offered by German Butcher.
            </p>
          </div>

          {/* Information Collection */}
          <div className="border-b pb-8">
            <div className="flex items-center mb-4">
              <Database className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold">
                How We Collect Information
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              When you use our website, we collect and store your personal
              information which is provided by you. Our goal in doing so is to
              provide you a safe, efficient, smooth shopping experience. This
              allows us to provide services and features that most likely meet
              your needs, and to customize our website to make your experience
              safer and easier.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Eye className="w-4 h-4 mr-2 text-gray-700" />
                Ways We Collect Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-700 rounded-full mt-2 mr-2"></span>
                  We receive and store any information you enter on our website
                  or give us in any other way.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-700 rounded-full mt-2 mr-2"></span>
                  We use the information that you provide for responding to your
                  requests, customizing future shopping, improving our stores,
                  and communicating with you.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-700 rounded-full mt-2 mr-2"></span>
                  We store certain types of information whenever you interact
                  with us, including cookies and web browser information.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-700 rounded-full mt-2 mr-2"></span>
                  We obtain certain types of information when your web browser
                  accesses germanbutcherbd.com or advertisements served by us.
                </li>
              </ul>
            </div>
          </div>

          {/* Information Protection */}
          <div className="border-b pb-8">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold">Information Protection</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-700 font-medium">
                Information about our customers is an important part of our
                business, and we are not in the business of selling it to
                others.
              </p>
            </div>
          </div>

          {/* Information Disclosure */}
          <div className="">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold">
                When We Share Information
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              We release account and other personal information when we believe
              release is appropriate to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Legal Compliance",
                  description: "Comply with the law and legal requirements",
                  iconColor: "text-blue-500",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-200",
                },
                {
                  title: "Terms Enforcement",
                  description: "Enforce our Terms of Use and other agreements",
                  iconColor: "text-orange-500",
                  bgColor: "bg-orange-50",
                  borderColor: "border-orange-200",
                },
                {
                  title: "Safety Protection",
                  description: "Protect rights, property, or safety of users",
                  iconColor: "text-green-500",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-200",
                },
                {
                  title: "Fraud Prevention",
                  description: "Exchange information for fraud protection",
                  iconColor: "text-red-500",
                  bgColor: "bg-red-50",
                  borderColor: "border-red-200",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} p-4 rounded-lg border ${item.borderColor}`}
                >
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
