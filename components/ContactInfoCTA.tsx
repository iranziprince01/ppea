import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function ContactInfoCTA() {
  const address = 'Kigali, Rwanda'
  const phonePrimary = '+250791676618'
  const phoneAlt = '+250788561313'
  const email = 'probitypartnersea1@gmail.com'

  return (
    <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-primary-50 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* CTA Card */}
          <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"></div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Let’s discuss your case
            </h2>
            <p className="mt-4 text-primary-100 text-lg max-w-xl">
              Speak directly with our attorneys. We’ll evaluate your matter and guide you on the best next steps.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white text-primary-900 font-semibold shadow-lg hover:shadow-white/30 transition-all hover:-translate-y-0.5"
              >
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={`tel:${phonePrimary.replace(/\s|\+/g, '')}`}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-primary-600/40 border border-white/20 text-white font-semibold hover:bg-primary-600/50 transition-all"
              >
                Call Now
              </a>
            </div>

            {/* Quick contacts inline for mobile */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-100/90">
              <a href={`tel:${phonePrimary.replace(/\s|\+/g, '')}`} className="hover:text-white underline-offset-4 hover:underline">
                {phonePrimary}
              </a>
              <span className="opacity-60">/</span>
              <a href={`tel:${phoneAlt.replace(/\s|\+/g, '')}`} className="hover:text-white underline-offset-4 hover:underline">
                {phoneAlt}
              </a>
              <span className="hidden sm:inline opacity-60">•</span>
              <a href={`mailto:${email}`} className="hidden sm:inline hover:text-white underline-offset-4 hover:underline">
                {email}
              </a>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">{address}</p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <div className="text-gray-600">
                  <a href={`tel:${phonePrimary.replace(/\s|\+/g, '')}`} className="block hover:text-primary-700 underline-offset-4 hover:underline">{phonePrimary}</a>
                  <a href={`tel:${phoneAlt.replace(/\s|\+/g, '')}`} className="block mt-1 hover:text-primary-700 underline-offset-4 hover:underline">{phoneAlt}</a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">
                  <a href={`mailto:${email}`} className="hover:text-primary-700 underline-offset-4 hover:underline">{email}</a>
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Working Hours</h3>
                <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


