import Image from "next/image";

type Props = { alt: string };

/** Floating phone mock-up showing the real EcoAlerta app, with a pulsing glow. */
export function PhoneHeatmap({ alt }: Props) {
  return (
    <div className="relative mx-auto w-[230px] animate-float sm:w-[260px]">
      <span
        aria-hidden="true"
        className="absolute inset-6 -z-10 rounded-[3rem] bg-[#039833]/40 blur-2xl animate-pulse motion-reduce:animate-none"
      />
      <div className="rounded-[2.4rem] border-2 border-[#2a3f3f] bg-[#0d1b1f] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
        <Image
          src="/brand/ecoalerta-app.webp"
          alt={alt}
          width={588}
          height={1191}
          loading="lazy"
          sizes="260px"
          className="h-auto w-full rounded-[1.9rem]"
        />
      </div>
    </div>
  );
}
