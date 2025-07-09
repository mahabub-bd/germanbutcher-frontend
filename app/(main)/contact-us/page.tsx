"use client";
import { HeadingPrimary } from "@/components/common/heading-primary";
import { postData } from "@/utils/api-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  mobile: z
    .string()
    .min(11, "Mobile number must be at least 11 digits")
    .max(11, "Mobile number must be less than 11 digits")
    .regex(/^\+?[0-9]+$/, "Please enter a valid mobile number"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await postData("contact-messages", data);

      toast.success("Message sent successfully!", {
        description: "We will get back to you within 24 hours.",
        duration: 5000,
      });

      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";

      toast.error("Failed to send message", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryColor/5 via-white to-primaryColor/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden ">
        <div className="relative container mx-auto px-4 py-5">
          <div className="max-w-3xl mx-auto text-center">
            <HeadingPrimary
              title=" Get In Touch"
              subtitle=" Have questions about our products or services? We'd love to hear
              from you. Send us a message and we'll respond as soon as possible."
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 border border-primaryColor/10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Send us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("name")}
                    type="text"
                    className={`w-full pl-12 pr-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all duration-200 bg-gray-50/50 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.name.message}
                  </div>
                )}
              </div>

              {/* Email and Mobile Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full pl-12 pr-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all duration-200 bg-gray-50/50 ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("mobile")}
                      type="tel"
                      className={`w-full pl-12 pr-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all duration-200 bg-gray-50/50 ${
                        errors.mobile ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="+8801234567890"
                    />
                  </div>
                  {errors.mobile && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.mobile.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`w-full pl-12 pr-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all duration-200 resize-none bg-gray-50/50 ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  {errors.message ? (
                    <div className="flex items-center text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.message.message}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      messageLength > 500 ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {messageLength}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className={` inline-flex items-center justify-center space-x-3 py-2 px-8 rounded-xl transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primaryColor hover:bg-primaryColor/90 focus:ring-4 focus:ring-primaryColor/20 transform hover:scale-[1.02] active:scale-[0.98]"
                } text-white shadow-lg`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
