import { Locales } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locales }>
}) {
  return (
    <main className="container">
      ok
    </main>
  );
}
