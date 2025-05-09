const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/api/favorites`;

export const getFavorites = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addFavorite = async (product) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export const removeFavorite = async (code) => {
  const res = await fetch(`${API_URL}/${code}`, {
    method: 'DELETE',
  });
  return await res.json();
};
