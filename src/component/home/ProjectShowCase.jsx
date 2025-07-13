import React from "react";

const ProjectsShowcase = () => {
  const driveVideos = [
    "https://drive.google.com/file/d/1WFAzsHpJnExPo5cr5QaMIqCayOUirrA2/preview",
    "https://drive.google.com/file/d/1JUlJ3FzB_3xW1ycim3qY8enrwiPxruzp/preview",
    "https://drive.google.com/file/d/13ledn-nHz6anPHU1mwZ-l-5XddqsGcnm/preview",
    "https://drive.google.com/file/d/1q3SHRyqCh_EEahcwjP6vG5FaBTfQJJhT/preview",
  ];

  return (
    <main
      id="projects"
      className="flex flex-col gap-10 py-10 justify-center items-center text-center px-4"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-[#2F2F2F] font-medium tracking-tight">
          Projects We’ve Worked On
        </h1>
        <p className="text-gray-400 text-md sm:text-lg">
          A quick look at a few real-world prototypes <br /> we’ve helped bring
          to life.
        </p>
      </div>

      <div className="w-full overflow-x-auto relative">
        <div className="flex gap-6 px-4 sm:px-10 md:px-20 py-6 w-max">
          {driveVideos.map((url, index) => (
            <div
              key={index}
              className="min-w-[280px]  sm:min-w-[420px] md:min-w-[450px]  bg-white rounded-xl shadow-lg  overflow-hidden border border-gray-200 hover:scale-105 transition-transform duration-300"
            >
              <iframe
                src={url}
                width="100%"
                height="320"
                allow="autoplay"
                allowFullScreen
                className="w-full p-2"
                title={`drive-video-${index}`}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsShowcase;
