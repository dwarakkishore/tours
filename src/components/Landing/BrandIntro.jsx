import { Globe, Heart, Shield, Award, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Container from "@/components/ui/Container";

const BrandIntro = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-300 to-blue-200 rounded-full blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div className="section-badge-light mb-6">
              About Bayard Vacations
            </div>
            <h2 className="section-title-light mb-6">
              Discover the <span className="text-brand-blue">World</span>, One <span className="text-brand-blue">Unforgettable Journey</span> at a Time
              {/* Crafting Unforgettable Travel Experiences Since{' '}
              <span className="text-brand-blue">2010</span> */}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
              Bayard Vacations, where premium domestic and international travel meets effortless planning. We pride ourselves on delivering curated tour packages that cater to every traveler’s unique style and budget. Join thousands of happy explorers and start your journey with India’s premier tour operator today.
            </p>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              From exotic beaches to historic landmarks, spiritual retreats to adventure getaways — we handle every detail of your journey. Experience seamless bookings, expert guidance, and 24/7 support with a team that's been trusted by thousands since 2010.
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm border border-slate-200">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue shrink-0" />
                <span className="font-semibold text-slate-700 text-xs sm:text-sm">100% Secure</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm border border-slate-200">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue shrink-0" />
                <span className="font-semibold text-slate-700 text-xs sm:text-sm">Industry Leader</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div
                className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 mt-8"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div
                className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 -mt-8"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div
                className="h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/2583852/pexels-photo-2583852.jpeg?auto=compress&cs=tinysrgb&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Global Reach</h3>
              <p className="text-slate-600 leading-relaxed">
                Access to over 100+ destinations worldwide with carefully curated experiences that showcase the best each location has to offer.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Personalized Service</h3>
              <p className="text-slate-600 leading-relaxed">
                Every trip is uniquely crafted to match your preferences, ensuring a truly personal and memorable vacation experience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert Team</h3>
              <p className="text-slate-600 leading-relaxed">
                Our team of travel specialists brings decades of combined experience to help you plan the perfect getaway.
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 lg:p-16 text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h3>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            To inspire and enable people to discover the world through exceptional travel experiences that connect cultures, create lasting memories, and broaden horizons. We're committed to sustainable tourism practices while delivering unparalleled service and value to every traveler.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400 mb-2">15+</div>
              <div className="text-slate-300 text-lg">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400 mb-2">50+</div>
              <div className="text-slate-300 text-lg">Travel Experts</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400 mb-2">98%</div>
              <div className="text-slate-300 text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div> */}
    </Container>
    </section>
  );
};

export default BrandIntro;
