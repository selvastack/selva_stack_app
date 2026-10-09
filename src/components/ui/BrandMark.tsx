import Image from "next/image";

type Props = { tagline: string; priority?: boolean };

/** Horizontal lock-up: leaf icon + stencil wordmark (light version for dark backgrounds). */
export function BrandMark({ tagline, priority }: Props) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/brand/selva-stack-leaf-white.webp"
        alt=""
        width={30}
        height={41}
        priority={priority}
        className="h-10 w-auto animate-glow"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-wide text-hueso">SELVA STACK</span>
        <span className="mt-1 hidden text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-hoja sm:block">{tagline}</span>
      </span>
    </span>
  );
}
