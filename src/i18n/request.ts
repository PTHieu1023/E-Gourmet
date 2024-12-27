import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const getLocale = async () => {
    const localeHeader = (await headers()).get('locale');
    if (localeHeader) return localeHeader;
    // const session: any = await getAuthSession();
    // if (session?.user?.locale) return session.user.locale;
    return 'en';
}

const configI18NRequest = async () => {
    const locale = await getLocale();
    return {
        locale: locale,
        messages: (await import(`@/i18n/messages/${locale}.json`)).default
    };
}

export default getRequestConfig(configI18NRequest);