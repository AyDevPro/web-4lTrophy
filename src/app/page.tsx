"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Countdown from "@/components/Countdown";

export default function Page() {
  return (
    <>
      <Navigation />

      <main>
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="absolute bottom-0 w-full h-auto animate-wave" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z" fill="#f88b29" />
            </svg>
          </div>

          <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto py-20">
            <div className="inline-block bg-[#f88b29]/20 border-2 border-[#f88b29] px-6 py-2 rounded-full font-bold text-base mb-8 animate-pulse-badge">
              4L TROPHY 2026
            </div>

            <h1 className="font-archivo font-black text-7xl md:text-8xl lg:text-[7rem] uppercase tracking-[-2px] leading-none mb-4">
              LA JERRICANE
            </h1>

            <div className="font-archivo font-black text-5xl md:text-6xl lg:text-[4rem] text-[#f88b29] mb-8">
              #311
            </div>

            <p className="text-xl md:text-[1.3rem] mb-12 opacity-90">
              Antonin & Loric • 6000 km • 12 jours
            </p>

            <Countdown />

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/itineraire"
                className="bg-[#f88b29] text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(248,139,41,0.3)] hover:shadow-[0_15px_40px_rgba(248,139,41,0.5)] hover:-translate-y-1 transition-all"
              >
                Suivre le raid
              </Link>
              <Link
                href="/sponsors"
                className="bg-transparent text-white px-10 py-4 rounded-full font-bold border-2 border-white hover:bg-white hover:text-[#0b1e2d] transition-all"
              >
                Nous soutenir
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f2d2a2]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-archivo font-black text-4xl md:text-5xl text-[#0b1e2d] mb-4">
                Le défi en chiffres
              </h2>
              <p className="text-lg text-gray-700">
                Une aventure hors du commun
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🏜️', number: '6000', label: 'Kilomètres', sublabel: 'De Biarritz à Marrakech' },
                { icon: '📅', number: '12', label: 'Jours d\'aventure', sublabel: '18 fév → 1 mars 2026' },
                { icon: '🧭', number: '6', label: 'Étapes désert', sublabel: 'Navigation au roadbook' },
                { icon: '❤️', number: '10', label: 'kg collectés', sublabel: 'Pour la Croix-Rouge' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] p-8 text-center shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#f88b29] before:to-[#fa9835]"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="font-archivo font-black text-5xl text-[#f88b29] leading-none mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-base text-[#0b1e2d] mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-[#0b1e2d] to-[#1a3a52] text-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-archivo font-black text-3xl md:text-4xl mb-6 text-white">
                  Une aventure solidaire
                </h2>
                <p className="text-base leading-relaxed opacity-90 mb-6">
                  Le 4L Trophy, c'est bien plus qu'un raid. C'est une aventure humaine où plus de 2000 participants apportent fournitures scolaires et matériel sportif aux enfants du désert marocain.
                </p>
                <div className="bg-[#f88b29]/20 border-l-4 border-[#f88b29] p-6 rounded-xl mt-8">
                  <strong className="text-[#f88b29] text-xl block mb-2">Notre engagement :</strong>
                  <p className="opacity-90 text-base">
                    10 kg de denrées alimentaires pour la Croix-Rouge + matériel scolaire pour les enfants du Grand Sud.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-archivo font-black text-3xl md:text-4xl mb-6 text-white">
                  Le parcours
                </h2>
                <div className="space-y-3 text-base opacity-90 leading-relaxed">
                  <p><strong>18-19 fév :</strong> Village-Départ à Biarritz</p>
                  <p><strong>20-22 fév :</strong> Direction Algeciras, traversée du détroit</p>
                  <p><strong>23-27 fév :</strong> 6 étapes dans le Grand Sud marocain</p>
                  <p><strong>27 fév :</strong> Arrivée à Marrakech</p>
                  <p><strong>1 mars :</strong> Retour vers l'Europe</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-archivo font-black text-4xl md:text-5xl text-[#0b1e2d] mb-4">
                Suivez l'aventure
              </h2>
              <p className="text-lg text-gray-600">
                Nos dernières actualités sur Instagram
              </p>

              <div
                className="elfsight-app-4c9c8fc8-77c3-47ee-b54e-74aa63de9c0c mt-8"
                data-elfsight-app-lazy
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
