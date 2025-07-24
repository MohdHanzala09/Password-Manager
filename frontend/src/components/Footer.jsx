import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand & Description */}
          <div>
            <h3 className="text-xl font-semibold text-cyan-400">SecureVault</h3>
            <p className="mt-2 text-sm">
              Your trusted password manager. Securely store and manage your passwords with end-to-end encryption.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#" className="hover:text-white">Features</a></li>
              <li><a href="/#" className="hover:text-white">Pricing</a></li>
              <li><a href="/#" className="hover:text-white">Support</a></li>
              <li><a href="/#" className="hover:text-white">Security</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/#" className="hover:text-white">Compliance</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-xs">
          © 2025 SecureVault. All rights reserved. | End-to-end encrypted & GDPR compliant.
        </p>
      </div>
    </footer>

    </>
  )
}

export default Footer
