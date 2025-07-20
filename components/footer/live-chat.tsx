"use client";
import {
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Minimize2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Custom SVG Icons with improved accessibility
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    role="img"
    aria-label="WhatsApp"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
);

const MessengerIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    role="img"
    aria-label="Facebook Messenger"
  >
    <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.498 1.744 6.705 4.473 8.758V24l4.086-2.24c1.09.301 2.246.464 3.441.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
  </svg>
);

type Platform = "whatsapp" | "messenger" | null;

interface Message {
  id: number | Date;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

interface UserInfo {
  name: string;
  message: string;
  submitted: boolean;
}

interface BusinessInfo {
  whatsapp: {
    number: string;
    name: string;
    status: string;
  };
  messenger: {
    pageId: string;
    name: string;
    status: string;
  };
}

const WhatsAppMessengerWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    message: "",
    submitted: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const businessInfo: BusinessInfo = {
    whatsapp: {
      number: "+8801711852202",
      name: "Customer Support",
      status: "Usually replies within minutes",
    },
    messenger: {
      pageId: "your-facebook-page-id",
      name: "Live Chat Support",
      status: "Active now",
    },
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize welcome message when platform is selected
  useEffect(() => {
    if (selectedPlatform) {
      const welcomeMessage: Message = {
        id: 1,
        text: `Hi! You've selected ${selectedPlatform === "whatsapp" ? "WhatsApp" : "Messenger"}. Please fill out the form below and we'll connect you instantly.`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedPlatform]);

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setUnreadCount(0);
  };

  const handleSendToWhatsApp = () => {
    if (!userInfo.name || !userInfo.message) return;

    const message = `Hi, I'm ${userInfo.name}. ${userInfo.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessInfo.whatsapp.number.replace("+", "")}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setUserInfo((prev) => ({ ...prev, submitted: true }));

    const confirmMessage: Message = {
      id: Date.now(),
      text: "Redirecting you to WhatsApp... You can continue the conversation there!",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, confirmMessage]);
  };

  const handleSendToMessenger = () => {
    if (!userInfo.name || !userInfo.message) return;

    const messengerUrl = `https://m.me/${businessInfo.messenger.pageId}?text=${encodeURIComponent(`Hi, I'm ${userInfo.name}. ${userInfo.message}`)}`;

    window.open(messengerUrl, "_blank");
    setUserInfo((prev) => ({ ...prev, submitted: true }));

    const confirmMessage: Message = {
      id: Date.now(),
      text: "Redirecting you to Messenger... You can continue the conversation there!",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, confirmMessage]);
  };

  const handleSubmit = () => {
    if (selectedPlatform === "whatsapp") {
      handleSendToWhatsApp();
    } else if (selectedPlatform === "messenger") {
      handleSendToMessenger();
    }
  };

  const handleBack = () => {
    setSelectedPlatform(null);
    setUserInfo({ name: "", message: "", submitted: false });
    setMessages([]);
  };

  const quickMessages = [
    "I need help with my order",
    "I have a question about your products",
    "I want to know about pricing",
    "I need technical support",
    "I want to speak to sales team",
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-20 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-primaryColor text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
          aria-label="Open live chat widget"
          aria-describedby={unreadCount > 0 ? "unread-messages" : undefined}
        >
          <MessageCircle className="w-5 h-5" />
          {unreadCount > 0 && (
            <span
              id="unread-messages"
              className="absolute -top-1 -right-1 bg-white text-green-500 border border-green-500 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              aria-label={`${unreadCount} unread messages`}
            >
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-2 right-5 z-50">
      <div
        className={`bg-white rounded-lg shadow-xl transition-all duration-300 ${
          isMinimized ? "w-64 h-12" : "w-64 min-h-72"
        }`}
        role="dialog"
        aria-labelledby="chat-widget-title"
        aria-modal="false"
      >
        {/* Header */}
        <div className="bg-primaryColor text-white p-5 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-white" />
            </div>
            <div>
              <h3 id="chat-widget-title" className="font-semibold text-sm">
                Live Chat
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-0.5 hover:bg-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-white"
              aria-label={
                isMinimized ? "Expand chat widget" : "Minimize chat widget"
              }
            >
              <Minimize2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-0.5 hover:bg-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-white"
              aria-label="Close chat widget"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Platform Selection */}
            {!selectedPlatform && (
              <div className="p-3 h-56 flex flex-col justify-center">
                <div className="text-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    How would you like to chat?
                  </h3>
                </div>

                <div
                  className="space-y-2"
                  role="group"
                  aria-label="Choose messaging platform"
                >
                  {/* WhatsApp Option */}
                  <button
                    onClick={() => handlePlatformSelect("whatsapp")}
                    className="w-full p-2 rounded-lg border border-gray-200 hover:border-green-500 transition-all duration-200 hover:bg-green-50 group focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Start WhatsApp conversation - Usually replies within minutes"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <WhatsAppIcon size={16} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-xs text-gray-800">
                          WhatsApp
                        </h4>
                        <p className="text-[10px] text-gray-600">
                          {businessInfo.whatsapp.status}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Messenger Option */}
                  <button
                    onClick={() => handlePlatformSelect("messenger")}
                    className="w-full p-2 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200 hover:bg-blue-50 group focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Start Messenger conversation - Active now"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <MessengerIcon size={16} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-xs text-gray-800">
                          Messenger
                        </h4>
                        <p className="text-[10px] text-gray-600">
                          {businessInfo.messenger.status}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Selected Platform Form */}
            {selectedPlatform && !userInfo.submitted && (
              <div className="p-3 h-56 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                        selectedPlatform === "whatsapp"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {selectedPlatform === "whatsapp" ? (
                        <WhatsAppIcon size={14} className="text-white" />
                      ) : (
                        <MessengerIcon size={14} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-gray-800">
                        {selectedPlatform === "whatsapp"
                          ? "WhatsApp"
                          : "Messenger"}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 rounded"
                    aria-label="Go back to platform selection"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Messages */}
                <div
                  className="space-y-2 mb-2"
                  role="log"
                  aria-label="Chat messages"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id.toString()}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-lg max-w-[180px]">
                        <p className="text-xs">{message.text}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-2"
                >
                  <div>
                    <label htmlFor="user-name" className="sr-only">
                      Your name
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      placeholder="Your name"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                      aria-describedby="name-help"
                    />
                    <span id="name-help" className="sr-only">
                      Enter your name to start the conversation
                    </span>
                  </div>
                  <div>
                    <label htmlFor="user-message" className="sr-only">
                      Your message
                    </label>
                    <textarea
                      id="user-message"
                      placeholder="Your message"
                      value={userInfo.message}
                      onChange={(e) =>
                        setUserInfo((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-14 resize-none"
                      required
                      aria-describedby="message-help"
                    />
                    <span id="message-help" className="sr-only">
                      Enter your message or select a quick message below
                    </span>
                  </div>

                  {/* Quick Messages */}
                  <div className="mb-1">
                    <p className="text-[10px] text-gray-600 mb-1">
                      Quick messages:
                    </p>
                    <div
                      className="flex flex-wrap gap-1"
                      role="group"
                      aria-label="Quick message options"
                    >
                      {quickMessages.map((msg, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setUserInfo((prev) => ({ ...prev, message: msg }))
                          }
                          className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
                          aria-label={`Use quick message: ${msg}`}
                        >
                          {msg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!userInfo.name || !userInfo.message}
                    className={`w-full py-1.5 rounded-lg transition-colors flex items-center justify-center space-x-1 my-4 text-xs focus:outline-none focus:ring-2 ${
                      userInfo.name && userInfo.message
                        ? selectedPlatform === "whatsapp"
                          ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
                          : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300"
                    }`}
                    aria-label={`Continue to ${selectedPlatform === "whatsapp" ? "WhatsApp" : "Messenger"}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Continue</span>
                  </button>
                </form>
              </div>
            )}

            {/* Success Message */}
            {userInfo.submitted && (
              <div className="p-3 h-56 flex flex-col justify-center items-center text-center">
                <CheckCircle
                  className="w-8 h-8 text-green-500 mb-2"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  Message Sent!
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Continue in{" "}
                  {selectedPlatform === "whatsapp" ? "WhatsApp" : "Messenger"}
                </p>
                <button
                  onClick={handleBack}
                  className="text-green-500 hover:text-green-600 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 rounded"
                  aria-label="Start a new conversation"
                >
                  New conversation
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WhatsAppMessengerWidget;
