import React, { useState } from "react";
import { Menu, X, Home, User, Settings, Mail, FileText } from "lucide-react";

export default function SlidingSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SECTION Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <User size={20} />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FileText size={20} />
              <span>Documents</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Mail size={20} />
              <span>Messages</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* SECTION Main Content */}
      <div
        className={`flex-1 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Click the menu button in the top-left corner to open the
                sidebar. The sidebar will slide in from the left while pushing
                the main content to the right.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Feature 1
                  </h3>
                  <p className="text-blue-600">
                    This is some sample content to demonstrate how the layout
                    works with the sidebar animation.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Feature 2
                  </h3>
                  <p className="text-green-600">
                    The smooth transition ensures a professional user experience
                    as the sidebar slides in and out.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Content
              </h3>
              <p className="text-gray-600 mb-4">
                This content area will smoothly slide to the right when the
                sidebar is opened, creating a pleasant push effect rather than
                overlaying the content.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800">Sample Item 1</h4>
                  <p className="text-gray-600 text-sm">
                    Description of the first item
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800">Sample Item 2</h4>
                  <p className="text-gray-600 text-sm">
                    Description of the second item
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800">Sample Item 3</h4>
                  <p className="text-gray-600 text-sm">
                    Description of the third item
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* SECTION Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
