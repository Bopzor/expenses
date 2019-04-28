class RequestError extends Error {
  constructor(message, body) {
    super(message);

    this.body = body;
  }
}

export function myFetch(url, opts = {}) {
  opts.mode = 'cors';

  return fetch(url, opts)
    .then(
      async res => {
        const getBody = async res => {
          const contentType = res.headers.get('Content-Type');

          if (/^application\/json/.exec(contentType)) {
            return res.json();

          } else if (/^text/.exec(contentType)) {
            return res.text();
          }
        };

        if (!res.ok) {
          throw new RequestError(`Request failed: ${opts.method || 'GET'} ${url} -> ${res.status}`, await getBody(res));
        }

        return await getBody(res);
      },
      error => console.error('Error: ', error)
    );
}
