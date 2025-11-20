// Minimal API wrapper (for demonstration). Reads fake token from localStorage.
export function getAuthToken(){
  return localStorage.getItem('startup_demo_token')
}

export async function request(url, opts = {}){
  const headers = opts.headers || {}
  const token = getAuthToken()
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(url, { ...opts, headers })
  return res
}
