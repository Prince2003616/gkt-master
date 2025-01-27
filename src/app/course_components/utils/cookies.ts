import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, days: number) => {
    const options = { expires: days };
    Cookies.set(name, value, options);
};

export const getCookie = (name: string) => {
    return Cookies.get(name);
};

export const removeCookie = (name: string) => {
    Cookies.remove(name);
};

// New function to set multiple cookies
export const setMultipleCookies = (cookies: { [key: string]: any }, days: number) => {
    for (const [key, value] of Object.entries(cookies)) {
        setCookie(key, value, days);
    }
}; 