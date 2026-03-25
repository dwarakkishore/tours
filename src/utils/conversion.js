/**
 * Triggers conversion events for lead form submissions
 * This function should be called after a successful form submission
 * Tracks conversions in both Google Ads and Taboola
 */
export const trackLeadFormConversion = () => {
  // Google Ads conversion tracking
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", "conversion", {
        send_to: "AW-17183307275/cEZnCOW0mMcbEKTrtOI_",
        value: 1.0,
        currency: "INR",
      });
    } catch (error) {
      console.error("Google Ads conversion tracking failed:", error);
    }
  }

  // Taboola conversion tracking
  if (typeof window !== "undefined" && window.trackTaboolaConversion) {
    try {
      window.trackTaboolaConversion();
    } catch (error) {
      console.error("Taboola conversion tracking failed:", error);
    }
  }
};

/**
 * Specifically tracks lead form conversions with ID: AW-17117820324/exafCNXBj_YbEKTrtOI_
 * This is triggered inside the "Thank You" popup.
 */
export const trackSubmitLeadForm = () => {
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", "conversion", {
        send_to: "AW-17117820324/exafCNXBj_YbEKTrtOI_",
        value: 0.0,
        currency: "INR",
      });
    } catch (error) {
      console.error("Lead form conversion tracking failed:", error);
    }
  }
};
