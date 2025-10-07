import SubscriptionCarousel from "./_components/SubscriptionCarousel";

const Subscription = () => {
  return (
    <div className="absolute z-0 flex flex-col items-center w-full">
      <h3 className="mt-24 w-80 peyda-bold text-[#F94B16] text-4xl text-center">
        00:05:40
      </h3>
      <div className="flex justify-center items-center mt-10 w-full h-90 overflow-hidden">
        <SubscriptionCarousel />
      </div>
    </div>
  );
};

export default Subscription;
