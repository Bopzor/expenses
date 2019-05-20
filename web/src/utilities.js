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

const validate = {
  description: (description) => {
    if (description === '')
      return { message: 'This field is required.' };
  },
  cost: (cost) => {
    if (cost === '')
      return { message: 'This field is required and must be a number.' };

   else if (isNaN(cost))
    return { message: 'This field must be a number.' };
  }
}

export function validationForm(fields) {
  const errors = {};
  const descriptionError = validate.description(fields.description);
  const costError = validate.cost(fields.cost);

  if (descriptionError)
    errors.description = descriptionError;

  if (costError)
    errors.cost = costError;

  return Object.keys(errors).length === 0 ? null : errors;
}

export function validationFormField(field) {
  const errorMessage = validate[field.name](field.value);

  const error = { name: field.name, message: (errorMessage !== undefined ? errorMessage.message : undefined) }

  return error;
}
