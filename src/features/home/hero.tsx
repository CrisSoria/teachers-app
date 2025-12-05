import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LogoText } from "@/components/logo";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-40">
      {/* Avatars + Stars */}
      <div className="flex items-center mt-24 md:mt-36">
        <div className="flex -space-x-3 pr-3">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
            alt="user3"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]"
          />
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="user1"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
          />
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            alt="user2"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]"
          />
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
            alt="user3"
            className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]"
          />
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="user5"
            className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]"
          />
        </div>

        <div>
          <div className="flex ">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star text-transparent fill-indigo-600"
                  aria-hidden="true"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              ))}
          </div>
          <p className="text-sm text-gray-700"> Usado por 1000+ profesores </p>
        </div>
      </div>

      {/* Headline */}
      <Heading
        size="xl"
        className="font-semibold max-w-lg text-center mt-4 leading-tight"
      >
        Menos papeleo, más{" "}
        <span className="relative bg-linear-to-r from-purple-700 to-[#764de1] bg-clip-text text-transparent">
          enseñanza
          <div className="z-10 absolute bottom-0 left-0 w-full scale-120">
            <Image
              src="/assets/line.svg"
              alt="gradient"
              width={274}
              height={10}
            />
          </div>
        </span>{" "}
        <span className="relative bg-linear-to-r from-[#764de1] to-indigo-600 bg-clip-text text-transparent">
          con
        </span>{" "}
      </Heading>
      <LogoText className="text-5xl md:text-7xl max-w-lg md:max-w-2xl text-center mt-4 leading-tight md:leading-tight" />

      <Heading size="xs" className="my-7 text-center">
        La herramienta que simplifica tu día como docente
      </Heading>
    </section>
  );
}
