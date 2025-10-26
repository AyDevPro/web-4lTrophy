'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SponsorsPage() {
  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29] pt-32 pb-24 text-white text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/10" />
          <div className="container mx-auto px-6 relative">
            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-white/30">
              PARTENAIRES
            </div>
            <h1 className="font-archivo font-black text-5xl md:text-7xl mb-4">
              Nos Sponsors
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Merci à tous nos partenaires qui rendent cette aventure possible
            </p>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            {/* Logo Ticker */}
            <div className="bg-white rounded-3xl p-12 shadow-xl overflow-hidden mb-16">
              <div className="flex gap-12 overflow-hidden">
                <div className="flex gap-12 animate-scroll">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-48 h-32 flex items-center justify-center bg-gradient-to-br from-[#f88b29]/5 to-[#0b1e2d]/5 border-2 border-[#0b1e2d]/10 rounded-2xl font-bold text-[#0b1e2d] hover:border-[#f88b29] hover:scale-105 transition-all"
                    >
                      Logo {(i % 5) + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Partnership Packs */}
            <div className="text-center mb-12">
              <h2 className="font-archivo font-black text-4xl md:text-5xl text-[#0b1e2d] mb-4">
                Devenir Partenaire
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Vous souhaitez soutenir notre projet et gagner en visibilité ? Devenez sponsor de La Jerricane #311 !
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Bronze */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-[6px] border-[#cd7f32]">
                <div className="text-6xl mb-4">🥉</div>
                <h3 className="font-archivo font-black text-3xl text-[#0b1e2d] mb-6">
                  Pack Bronze
                </h3>
                <ul className="space-y-4">
                  {[
                    'Logo sur le site web',
                    'Mention dans nos remerciements',
                    'Visibilité auprès de notre communauté',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-[#f88b29] font-bold text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Silver */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-[6px] border-[#c0c0c0]">
                <div className="text-6xl mb-4">🥈</div>
                <h3 className="font-archivo font-black text-3xl text-[#0b1e2d] mb-6">
                  Pack Argent
                </h3>
                <ul className="space-y-4">
                  {[
                    'Logo sur le site web',
                    'Posts dédiés sur réseaux sociaux',
                    'Mentions régulières pendant le raid',
                    'Photos exclusives avec votre logo',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-[#f88b29] font-bold text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gold */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-[6px] border-[#ffd700]">
                <div className="text-6xl mb-4">🥇</div>
                <h3 className="font-archivo font-black text-3xl text-[#0b1e2d] mb-6">
                  Pack Or
                </h3>
                <ul className="space-y-4">
                  {[
                    'Logo sur la 4L (visibilité maximale)',
                    'Logo sur le site web',
                    'Campagne dédiée sur réseaux sociaux',
                    'Mentions quotidiennes pendant le raid',
                    'Vidéos et photos exclusives',
                    'Goodies personnalisés',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-[#f88b29] font-bold text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#f88b29] to-[#e67a20] rounded-3xl p-16 text-white text-center shadow-2xl">
              <h3 className="font-archivo font-black text-4xl md:text-5xl mb-6">
                Prêt à nous rejoindre ?
              </h3>
              <p className="text-xl mb-8 opacity-95">
                Contactez-nous pour discuter d'un partenariat sur mesure
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-[#0b1e2d] px-12 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </>
  )
}
