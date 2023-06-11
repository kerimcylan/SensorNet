import Navbar from "../components/Layout/navbar";
import Footer from "../components/Layout/footer";
import "./globals.css";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between">
        {children}
      </main>
      <Footer />
    </>
  );
}
