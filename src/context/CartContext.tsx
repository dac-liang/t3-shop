import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import type { Product, Category, ProductImage } from "@prisma/client";

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = Omit<Product, "categoryId"> & {
  category: Category;
  productImage: Omit<ProductImage, "id" | "productId">[];
} & {
  quantity: number;
  price: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increase: (product: CartItem) => void;
  decrease: (productDetailId: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  cartQuantity: number;
  cartSum: number;
};

const CartContext = createContext({} as ShoppingCartContext);

const useShoppingCart = () => {
  return useContext(CartContext);
};

const CartProvier = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (previousValue, item) => item.quantity + previousValue,
    0
  );
  const cartSum = cartItems.reduce(
    (previousValue, item) => item.quantity * item.price + previousValue,
    0
  );
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increase = (newItem: CartItem) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === newItem.id) == null) {
        return [
          ...currItems,
          {
            id: newItem.id,
            quantity: newItem.quantity,
            price: newItem.price,
            name: newItem.name,
            description: newItem.description,
            category: newItem.category,
            productImage: newItem.productImage,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (item.id === newItem.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decrease = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 } as CartItem;
          } else {
            return item as CartItem;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increase,
        decrease,
        removeFromCart,
        cartItems,
        cartQuantity,
        cartSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useShoppingCart, CartProvier };
