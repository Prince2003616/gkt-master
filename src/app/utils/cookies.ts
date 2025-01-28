import Cookies from 'js-cookie';

// Define a type for the cookies object
interface CookieObject {
  [key: string]: string;
}

export const setCookie = (name: string, value: string, days: number) => {
    const options = { expires: days };
    try {
        Cookies.set(name, value, options);
    } catch (error) {
        console.error(`Failed to set cookie: ${name}`, error);
    }
};

export const getCookie = (name: string): string | undefined => {
    try {
        return Cookies.get(name);
    } catch (error) {
        console.error(`Failed to get cookie: ${name}`, error);
        return undefined;
    }
};

export const removeCookie = (name: string) => {
    try {
        Cookies.remove(name);
    } catch (error) {
        console.error(`Failed to remove cookie: ${name}`, error);
    }
};

// New function to set multiple cookies
export const setMultipleCookies = (cookies: CookieObject, days: number) => {
    for (const [key, value] of Object.entries(cookies)) {
        setCookie(key, value, days);
    }
};

