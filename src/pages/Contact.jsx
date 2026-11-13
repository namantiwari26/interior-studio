import React, { useState } from 'react';
import { BRAND } from '../data/content';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  Sparkles, CheckCircle2, ArrowUpRight, Building 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa',
    area: '',
    budget: '₹ 50 Lakhs - ₹ 1.5 Cr',
    timeline: 'Within 3 - 6 Months',
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
    if (!formData.message.trim()) errs.message = 'Please provide details about your spatial vision';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // In production, would send to API endpoint
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>DISCOVERY & COMMISSION INQUIRY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white leading-tight">
            Let&apos;s create something <br />
            <span className="italic font-normal text-amber-300">extraordinary together.</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            Book an initial architectural consultation at our Ambala design studio or request a private site audit across Northern India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white">Consultation Request Received</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md">
                    Thank you, <span className="text-amber-300 font-semibold">{formData.name}</span>. Our principal architect will review your project parameters and contact you within 24 hours at <span className="text-white font-mono">{formData.phone}</span>.
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
                        budget: '₹ 50 Lakhs - ₹ 1.5 Cr',
                        timeline: 'Within 3 - 6 Months',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full glass-pill border border-white/20 text-xs text-neutral-300 hover:text-white"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Arjun Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-900/80 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors ${
                          errors.name ? 'border-red-400' : 'border-white/10'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="arjun@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-900/80 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors ${
                          errors.email ? 'border-red-400' : 'border-white/10'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-900/80 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors ${
                          errors.phone ? 'border-red-400' : 'border-white/10'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Commission Discipline
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Residential Villa">Private Residential Villa</option>
                        <option value="Luxury Penthouse">Luxury High-Rise Penthouse</option>
                        <option value="Commercial / Hospitality">Commercial & Hospitality Space</option>
                        <option value="Modular Kitchen & Wardrobe">Modular Kitchen & Joinery</option>
                        <option value="Full Turnkey Execution">Full Turnkey Civil & Interior</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Estimated Area */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Approx. Area (sq. ft.)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 7,500 sq.ft."
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      >
                      </input>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Investment Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="₹ 35 Lakhs - ₹ 75 Lakhs">₹ 35 Lakhs - ₹ 75 Lakhs</option>
                        <option value="₹ 75 Lakhs - ₹ 1.5 Cr">₹ 75 Lakhs - ₹ 1.5 Cr</option>
                        <option value="₹ 1.5 Cr - ₹ 3 Cr">₹ 1.5 Cr - ₹ 3 Cr</option>
                        <option value="₹ 3 Cr+ Bespoke Luxury">₹ 3 Cr+ Bespoke Luxury</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                      Project Vision & Site Details *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your plot location, lifestyle requirements, or family entertaining needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-900/80 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors ${
                        errors.message ? 'border-red-400' : 'border-white/10'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-amber-400 text-neutral-950 font-semibold text-sm hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Private Architectural Consultation</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Studio Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Headquarters Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-amber-400">
                <Building className="w-4 h-4" />
                <span>Atelier Headquarters</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-white">Ambala Studio</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {BRAND.headquarters}
              </p>

              <div className="pt-2 flex flex-col gap-2.5 text-xs">
                <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 text-amber-300 hover:text-white font-mono">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{BRAND.phone}</span>
                </a>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-neutral-300 hover:text-white">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{BRAND.email}</span>
                </a>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Mon – Sat: 10:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Stylized Architectural Map Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between h-[240px] relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C9A46A_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">Geographic Reach</span>
                <h4 className="text-lg font-serif text-white mt-1">Northern India & Metros</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Active commissions across Ambala, Chandigarh Tri-City, New Delhi, Gurugram, Ludhiana, and Panipat.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                <span className="text-neutral-400">On-Site Consultations Available</span>
                <span className="text-amber-400 font-mono font-medium">Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

