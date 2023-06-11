import Image from "next/image";
import "@/pages/globals.css";

export default function Navbar() {
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
            <li className="text-2xl">Home</li>
            <li className="text-2xl">Boxes</li>
            <li className="text-2xl">Sensors</li>
            <li className="text-2xl">Api Docs</li>
            <li className="text-2xl">About Us</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
