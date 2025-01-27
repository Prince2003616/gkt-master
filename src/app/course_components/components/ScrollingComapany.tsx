import Image from "next/image";

const ScrollingCompany: React.FC = () => {
  const images = [
    { src: "/cog.png", alt: "Cognizant" },
    { src: "/cap.png", alt: "Capgemini" },
    { src: "/tcs.png", alt: "TCS" },
    { src: "/aws.png", alt: "AWS" },
    { src: "/hcl.png", alt: "HCL" },
    { src: "/iibm.png", alt: "IBM" },
    { src: "/microsoft.png", alt: "Microsoft" },
    { src: "/oracle.png", alt: "Oracle" },
  ];

  const repeatedImages = [...images, ...images, ...images];

  return (
    <div className="overflow-hidden bg-white-100 m-0 p-0">
      {/* Heading */}
      <h2 className="text-left text-2xl font-bold mb-4 px-6">Top Hiring Companies</h2>

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

export default ScrollingCompany;
