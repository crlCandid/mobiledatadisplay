//TODO dev/prod port
const GET = async (endpoint) => {
  let url = `/api${endpoint}`;
  let response = await fetch(url);
  return response.json();
}

const POST = async (endpoint, postData, token = '') => {
  let url = `/api${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token' : token
    },
    body: JSON.stringify(postData)
  });

  return response.json();
}


const PUT = async (endpoint, postData, token ) => {
  let url = `/api${endpoint}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(postData)
  });

  return response.json();
}

const DELETE = async (endpoint, token) => {
  let url = `/api${endpoint}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'token': token
    }
  });

  return response.json();
}

export {GET, POST, PUT, DELETE}