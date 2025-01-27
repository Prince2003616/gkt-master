import Image from "next/image";

const ScrollingImages: React.FC = () => {
  const images = [
    { src: "/redhat.png", alt: "RedHat" },
    { src: "/mule.png", alt: "MuleSoft" },
    { src: "/tableau.png", alt: "Tableau" },
    { src: "/gcloud.png", alt: "Google Cloud" },
    { src: "/alibaba.png", alt: "Alibaba Cloud" },
    { src: "/ibm.png", alt: "IBM" },
    { src: "/microsoft.png", alt: "Microsoft" },
    { src: "/blockchain.png", alt: "Blockchain" },
  ];

  const repeatedImages = [...images, ...images, ...images];

  return (
    <div className="overflow-hidden bg-white-100 m-0 p-0 relative"> {/* Removed py-4 */}
      <div className="flex animate-scroll">
        {repeatedImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-32 h-32 mx-4">
            <Image
              src={image.src}
              alt={image.alt}
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingImages;
