import Image from "next/image";
import NutritionGuideImage from "@/assets/images/NutritionGuideImage.png";

const NutritionGuide = () => {
  return (
    <div className="absolute z-0">
      <Image
        src={NutritionGuideImage}
        alt="nutrition-guide-image"
        className="z-10 w-screen h-screen"
      />
      <div className="absolute top-0 z-10 flex flex-col justify-center items-center w-screen h-screen bg-[linear-gradient(180deg,rgba(17,18,20,0)_0%,#111214_100%)] text-center text-secondary">
        <h1 className="mt-8 mb-2 w-86 peyda-bold text-4xl">
          راهنمای تغذیه و رژیم غذایی
        </h1>
        <p className="mt-2 peyda-regular text-base">نوشته آزمایشی میباشد.</p>
      </div>
    </div>
  );
};

export default NutritionGuide;
