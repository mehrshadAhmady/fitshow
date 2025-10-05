import { Dumbbell02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="peyda-bold">سلام</h1>
      <HugeiconsIcon icon={Dumbbell02Icon} width={50} height={50} />
      <Link href={"/start-test"}>Start Test</Link>
    </div>
  );
}
