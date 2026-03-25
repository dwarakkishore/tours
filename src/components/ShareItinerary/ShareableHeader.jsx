import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ShareableHeader = ({ itineraryData }) => {

  const { 
    packageName, 
    destination, 
    bookingRef, 
    customerName, 
    travelDates, 
    duration,
    heroImage,
    pricing
  } = itineraryData;

  const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);
  const currencySymbol = pricing?.currency === 'INR' ? '₹' : (pricing?.currency || '₹');

  return (
    <>
      {/* Hero Section - Full Height on Mobile */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-blue-600 to-brand-blue min-h-screen flex items-center justify-center print:min-h-0 print:bg-white">
        {/* Hero Background Image */}
        <div className="absolute inset-0 print:hidden">
          <img
            src={heroImage || '/img/bali-hero.png'}
            alt={destination}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay - Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        {/* Outer Section Logo - Absolute Top Left */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30 print:hidden">
          <Link href="/" className="block">
            <div className="relative h-10 w-auto md:h-12 aspect-[130/27]">
              <Image
                src="/Bayard_white_logo.svg"
                alt="Bayard Vacations"
                fill
                className="object-contain object-left cursor-pointer"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 text-center px-4 py-8 print:hidden">

          <div className="mt-8 md:mt-0 max-w-4xl mx-auto px-4 lg:px-20">
            <div className="mb-4">
              <p className="font-great-vibes text-xl lg:text-3xl text-white/90 mb-1 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Specially Curated For
              </p>
              <h2 className="text-2xl lg:text-4xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase tracking-[0.2em] [text-shadow:0_0_20px_rgba(0,0,0,0.4)]">
                {customerName}
              </h2>
            </div>
            <p className="font-great-vibes text-2xl lg:text-4xl xl:text-5xl mb-2 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] filter drop-shadow(0_0_20px_rgba(0,0,0,0.5)) -rotate-3 translate-y-1 tracking-[0.05em] select-none py-2 px-4 inline-block [-webkit-text-stroke:0.5px_rgba(0,0,0,0.2)]">
              Experience
            </p>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-wider leading-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] [text-shadow:0_0_30px_rgba(0,0,0,0.3)]">
              {packageName}
            </h1>
            
            {/* Duration Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-6 py-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm md:text-base font-bold tracking-wider">
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Print Version - Simplified */}
        <div className="hidden print:block relative py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative h-8 w-auto aspect-[130/27]">
              <Image
                src="/Bayard_white_logo.svg"
                alt="Bayard Vacations"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Booking Ref</p>
                <p className="text-brand-blue text-sm font-bold leading-none">{bookingRef}</p>
              </div>
              {pricing && (
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">Trip Value</p>
                  <p className="text-brand-blue text-sm font-bold leading-none">
                    {currencySymbol}{formatPrice(pricing.totalPrice)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-brand-blue mb-2">{packageName}</h1>
          <p className="text-slate-600 text-sm">{destination} • {duration}</p>
        </div>

        <div className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 print:hidden items-end">
          <div className="flex flex-col gap-2 lg:gap-3 w-56 lg:w-64">
            {/* Booking Reference */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-[2rem] p-3 lg:p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest mb-1 lg:mb-1.5 letterspacing-wider">
                    Booking Reference
                  </p>
                  <p className="text-white text-sm lg:text-base font-bold tracking-wide">
                    {bookingRef}
                  </p>
                </div>
              </div>
            </div>


            {/* Travel Dates */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-[2rem] p-3 lg:p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest mb-1 lg:mb-1.5">
                    Travel Dates
                  </p>
                  <p className="text-white text-sm lg:text-base font-bold tracking-wide">
                    {travelDates?.displayCheckIn || 'DATES TO BE FINALIZED'}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-[2rem] p-3 lg:p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest mb-1 lg:mb-1.5">
                    Destination
                  </p>
                  <p className="text-white text-sm lg:text-base font-bold tracking-wide">
                    {destination}
                  </p>
                </div>
              </div>
            </div>

            {/* Hotel Category */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-[2rem] p-3 lg:p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest mb-1 lg:mb-1.5">
                    Hotel Category
                  </p>
                  <p className="text-white text-sm lg:text-base font-bold tracking-wide">
                    {pricing?.hotelCategory || 'STANDARD'}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Estimate */}
            {pricing && (
              <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-[2rem] p-3 lg:p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/80 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest mb-1 lg:mb-1.5">
                      Total
                    </p>
                    <p className="text-white text-sm lg:text-base font-bold tracking-wide">
                      {currencySymbol}{formatPrice(pricing.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip Details Card - Below Hero on Mobile Only */}
      <div className="md:hidden bg-slate-50/50 pt-4 pb-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Details Grid - 2x2 for clean hierarchy */}
          <div className="grid grid-cols-2 gap-3">
            {/* Booking Reference */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-3 shadow-md shadow-blue-100">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Booking ID
              </p>
              <p className="text-slate-900 text-sm font-bold truncate">
                {bookingRef}
              </p>
            </div>


            {/* Travel Dates */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-md shadow-green-100">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Travel Date
              </p>
              <p className="text-slate-900 text-sm font-bold">
                {travelDates?.displayCheckIn || 'TBA'}
              </p>
            </div>

            {/* Destination */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-3 shadow-md shadow-orange-100">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Destination
              </p>
              <p className="text-slate-900 text-sm font-bold truncate">
                {destination}
              </p>
            </div>

            {/* Hotel Category */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center mb-3 shadow-md shadow-emerald-100">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Hotel Tier
              </p>
              <p className="text-slate-900 text-sm font-bold truncate">
                {pricing?.hotelCategory || 'Standard'}
              </p>
            </div>

            {/* Price Estimate */}
            {pricing && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-md shadow-purple-100">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  Total
                </p>
                <p className="text-slate-900 text-sm font-bold truncate">
                  {currencySymbol}{formatPrice(pricing.totalPrice)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareableHeader;
