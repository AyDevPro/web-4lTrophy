'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29] pt-32 pb-24 text-white text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/10" />
          <div className="container mx-auto px-6 relative">
            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-white/30">
              PRENONS CONTACT
            </div>
            <h1 className="font-archivo font-black text-5xl md:text-7xl mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Une question, une suggestion, envie de nous soutenir ? Écrivez-nous !
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Form */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="font-archivo font-black text-3xl text-[#0b1e2d] mb-6">
                  Envoyez-nous un message
                </h2>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-bold text-[#0b1e2d] mb-2 text-sm tracking-wide">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border-2 border-[#0b1e2d]/10 rounded-2xl bg-[#f88b29]/5 focus:outline-none focus:border-[#f88b29] focus:ring-4 focus:ring-[#f88b29]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-bold text-[#0b1e2d] mb-2 text-sm tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border-2 border-[#0b1e2d]/10 rounded-2xl bg-[#f88b29]/5 focus:outline-none focus:border-[#f88b29] focus:ring-4 focus:ring-[#f88b29]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-bold text-[#0b1e2d] mb-2 text-sm tracking-wide">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border-2 border-[#0b1e2d]/10 rounded-2xl bg-[#f88b29]/5 focus:outline-none focus:border-[#f88b29] focus:ring-4 focus:ring-[#f88b29]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-bold text-[#0b1e2d] mb-2 text-sm tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-[#0b1e2d]/10 rounded-2xl bg-[#f88b29]/5 focus:outline-none focus:border-[#f88b29] focus:ring-4 focus:ring-[#f88b29]/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#f88b29] to-[#e67a20] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-[#f88b29]/30 hover:shadow-xl hover:shadow-[#f88b29]/40 hover:-translate-y-1 transition-all"
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>

              {/* Info Cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">📧</span>
                    <h3 className="font-archivo font-black text-2xl text-[#0b1e2d]">
                      Informations de contact
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: '✉️', label: 'Email', value: <a href="mailto:lajerricane07@gmail.com" className="text-[#f88b29] font-semibold hover:opacity-70 transition-opacity">lajerricane07@gmail.com</a> },
                      { icon: '🏆', label: 'Équipage', value: 'La Jerricane #311' },
                      { icon: '👥', label: 'Pilotes', value: 'Antonin & Loric' },
                      { icon: '📅', label: 'Événement', value: '4L Trophy 2026\n18 février - 1er mars' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 py-3 border-b border-[#0b1e2d]/5 last:border-0">
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1">
                          <div className="font-bold text-[#0b1e2d] mb-1">{item.label}</div>
                          <div className="text-gray-600 text-sm whitespace-pre-line">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#f88b29] to-[#e67a20] rounded-3xl p-8 text-white text-center shadow-xl">
                  <h3 className="font-archivo font-black text-2xl mb-6">
                    Suivez notre aventure
                  </h3>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-[#0b1e2d] px-6 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-lg transition-all"
                    >
                      <span>📱</span>
                      <span>Instagram</span>
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-[#0b1e2d] px-6 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-lg transition-all"
                    >
                      <span>👍</span>
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
