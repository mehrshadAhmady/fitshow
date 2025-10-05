import OtpCodeForm from "./_components/OtpCodeForm";

const OtpCode = () => {
  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-70 peyda-bold text-base text-center">
        کد ارسال شده به شماره تماس ۰۹۲۱۷۷۸۳۵۳۴ رو در این قسمت وارد کن.
      </h3>
      <OtpCodeForm />
    </div>
  );
};

export default OtpCode;
