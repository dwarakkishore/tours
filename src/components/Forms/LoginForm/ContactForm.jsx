"use client";
import { storePotentialLead } from "@/utils/firebase";
import React, { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Send, User, Mail, Phone, Compass } from "lucide-react";
import { trackLeadFormConversion } from "@/utils/conversion";

const ContactForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone field, only allow numbers
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, submit the form and reset
    // Add your form submission logic here
    try {
      const response = await storePotentialLead({
        ...formData,
      });

      if (response) {
        trackLeadFormConversion();
        toast("Success", {
          description:
            "Form submitted, Our team will get in touch with you soon",
        });
      }
    } catch (error) {
      toast("Failed", {
        description: "Form submission failed. Try after sometime",
      });
    } finally {
      setFormData(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="group">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-800 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-white border rounded-lg px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 ${
              errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-[#0046b8] focus:ring-1 focus:ring-[#0046b8]"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-white border rounded-lg px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 ${
              errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-[#0046b8] focus:ring-1 focus:ring-[#0046b8]"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-800 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className={`w-full bg-white border rounded-lg px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 ${
              errors.phone ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-[#0046b8] focus:ring-1 focus:ring-[#0046b8]"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-800 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 outline-none transition-all focus:border-[#0046b8] focus:ring-1 focus:ring-[#0046b8] placeholder:text-slate-400 resize-none"
            placeholder="Enter your message (optional)"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#0046b8] hover:bg-[#00368a] text-white font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#0046b8]/20"
      >
        Submit
      </button>

      <div className="flex items-center justify-center gap-3 pt-2">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
          Uncompromised Privacy & Confidentiality
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
