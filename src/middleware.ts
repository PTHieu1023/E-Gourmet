import { NextRequest, NextResponse } from 'next/server';

// Middle to set locale header from url search params
const setLocaleHeader = (req: NextRequest, res: NextResponse) => {
    const localeParams = req.nextUrl.searchParams.get('locale');
    if (localeParams) {
        return res.headers.set('locale', localeParams);
    }
    const localeStore = req.cookies.get('locale')?.value
    if (localeStore) {
        return res.headers.set('locale', localeStore);
    }
}

export default function middleware(req: NextRequest) {
    const res = NextResponse.next();
    setLocaleHeader(req, res);
    return res;
}

export const config = {
    matcher: ['/((?!api|_.*|.*\\..*).*)'] // Ignore api routes and route start with _ or static file route
};