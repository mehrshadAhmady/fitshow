"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PdfResultImage from "@/assets/images/PdfResultImage.png";
import TextResultImage from "@/assets/images/TextResultImage.png";
import Checkbox from "@/components/CheckBox";
import Image from "next/image";

const ResultPlan = () => {
  const router = useRouter();
  const [resultType, setResultType] = useState<"pdf" | "text">("pdf");

  return (
    <div className="absolute z-0 flex flex-col items-center w-full h-screen bg-[#D7D8D9]">
      <div className="absolute bottom-0 h-100 lg:h-[40rem] flex flex-col items-center rounded-tr-3xl rounded-tl-3xl w-full bg-primary">
        <div className="absolute z-10 -top-10 w-[80%] h-38 rounded-3xl bg-[#F3F3F4] opacity-48"></div>
        <div className="absolute z-20 -top-5 w-[90%] h-38 rounded-3xl bg-[#F3F3F4]"></div>
        <div className="h-screen z-30 flex flex-col items-center rounded-tr-3xl rounded-tl-3xl w-full bg-primary">
          <div className="mt-3 w-20 h-1.5 bg-[#D7D8D9] rounded-br-2xl rounded-bl-2xl"></div>
          <h3 className="mt-10 peyda-bold text-base text-center">
            برنامه تمرینی شما آماده است.
          </h3>
          <Checkbox
            label="دانلود pdf"
            checked={resultType === "pdf"}
            onChange={() => setResultType("pdf")}
            color="primary"
            boxSize="medium"
            className="mt-auto w-[90%] h-20"
            iconPrefix={
              <Image
                src={PdfResultImage}
                alt="pdf-result-image"
                className="-mr-2"
                width={60}
                height={60}
              />
            }
          />
          <Checkbox
            label="مشاهده متنی"
            checked={resultType === "text"}
            onChange={() => setResultType("text")}
            color="primary"
            boxSize="medium"
            className="mt-2 w-[90%] h-20 lg:mt-4"
            iconPrefix={
              <Image
                src={TextResultImage}
                alt="text-result-image"
                className={`-mr-2 ${
                  resultType === "text" && "brightness-0 contrast-100 invert"
                }`}
                width={60}
                height={60}
              />
            }
          />
          <Button
            iconPrefix={<HugeiconsIcon icon={ArrowRight02Icon} />}
            color="black"
            className="mt-2 mb-10 gap-3 h-14 w-[90%] rounded-[1.25rem] peyda-semibold lg:mt-4"
            onClick={() => {
              router.push("/");
            }}
          >
            ادامه
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPlan;
