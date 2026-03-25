'use client';

import React from 'react';
import ShareableHeader from './ShareableHeader';
import ShareableHighlights from './ShareableHighlights';
import ShareablePricing from './ShareablePricing';
import ShareableItineraryBook from './ShareableItineraryBook';
import ShareableHotelInfo from './ShareableHotelInfo';
import ShareableInclusions from './ShareableInclusions';
import ShareablePaymentInfo from './ShareablePaymentInfo';
import ShareableActivitiesCarousel from './ShareableActivitiesCarousel';
import ShareableFAQ from './ShareableFAQ';
import ShareableTestimonials from './ShareableTestimonials';
import ShareableBlogsCarousel from './ShareableBlogsCarousel';
import ShareableNotes from './ShareableNotes';
import ShareableFooter from './ShareableFooter';

const ShareableItineraryClient = ({ itineraryData }) => {

  if (!itineraryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Itinerary Not Found
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            The requested itinerary could not be found or may have been removed.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-blue to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header with booking details */}
      <ShareableHeader itineraryData={itineraryData} />

      {/* 2. Package Highlights - NEW */}
      <ShareableHighlights highlights={itineraryData.highlights} />

    

      {/* 4. Day-by-day itinerary */}
      <ShareableItineraryBook itineraries={itineraryData.itineraries} />

      {/* 5. Hotel Information */}
      <ShareableHotelInfo hotelDetails={itineraryData.hotelDetails} />

      {/* 6. Recommended Activities Carousel */}
      {/* <ShareableActivitiesCarousel destination={itineraryData.destination} /> */}

        {/* 3. Pricing Section - NEW */}
      <ShareablePricing pricing={itineraryData.pricing} travelers={itineraryData.travelers} />

      {/* 7. Inclusions and Exclusions */}
      <ShareableInclusions 
        inclusions={itineraryData.inclusions} 
        exclusions={itineraryData.exclusions} 
      />

      {/* 8. Important Notes - NEW */}
      <ShareableNotes notes={itineraryData.importantNotes} />

      {/* 9. Payment Info & Terms - NEW */}
      <ShareablePaymentInfo 
        paymentTerms={itineraryData.paymentTerms}
        cancellationPolicy={itineraryData.cancellationPolicy}
        bookingTerms={itineraryData.bookingTerms}
      />

      {/* 9. FAQ Section - NEW */}
      <ShareableFAQ faqs={itineraryData.faqs} />

      {/* 10. Customer Testimonials - NEW */}
      <ShareableTestimonials testimonials={itineraryData.testimonials} />

      {/* 11. Travel Blogs Carousel */}
      <ShareableBlogsCarousel destination={itineraryData.destination} />

      {/* 12. Footer with contact info */}
      <ShareableFooter 
        contactInfo={itineraryData.contactInfo} 
      />

    </div>
  );
};

export default ShareableItineraryClient;
