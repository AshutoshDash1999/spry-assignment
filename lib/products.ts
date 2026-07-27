export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x300?text=Laptop",
    name: "Pro Laptop 15",
    price: 1299.99,
    category: "Electronics",
    rating: 4.8
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x300?text=Headphones",
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    rating: 4.5
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x300?text=Backpack",
    name: "Travel Backpack",
    price: 79.99,
    category: "Accessories",
    rating: 4.6
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x300?text=Watch",
    name: "Smart Watch",
    price: 349.99,
    category: "Electronics",
    rating: 4.3
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x300?text=Shoes",
    name: "Running Shoes",
    price: 129.99,
    category: "Footwear",
    rating: 4.7
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x300?text=Camera",
    name: "Digital Camera",
    price: 599.99,
    category: "Electronics",
    rating: 4.9
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300x300?text=Wallet",
    name: "Leather Wallet",
    price: 49.99,
    category: "Accessories",
    rating: 4.4
  },
  {
    id: 8,
    image: "https://via.placeholder.com/300x300?text=Keyboard",
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
    rating: 4.6
  }
];

export const categories = Array.from(
  new Set(products.map(p => p.category))
).sort();
