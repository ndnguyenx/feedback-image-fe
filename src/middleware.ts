'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CONST_VALUES } from './constants/values.constant';
import { StatusCodes } from 'http-status-codes';
import { getMe } from './apis/auth/auth.apis';


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    let response: NextResponse = NextResponse.next();

    const token = request.cookies.get(CONST_VALUES.TOKEN);
    const tokenCustomer = request.cookies.get("token");
    const results = await getMe();
    console.log("get-me", results);
    

    if (pathname === '/login' && !tokenCustomer) return response;
    if (tokenCustomer && pathname === '/login') {
        response = NextResponse.redirect(new URL('/admin', request.url));
        return response;
    }

    if (
        results.statusCode === StatusCodes.NOT_ACCEPTABLE &&
        pathname !== '/login'
    ) {
        console.log('Not Acceptable');
        response = NextResponse.redirect(new URL('/login', request.url));
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        response.cookies.delete(CONST_VALUES.TOKEN);
    }

    if (
        pathname !== '/login' && !token
    ) {
        response = NextResponse.redirect(new URL('/login', request.url));
    } else if (pathname === '/login' && token) {
        response = NextResponse.redirect(new URL('/admin', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
