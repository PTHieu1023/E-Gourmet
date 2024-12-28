type Locales = {
    [key: string]: {
        name: string;
        image: string;
    };
};

export const locales: Locales = {
    'vi': {
        name: 'Tiếng Việt',
        image: '/images/locale-vi.svg'
    },
    'en': {
        name: 'English',
        image: '/images/locale-en.svg'
    }
}

export const setLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; expires=never`;
    location.reload()
}