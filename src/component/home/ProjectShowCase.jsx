import React, { useRef } from "react";

const videos = [
  {
    title: "Limpiar Complete Project",
    url: "https://youtu.be/C2CbOxRFtjQ?si=FcpE_VsTFhVIM78M",
  },

  {
    title: "Limpiar Money Management",
    url: "https://www.youtube.com/embed/6H8P3u2s1bw",
  },
  {
    title: "Limpiar CLeaner Module",
    url: "https://www.youtube.com/embed/zOirJz1GsrU",
  },
];

const ProjectsShowcase = () => {
  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const iframe = videoRefs.current[index];
    if (iframe) {
      const src = iframe.getAttribute("data-src");
      iframe.src = `${src}?autoplay=1&mute=1&controls=0`;
    }
  };

  const handleMouseLeave = (index) => {
    const iframe = videoRefs.current[index];
    if (iframe) {
      iframe.src = ""; // Reset iframe
      iframe.src = iframe.getAttribute("data-src"); // Restore original
    }
  };

  return (
    <main className="flex flex-col gap-10 py-20 justify-center items-center text-center px-4">
      {/* Section Heading */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-[#2F2F2F] font-inter font-medium tracking-tight">
          Projects We’ve Worked On
        </h1>
        <p className="text-gray-400 text-md sm:text-lg">
          A quick look at a few real-world prototypes <br /> we’ve helped bring
          to life.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <iframe
              ref={(el) => (videoRefs.current[index] = el)}
              data-src={video.url}
              src={video.url}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={video.title}
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 transition-all duration-300 ease-in-out"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-2 px-4 text-left text-sm font-medium">
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProjectsShowcase;
