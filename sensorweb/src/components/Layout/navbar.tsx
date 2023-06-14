import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  const router = useRouter();
  const { pathname, query, asPath } = router;
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
            <li className="text-2xl">
              <Link href="/">{t("Home")}</Link>
            </li>
            <li className="text-2xl">
              <Link href="/boxes">{t("Boxes")}</Link>
            </li>
            <li className="text-2xl">{t("Sensors")}</li>
            <li className="text-2xl">{t("Api Docs")}</li>
            <li className="text-2xl">{t("About Us")}</li>
            <li className="flex flex-row gap-6">
              <div>
                <Link href={{ pathname, query }} as={asPath} locale="tr">
                  <Image
                    src="/images/tr.svg"
                    width={30}
                    height={30}
                    alt="Turkish"
                  />
                </Link>
              </div>
              <div>
                <Link href="/" as={asPath} locale="en-us">
                  <Image
                    src="/images/en.svg"
                    width={30}
                    height={30}
                    alt="English"
                  />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
