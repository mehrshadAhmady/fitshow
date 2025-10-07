import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-secondary w-screen h-screen text-secondary">
      <h1 className="peyda-bold text-2xl">Welcome to FitShow</h1>
      <Link className="peyda-semibold text-[#F94B16] text-sm" href={"/start-test"}>Start Test</Link>
    </div>
  );
}
