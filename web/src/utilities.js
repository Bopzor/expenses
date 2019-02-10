export function formatDate(date) {
  let month = date.getMonth() + 1;

  if (month < 10)
    month = `0${month}`;

  return `${month}-${date.getFullYear()}`;
}

export function formatDateForInput(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10)
    month = `0${month}`;


  if (day < 10)
    day = `0${day}`;

  return `${year}-${month}-${day}`;
}

export function calTotal(sum, expenses, advancesSelf, advancesOther) {
  return expenses - sum/2 + advancesSelf - advancesOther;
}

class RequestError extends Error {
  constructor(message, body) {
    super(message);

    this.body = body;
  }
}

export function myFetch(url, opts = {}) {
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
