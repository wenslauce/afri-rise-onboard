
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 md:py-16 bg-afririse-950 text-white/80">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <span className="bg-afririse-500 text-white px-2 py-1 rounded-md">Afri</span>
              <span>Rise</span>
            </div>
            <p className="mb-6">
              Financial solutions tailored for African businesses, driving growth and development across the continent.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Business Loans</a></li>
              <li><a href="#" className="hover:text-white">Project Financing</a></li>
              <li><a href="#" className="hover:text-white">Trade Finance</a></li>
              <li><a href="#" className="hover:text-white">Asset Financing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Team</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
              <li><a href="#" className="hover:text-white">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} AfriRise. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
