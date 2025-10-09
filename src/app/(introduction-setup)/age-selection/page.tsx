import AgeForm from "./_components/AgeForm";

const IdealWeight = () => {
  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 mb-10 w-80 peyda-bold text-base text-center">
        تاریخ تولدت رو وارد کن.
      </h3>
      <AgeForm />
    </div>
  );
};

export default IdealWeight;
