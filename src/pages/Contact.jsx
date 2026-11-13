import React, { useState } from 'react';
import { BRAND } from '../data/content';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  CheckCircle2, Building 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa',
    area: '',
    budget: 'INR 50 Lakhs to 1.5 Cr',
    timeline: 'Within 3 to 6 Months',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.message.trim()) errs.message = 'Please provide details about your site or spatial requirements';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#2B2118] pt-28 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[rgba(60,45,30,0.14)] text-[10px] text-[#A9814A] font-mono uppercase tracking-[0.2em] mb-3">
            <span>Project Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#2B2118] leading-tight">
            Begin your architectural <br />
            <span className="italic font-normal text-[#A9814A]">consultation.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6254] mt-3 leading-relaxed">
            Schedule an initial consultation at our Ambala studio or request an on-site property review across Northern India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="card-ivory p-6 sm:p-9 rounded-2xl border border-[rgba(60,45,30,0.12)] shadow-sm relative">
              {submitted ? (
                <div className="py-14 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#EAE1D3] text-[#2B2118] flex items-center justify-center border border-[#A9814A]">
                    <CheckCircle2 className="w-6 h-6 text-[#A9814A]" strokeWidth={1.4} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#2B2118]">Consultation Request Received</h3>
                  <p className="text-xs sm:text-sm text-[#6F6254] max-w-md">
                    Thank you, <span className="text-[#2B2118] font-semibold">{formData.name}</span>. A principal architect will review your project parameters and contact you within 24 hours at <span className="font-mono text-[#2B2118]">{formData.phone}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Residential Villa',
                        area: '',
                        budget: 'INR 50 Lakhs to 1.5 Cr',
                        timeline: 'Within 3 to 6 Months',
                        message: ''
                      });
                    }}
                    className="mt-4 px-5 py-2 rounded-full border border-[rgba(60,45,30,0.2)] text-xs text-[#2B2118] hover:border-[#A9814A]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Arjun Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border text-xs text-[#2B2118] placeholder-[#A8A39A] focus:outline-none focus:border-[#A9814A] transition-colors ${
                          errors.name ? 'border-red-400' : 'border-[rgba(60,45,30,0.15)]'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="arjun@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border text-xs text-[#2B2118] placeholder-[#A8A39A] focus:outline-none focus:border-[#A9814A] transition-colors ${
                          errors.email ? 'border-red-400' : 'border-[rgba(60,45,30,0.15)]'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border text-xs text-[#2B2118] placeholder-[#A8A39A] focus:outline-none focus:border-[#A9814A] transition-colors ${
                          errors.phone ? 'border-red-400' : 'border-[rgba(60,45,30,0.15)]'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                        Commission Discipline
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border border-[rgba(60,45,30,0.15)] text-xs text-[#2B2118] focus:outline-none focus:border-[#A9814A] transition-colors"
                      >
                        <option value="Residential Villa">Private Residential Villa</option>
                        <option value="Luxury Penthouse">Duplex Penthouse</option>
                        <option value="Commercial / Hospitality">Commercial & Workplace</option>
                        <option value="Modular Kitchen & Wardrobe">Modular Kitchen & Joinery</option>
                        <option value="Full Turnkey Execution">Turnkey Civil & Fitout</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                        Approx. Area (sq. ft.)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 7,500 sq.ft."
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border border-[rgba(60,45,30,0.15)] text-xs text-[#2B2118] placeholder-[#A8A39A] focus:outline-none focus:border-[#A9814A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                        Investment Scope
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border border-[rgba(60,45,30,0.15)] text-xs text-[#2B2118] focus:outline-none focus:border-[#A9814A] transition-colors"
                      >
                        <option value="INR 35 Lakhs to 75 Lakhs">INR 35 Lakhs to 75 Lakhs</option>
                        <option value="INR 75 Lakhs to 1.5 Cr">INR 75 Lakhs to 1.5 Cr</option>
                        <option value="INR 1.5 Cr to 3 Cr">INR 1.5 Cr to 3 Cr</option>
                        <option value="INR 3 Cr+ Bespoke Estate">INR 3 Cr+ Bespoke Estate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono tracking-wider text-[#6F6254] mb-1">
                      Site Location & Spatial Requirements *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please note your plot size, city location, family gathering preferences, or architectural requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF6EF] border text-xs text-[#2B2118] placeholder-[#A8A39A] focus:outline-none focus:border-[#A9814A] transition-colors ${
                        errors.message ? 'border-red-400' : 'border-[rgba(60,45,30,0.15)]'
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full btn-primary text-xs font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Submit Architectural Inquiry</span>
                    <Send className="w-3.5 h-3.5" strokeWidth={1.4} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Studio Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="card-ivory p-6 rounded-2xl border border-[rgba(60,45,30,0.12)] flex flex-col gap-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-wider text-[#A9814A] font-semibold">
                <Building className="w-3.5 h-3.5" strokeWidth={1.4} />
                <span>Atelier Headquarters</span>
              </div>
              <h3 className="text-xl font-serif text-[#2B2118]">Ambala Studio</h3>
              <p className="text-xs text-[#6F6254] leading-relaxed">
                {BRAND.headquarters}
              </p>

              <div className="pt-2 flex flex-col gap-2 text-xs">
                <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 text-[#2B2118] hover:text-[#A9814A] font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                  <span>{BRAND.phone}</span>
                </a>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-[#6F6254] hover:text-[#2B2118]">
                  <Mail className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                  <span>{BRAND.email}</span>
                </a>
                <div className="flex items-center gap-2 text-[#6F6254]">
                  <Clock className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                  <span>Mon to Sat: 10:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Geographical Reach Card */}
            <div className="card-ivory p-6 rounded-2xl border border-[rgba(60,45,30,0.12)] flex flex-col justify-between h-[210px] shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A9814A] font-semibold">Project Reach</span>
                <h4 className="text-base font-serif text-[#2B2118] mt-1">Northern India Commissions</h4>
                <p className="text-xs text-[#6F6254] mt-1 leading-relaxed">
                  Active residential and turnkey commissions across Ambala, Chandigarh Tri-City, New Delhi, Gurugram, Ludhiana, and Panipat.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[rgba(60,45,30,0.08)] text-xs">
                <span className="text-[#6F6254]">On-Site Site Audits</span>
                <span className="text-[#A9814A] font-mono font-medium">Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
