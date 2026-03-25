"use client";
import React from "react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/FaqAccordion";
import Link from "next/link";
import { PhoneIcon, HelpCircle, Building2, Mail, MessageCircle, Sparkles, CheckCircle, Clock, Headphones, ChevronDown, Search, Phone, ArrowUpRight } from "lucide-react";

const FaqPage = () => {
  const aboutBayardFaqs = [
    {
      question: "Who is Bayard Vacations?",
      answer:
        "Bayard Vacations is an India-registered travel company based in Bengaluru, specializing in customized domestic and international travel packages. We pride ourselves on tailoring unique, stress-free experiences for every traveler.",
    },
    {
      question: "What types of travel packages do you offer?",
      answer:
        "We offer personalized travel experiences including family vacations, romantic getaways, group adventures, solo trips, and cultural explorations across multiple destinations worldwide.",
    },
    {
      question: "How does the booking process work?",
      answer:
        "You can request a quote or customized itinerary via our website or contact us directly. Once the itinerary is finalized, a booking confirmation and payment details will be shared to secure your trip.",
    },
    {
      question: "Are all meals and sightseeing tours included in the packages?",
      answer:
        "Meal and tour inclusions vary by package. Detailed information about included meals and whether sightseeing is on a private (PVT) or shared (SIC) basis is clearly stated in the itinerary provided before booking.",
    },
    {
      question: "What is your cancellation policy?",
      answer: `<ul>
        <li>Cancellation after booking: 10% of total cost</li>
        <li>Cancellation 30+ days before arrival: 25% charge</li>
        <li>Cancellation 15–30 days before arrival: 50% charge</li>
        <li>Cancellation less than 15 days before arrival: 75% charge</li>
        <li>Cancellation 3 days or less before arrival, same day, or no-show: 100% charge</li>
      </ul>
      <p>Refunds (where applicable) are processed within 10–15 working days.</p>`,
    },
    {
      question: "How are airport transfers and local transport arranged?",
      answer:
        "Transfers and sightseeing are provided either on a private or shared basis depending on the package. Pickup is typically from the hotel lobby or airport as specified in your confirmed itinerary.",
    },
    {
      question: "Is Bayard Vacations compliant with Indian travel regulations?",
      answer:
        "Yes, we are fully registered and operate under Indian laws with our registered office in Bengaluru, Karnataka.",
    },
    {
      question: "How do you handle customer support?",
      answer:
        "We offer support through our contact number and email during business hours. We strive to respond promptly to ensure a seamless travel experience.",
    },
    {
      question: "Are your packages mobile-friendly for booking on the go?",
      answer:
        "Yes, our website and booking process are optimized for mobile devices, allowing easy access across platforms.",
    },
    {
      question:
        "How can I contact Bayard Vacations for queries or emergencies?",
      answer: `<p><strong>Phone:</strong> +91 63631 98911</p>
      <p><strong>Email:</strong> info@bayardvacations.com</p>
      <p><strong>Office:</strong> 144, 9th Main Rd, 4th Block, Kanteerava Nagar, Nandini Layout, Bengaluru, Karnataka 560096</p>`,
    },
  ];

  const generalFaqs = [
    {
      question: "What types of travel packages does Bayard Vacations offer?",
      answer:
        "We provide both international and domestic packages, including family, honeymoon, group, solo, and customized itineraries to suit various interests and budgets.",
    },
    {
      question: "How can I customize my itinerary with Bayard Vacations?",
      answer:
        "Our travel experts work with you one-on-one to tailor destinations, experiences, meal plans, and hotel categories according to your preferences.",
    },
    {
      question: "Are flights included in package prices?",
      answer:
        "Package inclusions vary—some packages cover airfare while others are land-only. All details are transparently listed before booking.",
    },
    {
      question: "What is the payment process and cancellation policy?",
      answer:
        "Secure your booking with an initial deposit; full payment is required before departure. Our cancellation and refund policies are detailed in your booking confirmation, ensuring transparency.",
    },
    {
      question: "Are GST and service charges included in package costs?",
      answer:
        "Yes, package costs are inclusive of standard GST and all service charges. In the final bill, to avoid hidden fees, the cost on the website is without GST and TCS.",
    },
    {
      question:
        "How do I reach Bayard Vacations customer service in case of issues during the trip?",
      answer:
        "We offer a 24/7 helpline and dedicated WhatsApp support for prompt assistance throughout your journey.",
    },
    {
      question: "Do your packages include travel insurance?",
      answer:
        "Select packages include complimentary travel insurance; otherwise, it is available as an add-on for safety and peace of mind.",
    },
    {
      question:
        "Can you accommodate special requirements like vegetarian meals or accessible rooms?",
      answer:
        "Absolutely—please mention your preferences while booking, and we will ensure your special needs are met.",
    },
    {
      question: "How do airport transfers and local transportation work?",
      answer:
        "Private airport and railway station transfers are included unless otherwise specified; sightseeing tours may be private or shared as detailed in your itinerary.",
    },
    {
      question: "What is Bayard Vacations' safety and hygiene policy?",
      answer:
        "We collaborate exclusively with trusted partners who follow strict hygiene protocols, and our team provides updated travel advisories for your destination.",
    },
    {
      question: "How can I get a GST invoice for business travel?",
      answer:
        "Just request it at the time of booking, and we'll issue a compliant GST invoice for your records.",
    },
    {
      question: "Does Bayard Vacations offer EMI or flexible payment options?",
      answer:
        "Yes, flexible payment plans and EMI options are available with select banking partners—ask our team for details at the time of booking.",
    },
    {
      question: "Are there discounts for group or early bookings?",
      answer:
        "Yes, we offer group discounts, seasonal deals, and special rates for early-bird reservations. Subscribe to our newsletter for updates.",
    },
    {
      question:
        "What destinations are particularly popular with Bayard Vacations travelers?",
      answer:
        "Top choices include Europe, Southeast Asia, UAE, Maldives, Bali, Thailand, and domestic gems like North-East India and Kerala.",
    },
    {
      question:
        "How do I validate the authenticity and reliability of Bayard Vacations?",
      answer:
        "Our company is GST and MSME registered, with hundreds of verified 5-star testimonials on Google and Justdial. We maintain transparent policies and a local Indian office for added peace of mind.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <HelpCircle className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-bold uppercase tracking-wider text-white">Support Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Frequently Asked<br />
              <span className="text-brand-blue">Questions</span>
            </h1>
            <p className="text-lg text-white/80">
              Find answers to common questions about our travel packages, booking process, and services
            </p>
          </div>
        </Container>
      </section>
      
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq", active: true },
        ]}
      />

      {/* Stats Section */}
      <section className="relative bg-white py-12 border-b border-slate-200">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: CheckCircle, label: '30+ Questions', desc: 'Comprehensive answers', color: 'blue' },
              { icon: Clock, label: 'Instant Answers', desc: 'Find what you need fast', color: 'green' },
              { icon: Headphones, label: '24/7 Support', desc: 'We\'re always here', color: 'purple' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:shadow-lg transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                  stat.color === 'blue' ? 'from-brand-blue to-blue-600' :
                  stat.color === 'green' ? 'from-brand-blue to-emerald-600' :
                  'from-purple-600 to-purple-700'
                } flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-lg font-bold text-slate-900 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500 text-center">{stat.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Sections */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <Container>
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
            
            {/* General FAQ Section */}
            <div id="general">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">General FAQ</h2>
                  <p className="text-slate-500 text-sm">Common travel questions</p>
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {generalFaqs.map((faq, index) => (
                  <AccordionItem
                    key={`general-${index}`}
                    value={`general-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-1 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-blue/30 data-[state=open]:border-brand-blue data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-slate-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="prose prose-sm max-w-none text-slate-600 pb-2"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* About Bayard Section */}
            <div id="about">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">About Bayard</h2>
                  <p className="text-slate-500 text-sm">Company & policies</p>
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {aboutBayardFaqs.map((faq, index) => (
                  <AccordionItem
                    key={`about-${index}`}
                    value={`about-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-1 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-500/30 data-[state=open]:border-purple-500 data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-slate-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="prose prose-sm max-w-none text-slate-600 pb-2"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="bg-slate-950 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-bold text-white">We're Here To Help</span>
            </div>
            <h3 className="section-title-dark mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-white/70 mb-8">
              Our travel experts are here to help you plan the perfect vacation.
              Get in touch for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:+916363198911"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand-blue hover:bg-brand-blue-hovered text-white font-bold transition-all hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5" />
                +91 63631 98911
              </Link>
              <Link
                href="mailto:info@bayardvacations.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default FaqPage;
