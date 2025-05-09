import { createContext, useContext, useState, useEffect, useRef } from "react";
import { fetchProducts } from "../api/fetch";
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getTotalQuantity,
} from "../api/cart";
import toast from "react-hot-toast";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("chocolate");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchProducts(query, page, category);
      if (page === 1) {
        setProducts(data.products || []);
      } else {
        setProducts((prev) => [...prev, ...(data.products || [])]);
        setTimeout(() => {
          loadMoreRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      setLoading(false);
    };
    if (query.trim() || category.trim()) {
      getData();
    }
  }, [query, page, category]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (err) {
        console.error("Failed to fetch cart items", err);
      }
    };
    loadCart();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        query,
        page,
        setQuery,
        setPage,
        setProducts,
        setLoading,
        category,
        setCategory,
        sortOption,
        setSortOption,

        favorites,
        setFavorites,
        toggleFavorite: async (product) => {
          const exists = favorites.find((p) => p.code === product.code);
          if (exists) {
            setFavorites((prev) => prev.filter((p) => p.code !== product.code));
            await removeFavorite(product.code);
            toast("Removed from favorites", { icon: "❌" });
          } else {
            const favoriteData = {
              code: product.code,
              product_name: product.product_name,
              brands: product.brands,
              image_url: product.image_url,
              nutrition_grades_tags: product.nutrition_grades_tags,
            };
            setFavorites((prev) => [...prev, favoriteData]);
            try {
              await addFavorite(favoriteData);
              toast.success("Added to favorites!");
            } catch (err) {
              console.error("Failed to add favorite", err);
            }
          }
        },
        isFavorited: (code) => favorites.some((p) => p.code === code),

        cart,
        setCart,
        addToCart: async (product) => {
          const cartItem = cart.find((item) => item.code === product.code);
          if (cartItem) {
            const updated = await updateQuantity(product.code, cartItem.quantity + 1);
            setCart((prev) =>
              prev.map((item) => (item.code === product.code ? updated : item))
            );
          } else {
            const newItem = { ...product, quantity: 1 };
            const added = await addToCart(newItem);
            setCart((prev) => [...prev, added]);
            toast.success("Added to cart!");
          }
        },
        removeFromCart: async (code) => {
          await removeFromCart(code);
          setCart((prev) => prev.filter((item) => item.code !== code));
          toast("Removed from cart", { icon: "🗑️" });
        },
        updateQuantity: async (code, quantity) => {
          const updated = await updateQuantity(code, quantity);
          setCart((prev) =>
            prev.map((item) => (item.code === code ? updated : item))
          );
          toast.success("Quantity updated");
        },
        clearCart: async () => {
          await clearCart();
          setCart([]);
        },
        getTotalQuantity: () => getTotalQuantity(cart),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
