import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const cookieStore = await cookies();
    let locale = cookieStore.get('locale')?.value || 'en';

    return {
        locale,
        messages: (await import(`@/i18n/messages/${locale}.json`)).default
    };
});