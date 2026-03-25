import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus, User, Mail, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/custom/popover";
import { storeLead, storePotentialLead } from "@/utils/firebase";
import { toast } from "sonner";
import { formatDateTime } from "@/utils/itinerary";
import { trackLeadFormConversion } from "@/utils/conversion";

export default function EnquiryFormFields({ 
  initialData = {}, 
  variant = "modal", // "modal", "inline", "section", "newsletter"
  formType = "lead", // "lead" or "potential"
  hideFields = [], 
  onSuccess,
  buttonText,
  isSubmitting: externalIsSubmitting = false,
  whiteLabels = false,
  brandYellow = false,
  buttonColor = "" // Custom button color class for themed sections
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    phone: "", // For potential leads
    departureDate: "",
    numTravellers: "1",
    destination: initialData.destination || "",
    departureCity: "",
    message: "",
    description: "", // For potential leads
    numDays: "1",
    ...initialData,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isFieldHidden = (fieldName) => hideFields.includes(fieldName);

  const validateField = (name, value) => {
    let numValue;

    switch (name) {
      case "name":
        return !value?.trim() ? "Full name is required" : "";
      case "email":
        if (isFieldHidden("email") && formType === "potential") return "";
        return !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "Valid email is required" : "";
      case "contactNumber":
      case "phone":
        return !/^[0-9]{10}$/.test(value)
          ? "Valid 10-digit phone number is required"
          : "";
      case "departureDate":
        if (isFieldHidden("departureDate")) return "";
        return !value ? "Departure date is required" : "";
      case "numTravellers":
        if (isFieldHidden("numTravellers")) return "";
        numValue = parseInt(value);
        return !value || numValue < 1 || numValue > 20
          ? "Number of travellers should be between 1 and 20"
          : "";
      case "numDays":
        if (isFieldHidden("numDays")) return "";
        numValue = parseInt(value);
        return !value || numValue < 1 || numValue > 25
          ? "Number of days should be between 1 and 25"
          : "";
      case "destination":
        if (isFieldHidden("destination")) return "";
        return !value?.trim() ? "Destination city is required" : "";
      case "departureCity":
        if (isFieldHidden("departureCity")) return "";
        return !value?.trim() ? "Departure city is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "contactNumber" || name === "phone") {
      finalValue = value.replace(/[^0-9]/g, "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, finalValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleIncrement = (field) => {
    const currentValue = parseInt(formData[field]) || 0;
    const maxValue = field === "numTravellers" ? 20 : 25;

    if (currentValue < maxValue) {
      const newValue = (currentValue + 1).toString();
      setFormData((prev) => ({
        ...prev,
        [field]: newValue,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, newValue),
      }));
    }
  };

  const handleDecrement = (field) => {
    const currentValue = parseInt(formData[field]) || 0;

    if (currentValue > 1) {
      const newValue = (currentValue - 1).toString();
      setFormData((prev) => ({
        ...prev,
        [field]: newValue,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, newValue),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const fieldsToValidate = formType === "lead" 
      ? ["name", "email", "contactNumber", "departureDate", "numTravellers", "destination", "departureCity", "numDays"]
      : ["name", "phone"];
    
    if (formType === "potential" && !isFieldHidden("email")) {
      fieldsToValidate.push("email");
    }

    fieldsToValidate.forEach((key) => {
      if (!isFieldHidden(key)) {
        newErrors[key] = validateField(key, formData[key] || "");
      }
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      if (formType === "lead") {
        response = await storeLead({
          ...formData,
          departureDate: formData.departureDate ? formatDateTime(formData.departureDate) : "Not Specified",
        });
        if (response) trackLeadFormConversion();
      } else {
        response = await storePotentialLead({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || `${formData.phone}@temp.com`,
          description: formData.description || formData.message || "Potential lead from website",
          destination: formData.destination,
        });
        if (response) trackLeadFormConversion();
      }

      if (response) {
        if (onSuccess) onSuccess();
        toast.success("Form submitted successfully!");
        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          contactNumber: "",
          phone: "",
          departureDate: "",
          message: "",
          description: "",
          destination: initialData.destination || "",
        }));
        setTouched({});
      }
    } catch (error) {
      toast.error("Form submission failed. Try after sometime");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isInspiration = variant === "inspiration" || variant === "section";
  const isNewsletter = variant === "newsletter" || variant === "inspiration";
  const isSection = variant === "section";
  const isInline = variant === "inline";

  const containerPadding = variant === "modal" ? "px-8 pb-6 pt-4" : "p-0";
  const labelClass = isSection 
    ? cn("block text-[10px] font-bold mb-1", whiteLabels ? "text-white/80" : "text-slate-600")
    : isInspiration 
      ? "hidden"
      : isInline 
        ? cn("block text-[11px] font-bold mb-1", whiteLabels ? "text-white" : "text-slate-800") 
        : cn("mb-2 block font-semibold text-sm", whiteLabels ? "text-white" : "text-slate-900");
  
  const inputClass = isNewsletter
    ? cn("w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 rounded-full pr-6 h-12 shadow-sm text-sm", isInspiration && !isSection ? "pl-12" : "px-6")
    : isSection
      ? "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all text-slate-700 text-sm"
      : isInline 
        ? "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm h-10"
        : "rounded-2xl border-[#B0B0B0] bg-white !p-4 h-12 text-sm shadow-none w-full";

  const getInputClass = (fieldName) => {
      const hasError = touched[fieldName] && errors[fieldName];
      return cn(inputClass, hasError && "border-red-500 focus:border-red-500 focus:ring-red-500/20");
  };

  const buttonClass = isInspiration
    ? cn("w-full rounded-full text-white h-12 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]", buttonColor || "gradient-btn")
    : isSection
      ? cn("w-full font-semibold text-base py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-2", brandYellow ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900" : whiteLabels ? "bg-white text-brand-blue" : "bg-brand-blue text-white hover:bg-brand-blue-hovered")
      : isInline 
        ? cn("w-full font-bold transition-all uppercase tracking-widest shadow-md py-3 rounded-lg text-xs mt-2", brandYellow ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900" : whiteLabels ? "bg-white text-brand-blue" : "bg-brand-blue text-white hover:bg-brand-blue-hovered")
        : cn("rounded-full px-10 py-5 text-base font-bold transition-all uppercase tracking-widest mt-4 shadow-lg", brandYellow ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900" : whiteLabels ? "bg-white text-brand-blue" : "bg-brand-blue text-white hover:bg-brand-blue-hovered");

  return (
    <form onSubmit={handleSubmit} className={cn("text-sm", containerPadding)}>
      <div className={cn("grid", (isInspiration || variant === "inline") ? "gap-3" : "gap-5")}>
        
        {/* Name and Email Row */}
        <div className={cn("grid", (isInspiration || variant === "inline" || variant === "modal") ? "grid-cols-1 gap-3" : "c-md:grid-cols-2 gap-5")}>
          {!isFieldHidden("name") && (
            <div className="relative">
              {isInspiration && !isSection && <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
              <span className={labelClass}>Full Name *</span>
              <Input
                className={getInputClass("name")}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isInspiration && !isSection ? "Your Name" : "Enter your name"}
                required
              />
              {touched.name && errors.name && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.name}
                </small>
              )}
            </div>
          )}
          {!isFieldHidden("email") && (
            <div className="relative">
              {isInspiration && !isSection && <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
              <span className={labelClass}>Email *</span>
              <Input
                className={inputClass}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isInspiration && !isSection ? "Email Address" : "Enter your email"}
                required={!isFieldHidden("email")}
              />
              {touched.email && errors.email && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.email}
                </small>
              )}
            </div>
          )}
        </div>

        {/* Contact and Date Row */}
        <div className={cn("grid gap-4", (isNewsletter || isSection || variant === "inline" || variant === "modal") ? "grid-cols-1" : "c-md:grid-cols-2")}>
          {!isFieldHidden("contactNumber") && formType === "lead" && (
            <div>
              <span className={labelClass}>Contact Number *</span>
                <Input
                  className={inputClass}
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your number"
                  required
                />
              {touched.contactNumber && errors.contactNumber && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.contactNumber}
                </small>
              )}
            </div>
          )}

          {!isFieldHidden("phone") && formType === "potential" && (
            <div className="relative">
              {isInspiration && !isSection && <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
              {!(isInspiration && !isSection) && <span className={labelClass}>Phone Number *</span>}
                <Input
                  className={getInputClass("phone")}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                  placeholder={isInspiration && !isSection ? "Phone Number" : "Enter your number"}
                  required
                />
              {touched.phone && errors.phone && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.phone}
                </small>
              )}
            </div>
          )}

          {!isFieldHidden("departureDate") && formType === "lead" && (
            <div>
              <span className={labelClass}>Departure Date *</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left border-solid border border-[#B0B0B0] font-normal w-full bg-white text-[#5C5C5C] text-base py-[22px]",
                      variant === "modal" ? "rounded-2xl" : "rounded-lg",
                      touched.departureDate && errors.departureDate && "border-red-500"
                    )}
                  >
                    {formData.departureDate ? (
                      format(new Date(formData.departureDate), "PPP")
                    ) : (
                      <span className="text-sm">Please select</span>
                    )}
                    <CalendarIcon
                      className="ml-auto !size-5 text-slate-400"
                      strokeWidth={1.5}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-2xl p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.departureDate
                        ? new Date(formData.departureDate)
                        : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        const adjustedDate = new Date(
                          date.getTime() - date.getTimezoneOffset() * 60000
                        );
                        const dateStr = adjustedDate.toISOString().split("T")[0];
                        setFormData((prev) => ({
                          ...prev,
                          departureDate: dateStr,
                        }));
                        setTouched((prev) => ({
                          ...prev,
                          departureDate: true,
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          departureDate: validateField("departureDate", dateStr),
                        }));
                      }
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {touched.departureDate && errors.departureDate && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.departureDate}
                </small>
              )}
            </div>
          )}
        </div>

        {/* Counts Row */}
        {!isFieldHidden("numTravellers") && formType === "lead" && (
          <div className={cn("grid gap-4", (isNewsletter || isSection || variant === "inline") ? "grid-cols-1" : "c-md:grid-cols-2")}>
            <div>
              <div className={labelClass}>Travel Count *</div>
              <div className="flex items-start">
                <Button
                  className={cn(
                    "bg-brand-blue hover:bg-brand-blue-hovered px-3",
                    variant === "modal" ? "h-[45.6px] c-md:rounded-l-2xl" : "h-[45.6px] rounded-l-lg",
                    "rounded-r-none"
                  )}
                  type="button"
                  onClick={() => handleDecrement("numTravellers")}
                >
                  <Minus className="!size-4" />
                </Button>
                <Input
                  className={cn(
                    "border-[#B0B0B0] bg-white p-2 text-center text-sm shadow-none h-[45.6px] rounded-none border-x-0"
                  )}
                  type="number"
                  name="numTravellers"
                  value={formData.numTravellers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="1"
                  max="20"
                />
                <Button
                  className={cn(
                    "bg-brand-blue hover:bg-brand-blue-hovered px-3",
                    variant === "modal" ? "h-[45.6px] c-md:rounded-r-2xl" : "h-[45.6px] rounded-r-lg",
                    "rounded-l-none"
                  )}
                  type="button"
                  onClick={() => handleIncrement("numTravellers")}
                >
                  <Plus className="!size-4" />
                </Button>
              </div>
            </div>
            {variant === "modal" && !isFieldHidden("numDays") && (
              <div>
                <div className={labelClass}>Number of Days</div>
                <div className="flex">
                  <Button
                    className="h-[45.6px] rounded-l-2xl rounded-r-none bg-brand-blue hover:bg-brand-blue-hovered px-3"
                    type="button"
                    onClick={() => handleDecrement("numDays")}
                  >
                    <Minus className="!size-4" />
                  </Button>
                  <Input
                    className="rounded-none border-[#B0B0B0] bg-white p-2 text-center text-sm shadow-none h-[45.6px] border-x-0"
                    type="number"
                    name="numDays"
                    value={formData.numDays}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    min="1"
                    max="25"
                  />
                  <Button
                    className="h-[45.6px] rounded-l-none rounded-r-2xl bg-brand-blue hover:bg-brand-blue-hovered px-3"
                    type="button"
                    onClick={() => handleIncrement("numDays")}
                  >
                    <Plus className="!size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Destination Row */}
        <div className={cn("grid gap-4", (isNewsletter || isSection || variant === "inline") ? "grid-cols-1" : "c-md:grid-cols-2")}>
          {!isFieldHidden("destination") && (
            <div>
              <span className={labelClass}>Place you&apos;re traveling to</span>
              <Input
                className={inputClass}
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Destination *"
                required
              />
              {touched.destination && errors.destination && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.destination}
                </small>
              )}
            </div>
          )}
          {!isFieldHidden("departureCity") && formType === "lead" && (
            <div>
              <span className={labelClass}>Departure City *</span>
              <Input
                className={inputClass}
                type="text"
                name="departureCity"
                value={formData.departureCity}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City you're leaving from"
                required
              />
              {touched.departureCity && errors.departureCity && (
                <small className="ml-4 mt-1 block text-red-600 text-xs">
                  {errors.departureCity}
                </small>
              )}
            </div>
          )}
        </div>

        {/* Message/Description Row */}
        {!isFieldHidden("message") && (
          <div>
            <span className={labelClass}>
              {isSection ? "Your Message (Optional)" : isInline ? "Comment" : "Message *"}
            </span>
            <Textarea
              className={cn(
                inputClass,
                "resize-none",
                isSection ? "h-32" : variant === "inline" ? "h-24" : "h-20"
              )}
              name={formType === "lead" ? "message" : "description"}
              value={formType === "lead" ? formData.message : formData.description}
              onChange={handleChange}
              placeholder={isSection ? "Tell us about your dream destination..." : isInline ? "Any specific requirements or comments?" : "Enter your message"}
              required={variant === "inline" && formType === "lead"}
            />
          </div>
        )}
      </div>

      {variant !== "inline" && variant !== "modal" && (
        <div className="space-y-2 mt-6">
          <div className="flex items-start gap-3 text-slate-500 text-xs leading-relaxed transition-all">
            <Check className={cn("w-4 h-4 mt-0.5 shrink-0", whiteLabels ? "text-yellow-400" : "text-brand-blue")} />
            <p>We assure the privacy of your contact data.</p>
          </div>
          <div className="flex items-start gap-3 text-slate-500 text-xs leading-relaxed transition-all">
            <Check className={cn("w-4 h-4 mt-0.5 shrink-0", whiteLabels ? "text-yellow-400" : "text-brand-blue")} />
            <p>This data will only be used by our team to contact you.</p>
          </div>
        </div>
      )}

      {isNewsletter && (
         <p className="text-[10px] text-slate-500 flex items-center gap-1.5 justify-center lg:justify-start mt-3">
         <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
         </svg>
         No spam, unsubscribe anytime.
       </p>
      )}

      <div className={cn("mt-4", (variant === "modal" && !isSection) ? "text-center" : "")}>
        <Button
          className={buttonClass}
          type="submit"
          disabled={isSubmitting || externalIsSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttonText || (isInspiration && !isSection ? "Request Call Back" : isSection ? "Get Started" : variant === "inline" ? "Send Enquiry" : "Submit")}
        </Button>
      </div>
    </form>
  );
}
