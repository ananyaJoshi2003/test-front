import React, { useEffect, useRef, useState } from "react";
import ContactSection from "../../Home/Contact/Contact";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import {
getPortfolioById,
getPortfolioByListNameLogo,
// createContact,
} from "../../services/portfolioService";
import ImageCarousel from "../../Components/common/ImageCarousel";

// import Contact from "../Contact/Contact";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ReactPlayer from "react-player";
import "./Details.css";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


const Details = () => {
  const { projectId } = useParams();

  const [portfolios, setPortfolios] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [carouselVideosMuted, setCarouselVideosMuted] = useState([]);
  const [fullscreenVideo, setFullscreenVideo] = useState(null); // Track fullscreen video
  const [fullscreenVideoType, setFullscreenVideoType] = useState(null); // 'hero' or 'carousel'
  
  const swiperRef = useRef(null);
  const videoRef = useRef(null);
  const carouselVideoRefs = useRef([]);

  const [portfolioList, setPortfolioList] = useState([]);

  useEffect(() => {
    if (!isDataFetched) {
      fetchPortfolios();
      fetchPortfolioList();
    }
  }, [isDataFetched]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setFullscreenVideo(null);
        setFullscreenVideoType(null);
      }
    };

    if (fullscreenVideo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenVideo]);

  const fetchPortfolios = async () => {
    try {
      const portfoliosData = await getPortfolioById(projectId);

      const urls = [];
      for (let i = 1; i <= 18; i++) {
        const key = `workUrl_${i}`;
        if (portfoliosData.data[key]) {
          urls.push(portfoliosData.data[key]);
        }
      }
      setVideoUrls(urls);
      // Initialize muted state for carousel videos
      setCarouselVideosMuted(new Array(urls.length).fill(true));

      setPortfolios(portfoliosData.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const fetchPortfolioList = async () => {
    try {
      const data = await getPortfolioByListNameLogo();
      setPortfolioList(data.data);
      setIsDataFetched(true);
      console.log(data.data, "getPortfolioByListNameLogo");
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  function showImage(imageUrl) {
    let url = imageUrl;
    try {
      const imageArray = JSON.parse(imageUrl);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        url = imageArray;
      }
    } catch (e) {
      // imageUrl is not a stringified array, use it as is
    }
    return url;
  }

  // Function to handle hero video click
  const handleVideoClick = () => {
    setIsMuted(!isMuted);
    setFullscreenVideo(portfolios.videoUrl);
    setFullscreenVideoType('hero');
  };

  // Function to handle carousel video click
  const handleCarouselVideoClick = (index, url) => {
    const newMutedStates = [...carouselVideosMuted];
    newMutedStates[index] = !newMutedStates[index];
    setCarouselVideosMuted(newMutedStates);
    setFullscreenVideo(url);
    setFullscreenVideoType('carousel');
  };

  // Function to close fullscreen
  const closeFullscreen = () => {
    setFullscreenVideo(null);
    setFullscreenVideoType(null);
  };

  // Fullscreen Modal Component
  const FullscreenVideoModal = () => {
    if (!fullscreenVideo) return null;

    const isCarouselVideo = fullscreenVideoType === 'carousel';
    const isHeroVideo = fullscreenVideoType === 'hero';

    return (
      <div className="fullscreen-modal" onClick={closeFullscreen}>
        {/* Close button */}
        <button onClick={closeFullscreen} className="fullscreen-close-btn">
          ×
        </button>

        {/* Video container */}
        <div className="fullscreen-video-container" onClick={(e) => e.stopPropagation()}>
          {isHeroVideo ? (
            <video
              src={fullscreenVideo}
              autoPlay
              muted={false} // Enable sound in fullscreen
              loop
              controls={true} // Show controls in fullscreen
              playsInline
              className="fullscreen-video"
            />
          ) : (
            <ReactPlayer
              url={fullscreenVideo}
              playing={true}
              muted={false} // Enable sound in fullscreen
              controls={true} // Show controls in fullscreen
              loop
              width="100%"
              height="100%"
              className="fullscreen-react-player"
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    showinfo: 0,
                    rel: 0,
                    controls: 1, // Show controls in fullscreen
                  },
                },
              }}
            />
          )}
        </div>

        {/* Instructions */}
        <div className="fullscreen-instructions">
          Click outside video or press ESC to close • Audio is enabled
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Master Image */}
      {
        (portfolios.videoUrl) && <div className="master">
          <div className="hero-container" id="home">
            <video
              ref={videoRef}
              src={portfolios.videoUrl} 
              className="hero-video"
              autoPlay
              muted={true} // Keep muted for autoplay compliance
              loop
              playsInline
              onClick={handleVideoClick}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Sound indicator */}
            <div className="hero-sound-indicator">
              🔇 Tap for fullscreen with sound
            </div>
          </div>
        </div>
      }

      <div className="details-container">
        {/* Head */}
        <div className="details-heading">
          <h1>{portfolios.title}</h1>
          <p>{portfolios.desc}</p>
        </div>

        {/* Good Images */}
        <div className="goodimg">
          {
            typeof showImage(portfolios.imageUrl) !== 'string' ? (
              <ImageCarousel images={showImage(portfolios.imageUrl)} />
            ) : (
              portfolios.imageUrl.length > 2 && <img src={showImage(portfolios.imageUrl)} alt="" srcSet="" />
            )
          }
        </div>

        {/* Swiper */}
        {
          videoUrls.length > 0 &&
          <section className="portfolio-section container">
            {/* Navigation buttons */}
            <button
              className="swiper-nav-btn prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <SlArrowLeft className="swiper-nav-icon" />
            </button>
            <button
              className="swiper-nav-btn next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <SlArrowRight className="swiper-nav-icon" />
            </button>
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, FreeMode]}
              className="mySwiper"
            >
              {videoUrls.map((url, index) => (
                <SwiperSlide key={index} className="testimonial-slide">
                  <div className="testimonial-card">
                    <ReactPlayer
                      ref={(el) => carouselVideoRefs.current[index] = el}
                      className="testimonial-photo"
                      url={url}
                      playing={true}
                      muted={true} // Keep muted for autoplay
                      controls={false}
                      loop
                      width="100%"
                      height="100%"
                      playsinline={true}
                      onClick={() => handleCarouselVideoClick(index, url)}
                      config={{
                        youtube: {
                          playerVars: {
                            modestbranding: 1,
                            showinfo: 0,
                            rel: 0,
                            controls: 0,
                          },
                        },
                      }}
                    />

                    {/* Sound indicator for carousel videos */}
                    <div className="carousel-sound-indicator">
                      🔇 Tap for fullscreen
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        }

        <ContactSection />
      </div>

      {/* Fullscreen Video Modal */}
      <FullscreenVideoModal />
    </>
  );
};

export default Details;
