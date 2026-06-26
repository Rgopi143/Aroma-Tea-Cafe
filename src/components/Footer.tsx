import React from 'react';
import { Phone, Instagram, MapPin, User, QrCode, Star, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { OWNER_DETAILS, VINTAGE_QRS_PATH } from '../data';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t-4 border-[#D4AF37] bg-radial from-[#221208] to-[#120904] text-[#EAD2B6]/80 shadow-2xl">
      {/* Top golden glowing separator line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20"></div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          
          {/* Section 1: Contact, proprietor & Location Card */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl font-black text-white">
              Py's <span className="text-[#D4AF37]">Aromaa</span> Cafe
            </h3>
            <p className="text-xs text-[#EAD2B6]/70 leading-relaxed">
              Serving the finest hot ginger teas, traditional filter coffees, sugar-free bellam (jaggery) specialties, and handcrafted summer mojitos. Visit us today!
            </p>

            {/* Profile Detail list */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm">
                <div className="rounded-lg bg-black/40 p-2 border border-stone-800 text-[#D4AF37]">
                  <User size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold leading-none">
                    Proprietor
                  </span>
                  <span className="text-white font-semibold">
                    {OWNER_DETAILS.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm">
                <div className="rounded-lg bg-black/40 p-2 border border-stone-800 text-emerald-400">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold leading-none">
                    Contact Phone
                  </span>
                  <span className="text-white font-semibold">
                    {OWNER_DETAILS.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm">
                <div className="rounded-lg bg-black/40 p-2 border border-stone-800 text-amber-500">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold leading-none">
                    Address Location
                  </span>
                  <span className="text-white font-semibold">
                    {OWNER_DETAILS.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm">
                <div className="rounded-lg bg-black/40 p-2 border border-stone-800 text-pink-400">
                  <Instagram size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold leading-none">
                    Instagram Handle
                  </span>
                  <span className="text-white font-semibold hover:underline cursor-pointer flex items-center gap-0.5">
                    {OWNER_DETAILS.instagram} <ExternalLink size={10} className="text-stone-500" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Stylized Vintage QR Code Plaque - Solves "Add QR Code for UPI, Google, Instagram Page" */}
          <div className="md:col-span-8 space-y-5">
            <div>
              <h4 className="font-serif text-lg font-black tracking-wide text-[#D4AF37] uppercase flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-amber-500" /> Scan & Connect At The Counter
              </h4>
              <p className="text-xs text-[#EAD2B6]/70 mt-0.5">
                Scan our premium vintage board at the counter for instant UPI, Instagram feed access, and Google reviews!
              </p>
            </div>

            {/* Vintage QR Board Graphic Container */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 bg-black/40 p-1.5 shadow-xl transition-all hover:scale-[1.005] hover:border-amber-400 duration-300">
              <img
                src={VINTAGE_QRS_PATH}
                alt="Py's Aromaa Cafe Vintage QR Code Board (UPI, Instagram, Google Reviews)"
                className="w-full h-auto object-cover rounded-xl border border-amber-900/30 opacity-95 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/vintageqrs/800/450?blur=1";
                }}
              />
              <div className="absolute top-4 right-4 bg-[#2C160B] text-white border border-[#D4AF37] px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase shadow">
                Counter Board
              </div>
            </div>

            {/* High legibility descriptors */}
            <div className="grid gap-3.5 sm:grid-cols-3 pt-1 text-center sm:text-left">
              <div className="rounded-xl bg-black/30 border border-[#D4AF37]/10 p-3.5 space-y-1">
                <span className="text-xs font-black text-white block uppercase tracking-wider">
                  ⚡ UPI Payments
                </span>
                <p className="text-[11px] text-[#EAD2B6]/70 leading-relaxed">
                  Fast and secure directly to Ch. Pawan Kumar via <strong>{OWNER_DETAILS.phone}@ybl</strong>
                </p>
              </div>

              <div className="rounded-xl bg-black/30 border border-[#D4AF37]/10 p-3.5 space-y-1">
                <span className="text-xs font-black text-white block uppercase tracking-wider">
                  📸 Instagram Feed
                </span>
                <p className="text-[11px] text-[#EAD2B6]/70 leading-relaxed">
                  Stay updated on daily deals and weekend specials by following <strong>{OWNER_DETAILS.instagram}</strong>
                </p>
              </div>

              <div className="rounded-xl bg-black/30 border border-[#D4AF37]/10 p-3.5 space-y-1">
                <span className="text-xs font-black text-white block uppercase tracking-wider">
                  ⭐ Google Reviews
                </span>
                <p className="text-[11px] text-[#EAD2B6]/70 leading-relaxed">
                  Support our family tea-house! Rate us 5-stars to spread the aromaa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Google Map Location */}
        <div className="mt-10 pt-8 border-t border-[#D4AF37]/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif text-lg font-black tracking-wide text-[#D4AF37] uppercase flex items-center gap-1.5">
                <MapPin className="h-4.5 w-4.5 text-amber-500" /> Find us on Vinukonda Road
              </h4>
              <p className="text-xs text-[#EAD2B6]/70 mt-0.5">
                Located on {OWNER_DETAILS.location}, Andhra Pradesh, India. Drop by for a premium, warm cup!
              </p>
            </div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=16.21777809151313,80.04580807156141" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-bold text-amber-500 hover:text-white flex items-center gap-1 transition-colors self-start sm:self-center bg-black/30 px-3 py-1.5 rounded-lg border border-[#D4AF37]/20 hover:border-amber-400"
            >
              Open in Google Maps <ExternalLink size={12} />
            </a>
          </div>

          {/* Map Area with the user-provided panoramic street-view iframe */}
          <div className="relative h-[320px] w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1782331750179!5m2!1sen!2sin!6m8!1m7!1soKcMhDxHiXCfPU25xvowlA!2m2!1d16.21777809151313!2d80.04580807156141!3f274.04825732032697!4f0.5394205187378276!5f0.7820865974627469"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Py's Aromaa Cafe Location"
            ></iframe>
          </div>
        </div>

        {/* Bottom copyright credentials */}
        <div className="mt-12 border-t border-stone-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-xs text-stone-500 font-medium">
          <p>© 2025 RANBIDGE Solutions Private Limited. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-600 fill-red-600" /> for tea-lovers & coffee-connoisseurs
          </p>
        </div>
      </div>
    </footer>
  );
}
