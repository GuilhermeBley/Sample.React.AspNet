const baseAddress = "http://localhost:5043";

function updateOptions(options) {
    const update = { ...options };
    if (localStorage.jwt) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${localStorage.jwt}`,
        };
    }
    return update;
}

export default function apiFetch(url, options) {

    if (url.charAt(0) !== '/')
        url = baseAddress.concat('/', url);

    return fetch(url, options);
}