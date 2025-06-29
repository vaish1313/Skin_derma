import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Smile,
  MoreVertical,
  Users,
  Heart,
  MessageCircle,
  Share,
  Stethoscope,
  Camera,
  Search,
} from "lucide-react";

interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  likes: number;
  replies: number;
  image?: string;
  isOwn?: boolean;
}

const CommunityChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah K.",
      message:
        "Has anyone tried the new ceramide moisturizer? I'm looking for something gentle for sensitive skin.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 5,
    },
    {
      id: 2,
      user: "Dr. Patel",
      message:
        "Remember to always wear sunscreen, even on cloudy days! It's the most effective anti-aging prevention.",
      timestamp: "4 hours ago",
      likes: 28,
      replies: 8,
    },
    {
      id: 3,
      user: "Mike R.",
      message:
        "Finally found a routine that works for my acne-prone skin. Consistency is key!",
      timestamp: "6 hours ago",
      likes: 15,
      replies: 12,
      image:
        "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg",
    },
    {
      id: 4,
      user: "Emma L.",
      message:
        "Can anyone recommend a good dermatologist in Chicago? Moving there next month.",
      timestamp: "8 hours ago",
      likes: 7,
      replies: 15,
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: "You",
        message: message.trim(),
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLike = (id: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">
                Community Chat
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Community Info */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Skin Health Support Community
              </h2>
              <p className="text-sm text-gray-600">
                2,847 members • 156 online now
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Today's Active Topics</div>
              <div className="flex space-x-4 text-xs text-gray-500">
                <span>#SkinCare</span>
                <span>#Acne</span>
                <span>#AntiAging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white rounded-xl shadow-sm p-6 ${
                  msg.isOwn ? "border-l-4 border-blue-500" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        msg.isOwn ? "bg-blue-500" : "bg-green-500"
                      }`}
                    >
                      {msg.user.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {msg.user}
                      </h4>
                      <p className="text-sm text-gray-500">{msg.timestamp}</p>
                    </div>
                  </div>
                  <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {msg.message}
                </p>

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Shared image"
                    className="w-full max-w-md h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                    onClick={() => handleLike(msg.id)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>{msg.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{msg.replies}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t flex-shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="flex items-end space-x-4"
            >
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, ask questions, or offer support..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Camera className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Smile className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                // Handle file upload logic here
                console.log("File selected:", e.target.files?.[0]);
              }}
            />
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-blue-50 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-3">
            <Stethoscope className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Community Guidelines:</strong> Be respectful, share
              experiences responsibly, and remember that advice shared here
              should not replace professional medical consultation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
