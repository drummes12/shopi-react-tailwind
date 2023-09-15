export function accessData(url, setError, setLoading, setData) {
  setError(null)
  setLoading(true)
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .then((data) => setData(data))
    .catch((error) => {
      setError(error.message)
    })
    .finally(() => {
      setError(null)
      setLoading(false)
    })
}

export function getData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .catch((error) => {
      console.error(error)
    })
}
