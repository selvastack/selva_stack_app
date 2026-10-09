import { getTranslations } from "next-intl/server";

import { SocialIcon } from "./SocialIcon";
import { WaButton } from "./WaButton";

export async function FloatingWhatsApp() {
  const t = await getTranslations("whatsapp");
  return (
    <WaButton
      kind="floating"
      message={t("general")}
      ariaLabel={t("floatingLabel")}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition hover:scale-105 hover:shadow-[0_0_30px_rgba(3,152,51,0.7)]"
    >
      <SocialIcon id="whatsapp" className="h-7 w-7" />
    </WaButton>
  );
}
