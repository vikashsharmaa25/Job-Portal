import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Divider } from "antd";

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const footerSections = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog"],
    },
    {
      title: "Resources",
      links: [
        "Job Search Tips",
        "Resume Builder",
        "Career Advice",
        "Salary Calculator",
      ],
    },
  ];

  return (
    <>
      <footer className="bg-gradient-to-r from-gray-700 via-gray-900 to-black pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between gap-8 mb-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Job Hunt
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Connecting talent with opportunity. Your next career move starts
                here.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {footerSections.map((section, index) => (
              <div key={section.title} className="">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer flex justify-between items-center">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2024 Job Hunt. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <a
                href="mailto:contact@jobhunt.com"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center"
              >
                <Mail size={16} className="mr-2" /> contact@jobhunt.com
              </a>
              <a
                href="tel:+1234567890"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center"
              >
                <Phone size={16} className="mr-2" /> +1 (234) 567-890
              </a>
              <span className="text-sm text-gray-600 flex items-center">
                <MapPin size={16} className="mr-2" /> New York, NY 10001
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
