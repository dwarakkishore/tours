/**
 * Maps the saved itinerary data from Firestore (formData structure)
 * to the format expected by the ShareableItinerary components.
 */
export const mapSavedItineraryToShareable = (savedData, resolvedHotels = null) => {
  if (!savedData || !savedData.formData) return null;

  const { formData, id } = savedData;
  const { 
    coverPageData = {}, 
    welcomePageData = {}, 
    itineraryPageData = {}, 
    summaryPageData = {}, 
    pricingPageData = {}, 
    hotelDetailsData = {},
    backCoverPageData = {},
    tripHighlightsData = {}
  } = formData;

  // 1. Map itineraries
  const itineraries = (itineraryPageData.days || []).map((day, index) => {
    // Determine the source for activities (points, highlights, activities)
    const rawPoints = day.points || day.highlights || day.activities || day.dayItinerary || [];
    
    // Process activities - handle both string arrays and object arrays
    const activities = (Array.isArray(rawPoints) ? rawPoints : []).map(point => {
      if (typeof point === 'string') return { activity: point, description: '' };
      return {
        activity: point.title || point.activity || point.content || point.name || 'Activity',
        description: point.description || point.text || ''
      };
    });

    // Determine the source for images (images, imageRefs, gallery)
    const rawImages = day.images || day.imageRefs || day.gallery || day.photos || [];

    // Process images - handle both string arrays and object arrays
    const images = (Array.isArray(rawImages) ? rawImages : []).map(img => {
      if (typeof img === 'string') return { url: img, title: '' };
      return {
        url: img.preview || img.url || img.src || img.link || '',
        title: img.title || img.name || img.alt || ''
      };
    }).filter(img => img.url);

    return {
      day: day.day || index + 1,
      title: day.title || `Day ${day.day || index + 1}`,
      activities,
      overnight: day.overnight || '',
      meals: day.meals || [],
      imageRefs: images
    };
  });

  // 2. Map hotel details
  const baseCategory = hotelDetailsData.baseCategory || 'fourstar';
  const selectedHotelData = hotelDetailsData[baseCategory] || {};
  
  let hotelDetails = [];

  if (resolvedHotels && resolvedHotels.length > 0) {
    // Map from full database documents
    hotelDetails = resolvedHotels.map(hotel => ({
      name: hotel.name || 'Premium Hotel',
      category: hotel.type?.replace('_', ' ') || `${baseCategory.replace('star', ' Star').toUpperCase()}`,
      location: hotel.city || '',
      rating: parseInt(hotel.type?.charAt(0)) || 4,
      roomType: hotel.roomType || 'Standard Room',
      amenities: hotel.amenities || ['Free WiFi', 'Breakfast', 'AC'],
      checkIn: hotel.checkIn || '',
      checkOut: hotel.checkOut || '',
      images: hotel.images || []
    }));
  } else {
    // Fallback to minimal data in the itinerary itself
    hotelDetails = (selectedHotelData.hotels || []).map(hotel => ({
      name: hotel.name || 'Premium Hotel',
      category: `${baseCategory.replace('star', ' Star').toUpperCase()}`,
      location: hotel.city || '',
      rating: parseInt(baseCategory.charAt(0)) || 4,
      roomType: hotel.roomType || 'Standard Room',
      amenities: hotel.amenities || ['Free WiFi', 'Breakfast', 'AC'],
      checkIn: hotel.checkIn || '',
      checkOut: hotel.checkOut || '',
      images: hotel.images || []
    }));
  }

  // 3. Map pricing
  const travelers = {
    adults: parseInt(pricingPageData.numTravelers?.adults) || 2,
    children: parseInt(pricingPageData.numTravelers?.children) || 0,
    toddlers: parseInt(pricingPageData.numTravelers?.infants) || 0
  };

  // Detect per-person flag. Assume true if not explicitly false to match user's expected pattern
  const isPerPerson = 
    pricingPageData.isPerPerson !== false && 
    pricingPageData.perPerson !== false && 
    pricingPageData.per_person !== false &&
    pricingPageData.pricingType !== 'total';
  
  let adultsRate = parseFloat(pricingPageData.hotelCharges?.[baseCategory]) || 0;
  const childrenRate = parseFloat(pricingPageData.kidsPricing?.childWithBed || pricingPageData.kidsPricing?.childWithoutBed) || 0;
  const toddlersRate = parseFloat(pricingPageData.kidsPricing?.infant) || 0;

  // If specific rates are missing but a basePrice is provided
  if (adultsRate === 0 && pricingPageData.basePrice > 0) {
    if (isPerPerson) {
      // If it's a per-person quote, the basePrice IS the adultsRate
      adultsRate = parseFloat(pricingPageData.basePrice);
    } else {
      // If it's explicitly a total quote, calculate the per-person rate
      adultsRate = Math.round(parseFloat(pricingPageData.basePrice) / (travelers.adults || 1));
    }
  }

  // Calculate the actual total basePrice based on rates and counts
  // Total = (Adults * Rate) + (Kids * Rate) + (Infants * Rate)
  const basePrice = (travelers.adults * adultsRate) + (travelers.children * childrenRate) + (travelers.toddlers * toddlersRate);
  
  const gstRate = parseFloat(pricingPageData.taxes?.gst) || 5;
  const tcsRate = parseFloat(pricingPageData.taxes?.tcs) || 5;
  
  const gstAmount = Math.round(basePrice * (gstRate / 100));
  const tcsAmount = Math.round(basePrice * (tcsRate / 100));
  const totalPrice = basePrice + gstAmount + tcsAmount;

  const pricing = {
    basePrice,
    totalPrice,
    currency: 'INR',
    hotelCategory: baseCategory.replace('star', ' Star').toUpperCase(),
    adultsRate,
    childrenRate,
    toddlersRate,
    gstRate,
    gstAmount,
    tcsRate,
    tcsAmount,
    perPerson: isPerPerson
  };

  // 4. Map contact info
  const contactInfo = {
    companyName: "Bayard Vacations",
    phone: backCoverPageData.phoneNum || "+91 8069668484",
    email: backCoverPageData.email || "info@bayardvacations.com",
    website: "bayardvacations.com",
    destinationExpert: {
      name: backCoverPageData.name || "Travel Expert",
      designation: backCoverPageData.designation || "Destination Expert",
      email: backCoverPageData.email,
      phone: backCoverPageData.phoneNum
    }
  };

  return {
    id,
    bookingRef: `BV-${id.substring(0, 8).toUpperCase()}`,
    customerName: welcomePageData.customerName || "Our Valued Guest",
    packageName: coverPageData.title || "Your Custom Trip",
    destination: coverPageData.title || "Custom Destination",
    duration: `${coverPageData.nights || 0} Nights / ${coverPageData.days || 0} Days`,
    heroImage: coverPageData.preview || coverPageData.previewImage || coverPageData.backgroundImage,
    travelDates: null, // Not explicitly found in the top level log
    travelers,
    pricing,
    highlights: tripHighlightsData.images?.map(h => ({
      title: h.title || '',
      url: h.preview || h.url || h.src || ''
    })).filter(h => h.title) || [],
    itineraries,
    hotelDetails,
    inclusions: (summaryPageData.includes || []).map(item => typeof item === 'object' ? (item.title || item.description || '') : item),
    exclusions: (summaryPageData.excludes || []).map(item => typeof item === 'object' ? (item.title || item.description || '') : item),
    importantNotes: (summaryPageData.notes || []).map(item => typeof item === 'object' ? (item.content || item.title || item.description || '') : item),
    contactInfo,
    faqs: [], // Not found in this structure
    testimonials: [] // Not found in this structure
  };
};
