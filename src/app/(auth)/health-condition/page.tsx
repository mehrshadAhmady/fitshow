"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Checkbox from "@/components/CheckBox";

const PlaceSelection = () => {
  const router = useRouter();
  const [place, setPlace] = useState<"home" | "gym">("home");
  const [healthCondition, setHealthCondition] = useState<"healthy" | string[]>(
    "healthy"
  );

  const changeCondition = (condition: string) => {
    setHealthCondition((prev) => {
      if (condition === "healthy") {
        return "healthy";
      }
      // If previous state was "healthy", replace it with a new array
      if (prev === "healthy" || !Array.isArray(prev)) {
        return [condition];
      }

      // toggle behavior for array (add/remove)
      if (prev.includes(condition)) {
        const newArray = prev.filter((c) => c !== condition);
        return newArray.length > 0 ? newArray : "healthy"; // fallback to "healthy" if all removed
      } else {
        return [...prev, condition];
      }
    });
    console.log(healthCondition);
  };

  return (
    <div className="absolute z-0 flex flex-col items-center w-full min-h-screen">
      <h3 className="mt-24 peyda-bold text-base text-center">
        آیا محدودیت جسمی خاصی دارید؟
      </h3>
      <Checkbox
        label="آسیب و بیماری خاصی ندارم"
        checked={healthCondition === "healthy"}
        onChange={() => changeCondition("healthy")}
        color="primary"
        boxSize="small"
        textSize="small"
        className="mt-10 w-[90%] h-10 rounded-2xl"
        block
      />
      <h4 className="mt-6 mb-2 ml-auto mr-[5%] peyda-semibold text-sm">
        بیماری های داخلی و گوارشی
      </h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-[90%] mx-auto">
        <Checkbox
          label="آسم"
          checked={healthCondition?.includes("آسم")}
          onChange={() => changeCondition("آسم")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="اخیرا جراحی داشتم"
          checked={healthCondition?.includes("اخیرا جراحی داشتم")}
          onChange={() => changeCondition("اخیرا جراحی داشتم")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="میگرن"
          checked={healthCondition?.includes("میگرن")}
          onChange={() => changeCondition("میگرن")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="فشار خون"
          checked={healthCondition?.includes("فشار خون")}
          onChange={() => changeCondition("فشار خون")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="سنگ کلیه"
          checked={healthCondition?.includes("سنگ کلیه")}
          onChange={() => changeCondition("سنگ کلیه")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="یبوست"
          checked={healthCondition?.includes("یبوست")}
          onChange={() => changeCondition("یبوست")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="چربی خون"
          checked={healthCondition?.includes("چربی خون")}
          onChange={() => changeCondition("چربی خون")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="نقرس"
          checked={healthCondition?.includes("نقرس")}
          onChange={() => changeCondition("نقرس")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="صرع"
          checked={healthCondition?.includes("صرع")}
          onChange={() => changeCondition("صرع")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-[1.25rem] col-span-2"
        />
      </div>
      <h4 className="mt-6 mb-2 ml-auto mr-[5%] peyda-semibold text-sm">
        بیماری های هورمونی و غدد
      </h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-[90%] mx-auto">
        <Checkbox
          label="کم کاری تیروئید"
          checked={healthCondition?.includes("کم کاری تیروئید")}
          onChange={() => changeCondition("کم کاری تیروئید")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دیابت نوع 2"
          checked={healthCondition?.includes("دیابت نوع 2")}
          onChange={() => changeCondition("دیابت نوع 2")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="پرکاری تیروئید"
          checked={healthCondition?.includes("پرکاری تیروئید")}
          onChange={() => changeCondition("پرکاری تیروئید")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-[1.25rem] col-span-2"
        />
      </div>
      <h4 className="mt-6 mb-2 ml-auto mr-[5%] peyda-semibold text-sm">
        بیماری های اسکلتی
      </h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-[90%] mx-auto">
        <Checkbox
          label="آرتروز گردن"
          checked={healthCondition?.includes("آرتروز گردن")}
          onChange={() => changeCondition("آرتروز گردن")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="میوپاتی"
          checked={healthCondition?.includes("میوپاتی")}
          onChange={() => changeCondition("میوپاتی")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="آرتروز زانو"
          checked={healthCondition?.includes("آرتروز زانو")}
          onChange={() => changeCondition("آرتروز زانو")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="کمر درد"
          checked={healthCondition?.includes("کمر درد")}
          onChange={() => changeCondition("کمر درد")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دیسک گردن"
          checked={healthCondition?.includes("دیسک گردن")}
          onChange={() => changeCondition("دیسک گردن")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دررفتگی مچ پا"
          checked={healthCondition?.includes("دررفتگی مچ پا")}
          onChange={() => changeCondition("دررفتگی مچ پا")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دررفتگی مچ دست"
          checked={healthCondition?.includes("دررفتگی مچ دست")}
          onChange={() => changeCondition("دررفتگی مچ دست")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دررفتگی شانه"
          checked={healthCondition?.includes("دررفتگی شانه")}
          onChange={() => changeCondition("دررفتگی شانه")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="زانو درد"
          checked={healthCondition?.includes("زانو درد")}
          onChange={() => changeCondition("زانو درد")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="تنگی کانال نخاعی"
          checked={healthCondition?.includes("تنگی کانال نخاعی")}
          onChange={() => changeCondition("تنگی کانال نخاعی")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دیسک کمر"
          checked={healthCondition?.includes("دیسک کمر")}
          onChange={() => changeCondition("دیسک کمر")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="ام اس"
          checked={healthCondition?.includes("ام اس")}
          onChange={() => changeCondition("ام اس")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="آرتریت روماتوئید"
          checked={healthCondition?.includes("آرتریت روماتوئید")}
          onChange={() => changeCondition("آرتریت روماتوئید")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-[1.25rem] col-span-2"
        />
      </div>
      <h4 className="mt-6 mb-2 ml-auto mr-[5%] peyda-semibold text-sm">
        ناهنجاری های اسکلتی
      </h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-[90%] mx-auto">
        <Checkbox
          label="کف پای صاف"
          checked={healthCondition?.includes("کف پای صاف")}
          onChange={() => changeCondition("کف پای صاف")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="خار پاشنه"
          checked={healthCondition?.includes("خار پاشنه")}
          onChange={() => changeCondition("خار پاشنه")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="کوتاهی یک پا"
          checked={healthCondition?.includes("کوتاهی یک پا")}
          onChange={() => changeCondition("کوتاهی یک پا")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="گلف البو"
          checked={healthCondition?.includes("گلف البو")}
          onChange={() => changeCondition("گلف البو")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="تنیس البو"
          checked={healthCondition?.includes("تنیس البو")}
          onChange={() => changeCondition("تنیس البو")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="گردن رو به جلو"
          checked={healthCondition?.includes("گردن رو به جلو")}
          onChange={() => changeCondition("گردن رو به جلو")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="گودی کمر"
          checked={healthCondition?.includes("گودی کمر")}
          onChange={() => changeCondition("گودی کمر")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="پشت گرد"
          checked={healthCondition?.includes("پشت گرد")}
          onChange={() => changeCondition("پشت گرد")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="زانو ضربدری"
          checked={healthCondition?.includes("زانو ضربدری")}
          onChange={() => changeCondition("زانو ضربدری")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="زانو پرانتزی"
          checked={healthCondition?.includes("زانو پرانتزی")}
          onChange={() => changeCondition("زانو پرانتزی")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
      </div>
      <h4 className="mt-6 mb-2 ml-auto mr-[5%] peyda-semibold text-sm">
        آسیب بافت های نرم و رباط
      </h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-[90%] mx-auto">
        <Checkbox
          label="پارگی کشیدگی mcl"
          checked={healthCondition?.includes("پارگی کشیدگی mcl")}
          onChange={() => changeCondition("پارگی کشیدگی mcl")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="پارگی کشیدگی مینیسک"
          checked={healthCondition?.includes("پارگی کشیدگی مینیسک")}
          onChange={() => changeCondition("پارگی کشیدگی مینیسک")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="پارگی کشیدگی acl"
          checked={healthCondition?.includes("پارگی کشیدگی acl")}
          onChange={() => changeCondition("پارگی کشیدگی acl")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="کیست مچ دست"
          checked={healthCondition?.includes("کیست مچ دست")}
          onChange={() => changeCondition("کیست مچ دست")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="تاندونیت شانه"
          checked={healthCondition?.includes("تاندونیت شانه")}
          onChange={() => changeCondition("تاندونیت شانه")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-[1.25rem] col-span-2"
        />
      </div>
      <h4 className="mt-6 mb-2 ml-auto mr-[5%] peyda-semibold text-sm">
        بیماری های خاص
      </h4>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 mb-30 w-[90%] mx-auto">
        <Checkbox
          label="سکته مغزی"
          checked={healthCondition?.includes("سکته مغزی")}
          onChange={() => changeCondition("سکته مغزی")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="سکته قلبی"
          checked={healthCondition?.includes("سکته قلبی")}
          onChange={() => changeCondition("سکته قلبی")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="نقص عضو"
          checked={healthCondition?.includes("نقص عضو")}
          onChange={() => changeCondition("نقص عضو")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="گرفتن عروق قلب"
          checked={healthCondition?.includes("گرفتن عروق قلب")}
          onChange={() => changeCondition("گرفتن عروق قلب")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-2xl"
        />
        <Checkbox
          label="دیابت نوع 1"
          checked={healthCondition?.includes("دیابت نوع 1")}
          onChange={() => changeCondition("دیابت نوع 1")}
          color="primary"
          boxSize="small"
          textSize="small"
          className="h-10 rounded-[1.25rem] col-span-2"
        />
      </div>
      <Button
        iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
        color="black"
        className="fixed bottom-0 z-30 mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold"
        onClick={() => {
          router.push("/focus-part");
        }}
      >
        ادامه
      </Button>
    </div>
  );
};

export default PlaceSelection;
