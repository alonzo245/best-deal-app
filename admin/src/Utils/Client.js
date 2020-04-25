import axios from 'axios'
const host = '//localhost'
export const client = axios.create({
  baseURL: host+'/api-v1',
});

export const authClient = axios.create({
  baseURL: host+'/auth/',
});

export const authHeaders = user => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + user.accessToken
    }
  }
}