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
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    name: "Pro Laptop 15",
    price: 1299.99,
    category: "Electronics",
    rating: 4.8
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    rating: 4.5
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    name: "Travel Backpack",
    price: 79.99,
    category: "Accessories",
    rating: 4.6
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    name: "Smart Watch",
    price: 349.99,
    category: "Electronics",
    rating: 4.3
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    name: "Running Shoes",
    price: 129.99,
    category: "Footwear",
    rating: 4.7
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
    name: "Digital Camera",
    price: 599.99,
    category: "Electronics",
    rating: 4.9
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    name: "Leather Wallet",
    price: 49.99,
    category: "Accessories",
    rating: 4.4
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&h=400&fit=crop",
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    name: "4K Monitor",
    price: 449.99,
    category: "Electronics",
    rating: 4.7
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    name: "Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    rating: 4.3
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
    name: "Denim Jeans",
    price: 79.99,
    category: "Clothing",
    rating: 4.5
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    name: "UV Protection Sunglasses",
    price: 89.99,
    category: "Accessories",
    rating: 4.8
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1591290619762-e2584e551e15?w=400&h=400&fit=crop",
    name: "Fast Charging Cable",
    price: 19.99,
    category: "Electronics",
    rating: 4.4
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    name: "Bluetooth Speaker",
    price: 99.99,
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    name: "Wooden Desk",
    price: 299.99,
    category: "Furniture",
    rating: 4.4
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    name: "Ergonomic Office Chair",
    price: 249.99,
    category: "Furniture",
    rating: 4.7
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1565636192335-14c9b8a1d482?w=400&h=400&fit=crop",
    name: "LED Desk Lamp",
    price: 39.99,
    category: "Furniture",
    rating: 4.5
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    name: "Wireless Mouse",
    price: 34.99,
    category: "Electronics",
    rating: 4.2
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
    name: "10-inch Tablet",
    price: 399.99,
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
    name: "Technical Programming Book",
    price: 59.99,
    category: "Books",
    rating: 4.8
  }
];

export const categories = Array.from(
  new Set(products.map(p => p.category))
).sort();
