export const BASE_URL = 'https://api.arokmeister.mesto.nomoredomains.monster';

function makeRequest(url, method, body) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  } 

  const config = {
    method,
    headers,
    credentials: 'include'
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  function verifyResponse(res) {
    if (!res.ok) {
      return res.json().then(message => { 
        if (message.error) {
          throw new Error(message.error)
        }
        if (message.message) {
          throw new Error(message.message)
        }
      })
    }
    return res.json();
  }

  return fetch(`${BASE_URL}${url}`, config).then((res) => verifyResponse(res))
}

export const register = (email, password) => {
  return makeRequest('/signup', 'POST', { email, password })
}

export const authorize = (email, password) => {
  return makeRequest('/signin', 'POST', { email, password })
}

export const checkToken = () => {
  return makeRequest('/users/me', 'GET', undefined)
}

export const clearToken = () => {
  return makeRequest('/signout', 'POST', undefined)
}