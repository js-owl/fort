import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-6 px-page">
      <p className="text-xl font-medium text-brand">404</p>
      <h1 className="text-h2 font-medium uppercase">Страница не найдена</h1>
      <Link href="/" className="bg-brand px-8 py-5 text-button font-medium">
        На главную
      </Link>
    </main>
  );
}
