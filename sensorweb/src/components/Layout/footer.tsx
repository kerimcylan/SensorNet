import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function Footer() {
      const { t } = useTranslation();
  return (
    <footer className="flex flex-col items-center justify-between py-6">
      <div className="container flex flex-row justify-between items-start">
        <div>
          <Image
            src="/images/khas-logo.png"
            width={265}
            height={93}
            alt="Kadir Has Logo"
          />
        </div>
        <div>
          <h2 className="text-xl underline underline-offset-8 mb-5">
            {t("Project Members")}
          </h2>
          <ul>
            <li>Murad Mollaoğlu</li>
            <li>Kerim Ceylan</li>
            <li>Serap Taş</li>
            <li>Arda Kayacan</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-1">
            <li className="font-bold">{t("Home")}</li>
            <li className="font-bold">{t("Boxes")}</li>
            <li className="font-bold">{t("Sensors")}</li>
            <li className="font-bold">{t("About Us")}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
