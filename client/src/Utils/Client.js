import axios from 'axios'

export const client = axios.create({
  baseURL: '//localhost/api-v1/',
});

export const authClient = axios.create({
  baseURL: '//localhost/auth/',
});

export const authHeaders = user => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + user.accessToken
    }
  }
}