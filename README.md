# Spry Assignment

Modern React/Next.js project showcasing two full-featured applications: Task Management Dashboard and E-Commerce Product Listing.

## Projects

### 1. Task Management Dashboard

Comprehensive task management system with CRUD operations, filtering, sorting, and real-time updates.

**Features:**
- ✅ Display tasks with title, description, status (Pending/In Progress/Completed), and due date
- ✅ Add new tasks with validation (title & dueDate mandatory)
- ✅ Edit task details
- ✅ Delete tasks with confirmation
- ✅ Filter tasks by status
- ✅ Sort tasks by due date
- ✅ Task summary dashboard showing count per status
- ✅ Client-side routing (All Tasks / Completed Tasks views)
- ✅ Persist tasks to local storage
- ✅ Smooth animations and toast notifications
- ✅ Responsive grid/list layout

**Tech Stack:**
- React Hook Form + Zod for validation
- Context API for state management
- Motion/Framer Motion for animations
- Responsive design with modern UI

**Screenshots:**
<!-- Add screenshots here -->
<img width="1920" height="881" alt="image" src="https://github.com/user-attachments/assets/9352230c-37ab-40e7-9baf-382f86b441d1" />


### 2. E-Commerce Product Listing Page

Feature-rich product browsing experience with filtering, sorting, and favorites management.

**Features:**
- ✅ Display products with image, name, price, category, rating
- ✅ Filter products by category and rating
- ✅ Sort by price (ascending/descending)
- ✅ Add/remove products from favorites
- ✅ Visual highlighting for favorited products
- ✅ Sticky filter/sort bar
- ✅ Lazy-loaded product images
- ✅ Persist favorites to local storage
- ✅ Responsive grid layout
- ✅ Performance optimized

**Tech Stack:**
- Mock API for product data
- State management for filters and favorites
- Image lazy-loading for performance
- Responsive design

**Screenshots:**
<!-- Add screenshots here -->
<img width="1920" height="1127" alt="image" src="https://github.com/user-attachments/assets/5777e334-1124-464f-87bb-c5d4b6f7044e" />


## Deployment

| Project | Status | URL |
|---------|--------|-----|
| Task Dashboard | ![Status Badge] | [Live Demo](https://spry-assignment.netlify.app/) |
| E-Commerce | ![Status Badge] | [Live Demo](https://spry-assignment.netlify.app/) |

## Setup

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── TaskCard
│   ├── TaskFormDialog
│   ├── TaskFilterSortBar
│   ├── DeleteTaskDialog
│   └── ...
├── pages/
│   ├── tasks
│   └── products
└── context/
```

## Tech Stack

- **Framework:** Next.js 14+
- **UI:** React + shadcn/ui
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **State:** Context API
- **Storage:** Local Storage
