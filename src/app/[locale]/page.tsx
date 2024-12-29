import { Locales } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locales }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations()
  return (
    <main className="container">
      {t('HomePage.title')}
    </main>
  );
}
