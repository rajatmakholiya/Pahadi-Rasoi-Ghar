"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button"; 
import { Label } from "@/components/ui/label"; 
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="  text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 dark:border-gray-300 mb-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1f1e1e] shadow-lg rounded-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We&apos;d love to hear from you! Please fill out the form below or reach out using our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-[#1f1e1e] dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-[#1f1e1e] dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-[#1f1e1e] dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#ff5757] text-white py-2 px-4 rounded-md hover:bg-[#e64a4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] dark:focus:ring-offset-gray-800"
              >
                Submit Message
              </Button>
            </form>
          </div>

          
          <div className="order-1 md:order-2 bg-gray-100 dark:bg-[#1f1e1e] rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-200">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-[#ff5757]" />
                  <p>Praneeth Nagar, Near ORR Mallampet, Hyderabad</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-[#ff5757]" />
                  <p>+91 9756020209</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-[#ff5757]" />
                  <p>+91 9949994989</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-[#ff5757]" />
                  <p>info@pahadirasoi.com</p>
                </div>
              </div>
            </div>

            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-[#ff5757]">
                  <Facebook className="h-7 w-7" />
                </a>
                <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-[#ff5757]">
                  <Instagram className="h-7 w-7" />
                </a>
                <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-[#ff5757]">
                  <Twitter className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact