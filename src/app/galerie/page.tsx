'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function GaleriePage() {
  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29] pt-32 pb-24 text-white text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/10" />
          <div className="container mx-auto px-6 relative">
            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-white/30">
              SOUVENIRS
            </div>
            <h1 className="font-archivo font-black text-5xl md:text-7xl mb-4">
              Galerie Photos
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Revivez les meilleurs moments de notre aventure en images
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            {/* Préparation */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-block bg-gradient-to-r from-[#f88b29]/10 to-[#0b1e2d]/5 text-[#f88b29] px-6 py-2 rounded-full font-bold text-sm mb-4 tracking-wide">
                  CHAPITRE 1
                </div>
                <h2 className="font-archivo font-black text-3xl md:text-5xl text-[#0b1e2d]">
                  Préparation
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-gradient-to-br from-[#f88b29] via-[#e67a20] to-[#d4691e] rounded-3xl flex items-center justify-center text-7xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                    <span className="relative z-10">📸</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sur la Route */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-block bg-gradient-to-r from-[#f88b29]/10 to-[#0b1e2d]/5 text-[#f88b29] px-6 py-2 rounded-full font-bold text-sm mb-4 tracking-wide">
                  CHAPITRE 2
                </div>
                <h2 className="font-archivo font-black text-3xl md:text-5xl text-[#0b1e2d]">
                  Sur la Route
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-gradient-to-br from-[#f88b29] via-[#e67a20] to-[#d4691e] rounded-3xl flex items-center justify-center text-7xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                    <span className="relative z-10">🏜️</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-gradient-to-r from-[#f88b29]/5 via-[#0b1e2d]/5 to-[#f88b29]/5 rounded-3xl p-16 text-center">
              <div className="text-7xl mb-6 animate-pulse">📷</div>
              <h3 className="font-archivo font-black text-3xl md:text-4xl text-[#0b1e2d] mb-4">
                Plus de photos à venir !
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Suivez-nous sur les réseaux sociaux pour ne rien manquer de notre aventure. Nouvelles photos ajoutées régulièrement pendant le raid !
              </p>

              <div className="flex gap-4 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-[#0b1e2d] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <span>📱</span>
                  <span>Instagram</span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-[#0b1e2d] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <span>👍</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
