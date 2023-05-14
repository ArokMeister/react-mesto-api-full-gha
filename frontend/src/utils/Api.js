class Api {
  constructor() {
    this._baseURL = 'https://api.arokmeister.mesto.nomoredomains.monster';
    this._headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    this._credentials = 'include';
  }

  _verifyResponse(res) {
    if (!res.ok) {
      return res.json().then(message => {throw new Error(message.message)})
    }
    return res.json();
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
      credentials: this._credentials
    })
      .then(res => this._verifyResponse(res));
  }

  setUserData(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data)
    })
      .then(res => this._verifyResponse(res))
  }

  getCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      credentials: this._credentials
  })
    .then(res => this._verifyResponse(res));
  }

  postCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data)
    })
      .then(res => this._verifyResponse(res))
  }

  deleteCard(idCard) {
    return fetch(`${this._baseURL}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(res => this._verifyResponse(res))
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(avatar)
    })
      .then(res => this._verifyResponse(res)) 
  }

  setLikes(idCard, isLiked) {
    return fetch(`${this._baseURL}/cards/${idCard}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: this._credentials
    })
      .then(res => this._verifyResponse(res))
  }
}

const api = new Api()

export default api