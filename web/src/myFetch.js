export default function myFetch(url, opts = {}) {
  return fetch(url, opts)
    .then(
      res => {
        const contentType = res.headers.get('Content-Type');

        if (/^application\/json/.exec(contentType)) {
          return res.json();
        } else if (/^text/.exec(contentType)) {
          return res.text();
        }
      },
      error => console.error('Error: ', error)
    );
}
