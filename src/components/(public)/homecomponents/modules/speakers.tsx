"use client"
import Image from "next/image"
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useEffect, useRef, useState } from "react"
import { getSpeaker } from "@/service/speaker"

export default function Speakers() {
  const [speakers, setSpeakers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    async function fetchSpeakers() {
      setLoading(true)
      setError(null)
      try {
        const res = await getSpeaker()
        if (res.success && res.data) {
          setSpeakers(res.data)
        } else {
          setError(res.error || "Failed to fetch speakers.")
        }
      } catch (err) {
        setError("Failed to fetch speakers.")
      } finally {
        setLoading(false)
      }
    }
    fetchSpeakers()
  }, [])

  // Loading dots animation
const LoadingDots = () => (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="flex space-x-2 mt-10">
        <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></span>
      </div>
      <div className="mt-4 text-lg text-[#E67E22] font-semibold">Loading speakers...</div>
    </div>
  )

  // Error fallback
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF8E7] to-[#FFFAEE]">
        <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#E67E22] text-white px-6 py-2 rounded-full hover:bg-[#d35400] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-0 md:min-h-screen bg-gradient-to-b from-[#FFF8E7] to-[#FFFAEE] relative overflow-x-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32">
        <Image src="/schedule/diamond-pattern.png" alt="Pattern" fill />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32">
        <Image src="/schedule/diamond-pattern.png" alt="Pattern" fill />
      </div>

      <div className="container mx-auto py-8 md:py-16 px-2 md:px-4 pb-4 md:pb-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-7xl font-bold text-[#E67E22] font-serif">
            SPEAKERS
          </h1>
          <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our distinguished speakers who will share their knowledge and insights
          </p>
        </div>

        {/* Carousel or Loading */}
        <div className="relative">
          {loading ? (
            <LoadingDots />
          ) : (
            <>
              <div className="relative px-2 md:px-16"> {/* Reduced side padding on mobile */}
                {/* Navigation arrows */}
                <button
                  ref={navigationPrevRef}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-[#E67E22] hover:text-white transition-colors"
                  aria-label="Previous speaker"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>

                               <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  className="speaker-carousel w-full py-4"
                  breakpoints={{
                    640: {
                      coverflowEffect: {
                        stretch: 0,
                        depth: 200,
                        modifier: 2.5,
                      },
                    },
                    1024: {
                      coverflowEffect: {
                        stretch: 0,
                        depth: 300,
                        modifier: 3,
                      },
                    },
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                >
                  {speakers.map((speaker, index) => {
                    return (
                    <SwiperSlide
                      key={speaker._id || speaker.id}
                      className="!w-[280px] !h-[380px] md:!w-[320px] md:!h-[420px] lg:!w-[360px] lg:!h-[460px] mx-4"  // Added horizontal margin
                    >
                      <div className="relative group h-full w-full">
                        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg opacity-75 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur-md"></div>
                        <div className="relative bg-white p-1 rounded-lg h-full w-full transition-transform duration-300 group-hover:scale-[1.02]">
                          <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl relative">
                            <Image
                              src={speaker.image_url}
                              alt={speaker.name || "Speaker"}
                              fill
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              priority={true}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white p-4">
                              <p className="font-semibold text-lg">{speaker.name}</p>
                              <p className="text-sm opacity-90 line-clamp-2">{speaker.about}</p>
                              <div className="mt-2 flex items-center">
                                <span className="text-xs bg-[#E67E22] px-2 py-1 rounded-full">
                                  {speaker.category || "Speaker"}
                                </span>
                                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    )
                  })}
                </Swiper>

                <button
                  ref={navigationNextRef}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-[#E67E22] hover:text-white transition-colors"
                  aria-label="Next speaker"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* View All button */}
              <div className="mt-6 md:mt-12 flex justify-center">
                <button className="group relative flex items-center hover:scale-105 transition-transform duration-300 focus:outline-none">
                  <span className="bg-[#E67E22] text-white px-6 py-3 pr-12 rounded-full text-lg font-medium">
                    View All
                  </span>
                  <span className="absolute right-0 left-30 translate-x-1/2 bg-[#E67E22] w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:translate-x-6 group-hover:rotate-12">
                    <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}