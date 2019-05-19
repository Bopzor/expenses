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

function validateDescription(description) {
  if (description === '')
    return { param: 'description', msg: 'This field is required.' };
}

function validateCost(cost) {
  if (cost === '')
    return { param: 'cost', msg: 'This field is required and must be a number.' };

  else if (isNaN(cost))
    return { param: 'cost', msg: 'This field must be a number.' };
}

export function validationForm(fields) {
  const errors = [];

  fields.forEach(field => {
    switch (field.name) {
      case 'description':
        if (validateDescription(field.value))
          errors.push(validateDescription(field.value));
        break;

      case 'cost':
        if (validateCost(field.value))
          errors.push(validateCost(field.value));
        break;

      default:
        break;
    }
  });

  if (errors.length <= 0)
    return null;

  return errors;
}