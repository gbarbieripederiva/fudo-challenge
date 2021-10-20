export function utf8ToB64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
export function getAuthorizationHeader(username: string, password: string) {
    return "Basic " + utf8ToB64(username + ":" + password);
}
