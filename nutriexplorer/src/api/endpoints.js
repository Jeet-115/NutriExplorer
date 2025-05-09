export const BASE_SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl";
export const CATEGORY_URL = "https://world.openfoodfacts.org/categories.json";
export const PRODUCT_BY_BARCODE = (barcode) =>
  `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;