import Link from "next/link";

export default function Header() {
  return (
          <nav className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">
                <Link href="/">IDAN tv</Link>
              </h1>
            </div>
          </nav>
  );
}