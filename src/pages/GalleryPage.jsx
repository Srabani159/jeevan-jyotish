import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Chakra, Stars } from "../components/astrology/AstroEffects.jsx";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import videoOne from "../assets/video1.mp4";
import videoTwo from "../assets/video2.mp4";

const photos = Object.entries(
  import.meta.glob(  "../assets/gallery/*.{jpeg,jpg}", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)
  .sort(([firstPath], [secondPath]) => {
    const getNumber = (path) => {
      const match = path.match(/gallery\((\d+)\)/);
      return match ? Number(match[1]) : 0;
    };
    return getNumber(firstPath) - getNumber(secondPath);
  })
  .map(([, src], index) => ({
    src,
    alt: `Jeevan Jyotish gallery photo ${index + 1}`,
  }));

const tabs = [
  { id: "photos", label: "Photos", icon: "▧" },
  { id: "videos", label: "Videos", icon: "▷" },
  { id: "news", label: "News & Links", icon: "✧" },
];

const videos = [
  { title: "Gallery video 1", src: videoOne },
  { title: "Gallery video 2", src: videoTwo },
];

const featuredVideoUrl = "https://youtu.be/VEFN02_Vqe8?si=QjmPO-Rn_8MWRUzi";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos");
  const [activePhoto, setActivePhoto] = useState(null);
  const tabRefs = useRef({});
  const lastPhotoTrigger = useRef(null);

  useEffect(() => {
    if (activePhoto === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") {
        setActivePhoto((index) => (index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActivePhoto((index) => (index - 1 + photos.length) % photos.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto]);

  const closeLightbox = () => {
    setActivePhoto(null);
    window.requestAnimationFrame(() => lastPhotoTrigger.current?.focus());
  };

  const movePhoto = (direction) => {
    setActivePhoto((index) => (index + direction + photos.length) % photos.length);
  };

  const handleTabKeyDown = (event) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  const photoLayout = (index) => {
    if (index % 9 === 0) return "gallery-photo-card--feature";
    if (index % 5 === 1) return "gallery-photo-card--tall";
    if (index % 7 === 3) return "gallery-photo-card--wide";
    return "";
  };

  return (
    <SiteLayout className="service-page gallery-page">
      <main>
        <section className="service-page-hero gallery-page-hero">
          <Stars count={130} />
          <div className="service-page-chakra" aria-hidden="true">
            <Chakra />
          </div>
          <div className="service-page-hero-content">
            <span className="section-kicker">A glimpse into our world</span>
            <h1>Our Gallery</h1>
            <p>
              Moments, memories and media from Jeevan Jyotish. Explore the photos,
              watch our videos, and check back for news and featured links.
            </p>
            <a className="btn gallery-hero-link" href="#gallery-content">Explore the gallery</a>
            <div className="gallery-hero-counts" aria-label="Gallery contents">
              <span><strong>{photos.length}</strong> Photos</span>
              <span><strong>3</strong> Videos</span>
              <span className="gallery-hero-upcoming"><strong>Coming soon</strong> News links</span>
            </div>
          </div>
        </section>

        <section className="gallery-showcase" id="gallery-content" aria-labelledby="gallery-heading">
          <Stars count={55} />
          <div className="gallery-showcase-inner">
            <header className="gallery-heading">
              <span className="section-kicker">The Jeevan Jyotish collection</span>
              <h2 id="gallery-heading">Explore the <span>moments</span></h2>
              <p>Choose a collection to browse photos, videos or updates.</p>
            </header>

            <div
              className="gallery-tabs"
              role="tablist"
              aria-label="Gallery collections"
              onKeyDown={handleTabKeyDown}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(element) => { tabRefs.current[tab.id] = element; }}
                  id={`gallery-tab-${tab.id}`}
                  className={`gallery-tab${activeTab === tab.id ? " active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`gallery-panel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="gallery-tab-icon" aria-hidden="true">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "photos" && (
              <div
                className="gallery-tab-panel"
                id="gallery-panel-photos"
                role="tabpanel"
                aria-labelledby="gallery-tab-photos"
                tabIndex={0}
              >
                <div className="gallery-photo-grid">
                  {photos.map((photo, index) => (
                    <button
                      className={`gallery-photo-card ${photoLayout(index)}`}
                      key={photo.src}
                      type="button"
                      aria-label={`Open photo ${index + 1}`}
                      onClick={(event) => {
                        lastPhotoTrigger.current = event.currentTarget;
                        setActivePhoto(index);
                      }}
                    >
                      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                      <span className="gallery-photo-caption">
                        <span>Jeevan Jyotish</span>
                        <span aria-hidden="true">↗</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div
                className="gallery-tab-panel"
                id="gallery-panel-videos"
                role="tabpanel"
                aria-labelledby="gallery-tab-videos"
                tabIndex={0}
              >
                <div className="gallery-video-grid">
                  {videos.map((video, index) => (
                    <article className="gallery-video-card" key={video.src}>
                      <video controls preload="metadata" playsInline>
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support HTML video.
                      </video>
                      <div className="gallery-video-caption">
                        <span className="gallery-video-number">0{index + 1}</span>
                        <h3>{video.title}</h3>
                        <span>Jeevan Jyotish</span>
                      </div>
                    </article>
                  ))}
                  <article className="gallery-video-card gallery-featured-video">
                    <a href={featuredVideoUrl} target="_blank" rel="noreferrer">
                      <img src={photos[0]?.src} alt="" loading="lazy" decoding="async" />
                      <span className="gallery-featured-play" aria-hidden="true">▶</span>
                      <span className="gallery-featured-label">Watch on YouTube</span>
                    </a>
                    <div className="gallery-video-caption">
                      <span className="gallery-video-number">03</span>
                      <h3>Featured video</h3>
                      <span>Opens on YouTube</span>
                    </div>
                  </article>
                </div>
              </div>
            )}

            {activeTab === "news" && (
              <div
                className="gallery-tab-panel"
                id="gallery-panel-news"
                role="tabpanel"
                aria-labelledby="gallery-tab-news"
                tabIndex={0}
              >
                <div className="gallery-news-empty">
                  <span className="gallery-news-emblem" aria-hidden="true">✧</span>
                  <span className="section-kicker">News &amp; links</span>
                  <h3>Coming soon</h3>
                  <p>News stories and useful links will be shared here.</p>
                  <Link className="gallery-news-contact" to="/appointment">Get in touch <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {activePhoto !== null && photos[activePhoto] && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery photo ${activePhoto + 1} of ${photos.length}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button className="gallery-lightbox-close" type="button" aria-label="Close photo" onClick={closeLightbox}>×</button>
          <button className="gallery-lightbox-arrow previous" type="button" aria-label="Previous photo" onClick={() => movePhoto(-1)}>‹</button>
          <figure className="gallery-lightbox-figure">
            <img src={photos[activePhoto].src} alt={photos[activePhoto].alt} />
            <figcaption>{activePhoto + 1} / {photos.length} <span>·</span> Jeevan Jyotish</figcaption>
          </figure>
          <button className="gallery-lightbox-arrow next" type="button" aria-label="Next photo" onClick={() => movePhoto(1)}>›</button>
        </div>
      )}
    </SiteLayout>
  );
}
