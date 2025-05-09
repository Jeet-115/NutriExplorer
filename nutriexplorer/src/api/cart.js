const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/api/cart`;

export const getCart = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch cart");
    return await res.json();
  };

  export const addToCart = async (product, quantity = 1) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: product.code,
        product_name: product.product_name,
        brands: product.brands,
        image_url: product.image_url,
        nutrition_grades_tags: product.nutrition_grades_tags,
        quantity,
      }),
    });
    if (!res.ok) throw new Error("Failed to add to cart");
    return await res.json();
  };
  
  export const removeFromCart = async (code) => {
    const res = await fetch(`${API_URL}/${code}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove from cart");
    return await res.json();
  };
  
  export const clearCart = async () => {
    const res = await fetch(`${API_URL}/clear`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to clear cart");
    return await res.json();
  };
  
  export const updateQuantity = async (code, quantity) => {
    const res = await fetch(`${API_URL}/${code}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update quantity");
    return await res.json();
  };
  
  export const getTotalQuantity = (cart) => {
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };