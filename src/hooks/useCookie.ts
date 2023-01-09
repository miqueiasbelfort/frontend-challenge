import Cookies from "js-cookie";

const useCookie = () => {

    function setCookie(cookiename: string, value: string, exp: number) {
        Cookies.set(cookiename, value, {
            expires: exp,
            path: '/'
        })
    }

    function setCookiePassword(cookiename: string, value: string, exp: number){

        const passwordHash = `4asd5a4dda4sd5a4s ${value} d4a5sd4asd42z1xa4d`
        Cookies.set(cookiename, passwordHash, {
            expires: exp,
            path: '/'
        })

    }

    function getCookie(cookiename: string){
        return Cookies.get(cookiename)
    }

    function removeCookie(cookiename: string){
        Cookies.remove(cookiename, {path: '/'})
    }

    return {setCookie, getCookie, removeCookie, setCookiePassword}

}

export default useCookie