'use client'

import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function EquipePage() {
  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29] pt-32 pb-24 text-white text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/10" />
          <div className="container mx-auto px-6 relative">
            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-white/30">
              ÉQUIPAGE #311
            </div>
            <h1 className="font-archivo font-black text-5xl md:text-7xl mb-4">
              L'Équipe La Jerricane
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Antonin & Loric — Deux amis prêts à relever le défi du 4L Trophy 2026
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-archivo font-black text-4xl md:text-5xl text-[#0b1e2d] mb-4">
                Nos pilotes
              </h2>
              <p className="text-xl text-gray-600">
                Deux passionnés, une aventure
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Antonin */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-[#f88b29]">
                <div className="relative aspect-square bg-gradient-to-br from-[#f88b29] to-[#e67a20]">
                  <Image
                    src="/antonin.png"
                    alt="Antonin"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 text-center">
                  <div className="inline-block bg-[#f88b29]/10 text-[#f88b29] px-4 py-2 rounded-full font-bold text-sm mb-4 tracking-wide">
                    #311 PILOTE
                  </div>
                  <h3 className="font-archivo font-black text-4xl text-[#0b1e2d] mb-2">
                    Antonin
                  </h3>
                  <div className="text-[#f88b29] font-bold text-lg mb-4 uppercase tracking-wide">
                    Pilote & Navigateur
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Passionné de rallye et d'orientation, il guide l'équipe La Jerricane à travers les pistes du Maroc avec roadbook et boussole.
                  </p>
                </div>
              </div>

              {/* Loric */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-[#f88b29]">
                <div className="relative aspect-square bg-gradient-to-br from-[#f88b29] to-[#e67a20]">
                  <Image
                    src="/loric.png"
                    alt="Loric"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 text-center">
                  <div className="inline-block bg-[#f88b29]/10 text-[#f88b29] px-4 py-2 rounded-full font-bold text-sm mb-4 tracking-wide">
                    #311 CO-PILOTE
                  </div>
                  <h3 className="font-archivo font-black text-4xl text-[#0b1e2d] mb-2">
                    Loric
                  </h3>
                  <div className="text-[#f88b29] font-bold text-lg mb-4 uppercase tracking-wide">
                    Co-Pilote & Mécanique
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Veille sur la 4L et assure la maintenance. Prêt à affronter les 6000 km et les 6 étapes dans le Grand Sud !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Aventure */}
        <section className="py-24 bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#0b1e2d] text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-archivo font-black text-4xl md:text-5xl text-center mb-6">
                Notre Aventure
              </h2>
              <p className="text-lg leading-relaxed opacity-90 mb-6">
                Antonin et Loric, l'équipage La Jerricane #311, se lancent dans le 4L Trophy 2026 du 18 février au 1er mars. Une aventure humaine, solidaire et mécanique à travers 6000 km.
              </p>
              <p className="text-lg leading-relaxed opacity-90 mb-12">
                Départ de Biarritz, traversée du détroit de Gibraltar, 6 étapes dans le Grand Sud marocain avec navigation au roadbook, et arrivée à Marrakech. Nous apportons aussi 10 kg de denrées alimentaires à la Croix-Rouge !
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: '🏁', title: 'Départ Biarritz', subtitle: '18 février 2026' },
                  { icon: '🏜️', title: '6 étapes', subtitle: 'Grand Sud' },
                  { icon: '🎯', title: 'Arrivée Marrakech', subtitle: '1er mars 2026' },
                  { icon: '❤️', title: '10 kg pour la', subtitle: 'Croix-Rouge' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#f88b29]/20 border-2 border-[#f88b29]/30 rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="font-bold text-white text-sm leading-tight">
                      {item.title}
                      <br />
                      {item.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
