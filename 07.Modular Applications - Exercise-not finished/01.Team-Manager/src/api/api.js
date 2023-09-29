const host = 'http://localhost:3030/';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (!response.ok) {
            if (response.status === 403) {
                sessionStorage.clear();
            }
            const err = await response.json();
            throw new Error(err.message);
        }

        try {
            if(response.status===204){
                return response;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            alert(error.message);
            return error;
        }
    } catch (error) {
        alert(error.message);
        return error;
    }
}

function getOption(method, body) {
    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    const token = sessionStorage.getItem('authToken');
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    return options;
}

export async function get(url) {
    return await request(url, getOption("Get"));
}
export async function post(url, data) {
    return await request(url, getOption("Post", data));
}
export async function put(url, data) {
    return await request(url, getOption("Put", data));
}
export async function del(url) {
    return await request(url, getOption("Delete"))
}