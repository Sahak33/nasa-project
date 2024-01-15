export async function getData(params) {

  const res = await fetch(`https://images-api.nasa.gov/search?${params}`, {cache: 'no-store'})

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}