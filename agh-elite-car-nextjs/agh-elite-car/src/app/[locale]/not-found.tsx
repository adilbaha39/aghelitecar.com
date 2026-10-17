import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="pt-[84px] min-h-[50vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md py-16">
        <p className="text-[#b8893a] text-sm tracking-widest mb-2">404</p>
        <h1 className="font-serif text-3xl mb-4">Page not found</h1>
        <p className="text-[#6b6b6b] mb-8">
          This page does not exist.
        </p>
        <Link
          href="/fr"
          className="inline-flex bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3 font-semibold text-sm"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
