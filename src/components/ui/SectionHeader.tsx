import { Reveal } from "./Reveal";

type Props = { eyebrow?: string; title: string; text?: string; center?: boolean; id?: string };

export function SectionHeader({ eyebrow, title, text, center, id }: Props) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-4 font-display text-3xl leading-tight text-hueso sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>}
    </Reveal>
  );
}
