import Image from "next/image";
import "@/pages/globals.css";
import { useTranslation } from "next-i18next";

export default function Navbar() {
          const { t } = useTranslation();
  return (
    <header className="flex flex-col items-center justify-between">
      <div className="container flex flex-row justify-between items-center">
        <Image
          src="/images/logo-wh-229-100.png"
          width={229}
          height={100}
          alt="Logo"
        />
        <div>
          <ul className="flex flex-row gap-10">
            <li className="text-2xl">{t("Home")}</li>
            <li className="text-2xl">{t("Boxes")}</li>
            <li className="text-2xl">{t("Sensors")}</li>
            <li className="text-2xl">{t("Api Docs")}</li>
            <li className="text-2xl">{t("About Us")}</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
