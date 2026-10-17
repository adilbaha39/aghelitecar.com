import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center bg-[#faf7f1] px-6">
        <div className="text-center max-w-md">
          <p className="text-[#b8893a] text-sm tracking-widest mb-2">404</p>
          <h1 className="font-serif text-3xl mb-4">Page introuvable</h1>
          <p className="text-[#6b6b6b] mb-8">
            La page demandée n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/fr"
            className="inline-flex bg-gradient-to-br from-[#e9cf94] to-[#c9993f] text-[#2a1e07] rounded-full px-6 py-3 font-semibold text-sm"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </body>
    </html>
  );
}
