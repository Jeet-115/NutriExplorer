export const fetchProducts = async (searchTerm, page = 1, category = "") => {
  const finalSearchTerm = category || searchTerm || "chocolate"; // fallback

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${finalSearchTerm}&page=${page}&page_size=12&json=1`;

  const res = await fetch(url);
  return await res.json();
};


export async function fetchProductByBarcode(barcode) {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );
  return res.json();
}
