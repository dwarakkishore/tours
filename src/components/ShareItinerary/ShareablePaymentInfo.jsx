import React, { useState } from 'react';
import { CreditCard, XCircle, FileText, Shield, Check } from 'lucide-react';

const ShareablePaymentInfo = ({ paymentTerms, cancellationPolicy, bookingTerms }) => {
  const [activeTab, setActiveTab] = useState('payment');

  // Don't render if no content
  if (!paymentTerms && !cancellationPolicy && !bookingTerms) return null;

  const tabs = [
    { id: 'payment', label: 'Payment Terms', icon: CreditCard, content: paymentTerms },
    { id: 'cancellation', label: 'Cancellation Policy', icon: XCircle, content: cancellationPolicy },
    { id: 'booking', label: 'Booking Terms', icon: FileText, content: bookingTerms },
  ].filter(tab => tab.content); // Only show tabs with content

  return (
    <section className="py-6 md:py-10 bg-slate-50/50 print:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4 md:mb-6 print:mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-purple-600 mb-4 print:w-12 print:h-12">
            <Shield className="w-8 h-8 text-white print:w-6 print:h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 print:text-2xl">
            Terms & Policies
          </h2>
          <p className="text-slate-600 text-lg print:text-sm">
            Important information about your booking
          </p>
        </div>

        {/* Tabs - Hidden in print */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 print:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content - Screen View */}
        <div className="print:hidden">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`transition-all duration-300 ${
                activeTab === tab.id ? 'block' : 'hidden'
              }`}
            >
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-slate-200">
                <div className="prose prose-slate max-w-none">
                  <div
                    className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: tab.content.replace(/\n/g, '<br/>') }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Print View - Show all sections */}
        <div className="hidden print:block space-y-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <div key={tab.id} className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-brand-blue" />
                  <h3 className="text-lg font-bold text-slate-900">{tab.label}</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div
                    className="text-slate-700 text-xs leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: tab.content.replace(/\n/g, '<br/>') }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-green-900">Secure Payment</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-blue-900">100% Protected</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-purple-900">Clear Terms</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
            <CreditCard className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-orange-900">Flexible Options</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareablePaymentInfo;
