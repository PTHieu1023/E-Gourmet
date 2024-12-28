import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'en' | 'nl' }>
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
