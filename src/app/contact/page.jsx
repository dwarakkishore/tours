import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import ContactForm from "@/components/Forms/LoginForm/ContactForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin, Twitter, Clock, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact Bayard Vacations | Start Your Travel Adventure Today",
  description:
    "Have questions or need assistance planning your trip? Contact Bayard Vacations! Our travel experts are here to help you design the perfect getaway. Reach out today!",
  keywords:
    "Bayard Vacations contact, travel planning assistance, vacation support, customized travel queries, contact travel experts, plan your trip",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Standalone Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Contact Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Deep Black Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
        
        <Container className="relative h-full flex flex-col items-center justify-center text-center z-10 pt-20">
          <p className="font-great-vibes text-2xl md:text-3xl text-white/90 mb-4 tracking-wider animate-fadeInUp">
            Let's Start Your Journey
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight uppercase animate-fadeInUp delay-100 italic">
            Contact <span className="inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-md">Us</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl mx-auto font-medium uppercase tracking-[0.2em] animate-fadeInUp delay-200">
            Elevating travel into art. Tell us your vision.
          </p>
        </Container>

        {/* Breadcrumb Bar at Banner Bottom - Matching Activities Page style */}
        <div className="absolute bottom-6 left-0 w-full z-20">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Contact Us", href: "/contact", active: true },
              ]}
              className="bg-transparent border-none p-0"
              omitContainer
              colorClasses="text-white/80 drop-shadow-sm font-medium"
              activeColorClasses="text-white drop-shadow-md font-bold"
            />
          </Container>
        </div>
      </section>

      {/* Dark Themed Main Content */}
      <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0046b8]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <Container className="relative z-10 pt-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start max-w-7xl mx-auto">
            {/* Minimalist Contact Info - Left Column */}
            <div className="lg:col-span-4 space-y-12 animate-fadeInLeft">
              {[
                { 
                  title: "Address", 
                  content: "144, 9th Main Rd, 4th Block, Kanteerava Nagar, Nandini Layout, Bengaluru, KA 560096", 
                  icon: <MapPin className="w-5 h-5 text-slate-900" />,
                },
                { 
                  title: "Phone", 
                  content: "063631 17421", 
                  icon: <Phone className="w-5 h-5 text-slate-900" />,
                },
                { 
                  title: "Email", 
                  content: "info@bayardvacations.com", 
                  icon: <Mail className="w-5 h-5 text-slate-900" />,
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-white/5 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[#0046b8] text-lg font-bold uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-white text-sm font-medium leading-relaxed max-w-[250px]">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* High-Contrast Form Card - Right Column */}
            <div className="lg:col-span-8 animate-fadeInRight">
              <div className="bg-white p-8 md:p-14 rounded-sm shadow-2xl relative">
                <ContactForm />
              </div>

              {/* Map Section - Integrated at the bottom of the column */}
              <div className="mt-8 animate-fadeInUp delay-300">
                <div className="relative h-[300px] overflow-hidden rounded-sm shadow-xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0374837334227!2d77.52887181482946!3d13.016276090831987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d992c8d6cfd%3A0x5b343906dc2ad0af!2sBayard%20Vacations!5e0!3m2!1sen!2sin!4v1676992146250!5m2!1sen!2sin"
                    className="size-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bayard Vacations Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default ContactPage;
