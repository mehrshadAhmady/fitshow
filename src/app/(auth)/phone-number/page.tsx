import PhoneNumberForm from "./_components/PhoneNumberForm";

const PhoneNumber = () => {
  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen">
      <h3 className="mt-24 w-64 peyda-bold text-base text-center">برای دیدن گزارش وضعیت جسمانیت شماره تماست رو وارد کن.</h3>
      <PhoneNumberForm />
    </div>
  );
};

export default PhoneNumber;
