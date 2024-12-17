### For api design for filter and sorting . which one is best practice. design seperate api for filter and sorting or desing one api which handle both


For API design, the best practice is generally to **design a single API endpoint that handles both filtering and sorting**. This approach is clean, efficient, and easy to use for clients, as it reduces the need to create multiple endpoints for similar actions. It allows you to consolidate the logic for filtering, sorting, and pagination in one place, leading to a simpler, more maintainable codebase.

### Why combine filter and sorting in one API:
1. **Single Responsibility:** Your API will have a single endpoint for searching resources, making it easier to manage and maintain. Clients won’t need to make multiple requests to filter and then sort, which reduces complexity on the client side.
2. **Flexibility:** Allowing both filter and sort in one API provides greater flexibility to clients who can specify both parameters in a single request.
3. **Performance:** Handling filtering and sorting together allows for optimized database queries, reducing the number of calls to the database.

### Best practices for designing a single API for both filtering and sorting:

1. **Use query parameters:**
   - **Filtering:** Include multiple query parameters to filter data (e.g., `category`, `status`, `author`, etc.).
   - **Sorting:** Use a query parameter to specify the sort field (e.g., `sortBy=price`), and optionally, the sort direction (`asc` or `desc`).
   
   Example:
   ```
   GET /api/products?category=electronics&priceRange=100-500&sortBy=price&sortOrder=desc
   ```

2. **Filtering with multiple criteria:**
   - Allow multiple filters by using query parameters with different values.
   - You can support "AND" or "OR" logic by default, or allow users to specify which logic to apply (e.g., `category=electronics&status=available`).
   
3. **Sorting:**
   - Accept parameters like `sortBy` to define which field to sort on (e.g., `name`, `price`, `dateAdded`).
   - Use `sortOrder` to define the sort direction (`asc` for ascending, `desc` for descending).

4. **Pagination:**
   - Combine filtering and sorting with pagination for large datasets. Use `limit` and `page` (or `skip`) parameters to allow clients to paginate the results.
   
   Example:
   ```
   GET /api/products?category=electronics&priceRange=100-500&sortBy=price&sortOrder=asc&page=2&limit=10
   ```

### Example of a combined API design:

```js
// In routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get filtered and sorted products
router.get('/products', async (req, res) => {
  try {
    const { category, priceRange, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
    
    // Build filter object based on query parameters
    let filter = {};
    if (category) filter.category = category;
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Sort by the specified field
    const sort = sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {};

    // Pagination logic
    const skip = (page - 1) * limit;
    
    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort(sort);
    
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      totalPages,
      totalProducts,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### How it works:
- The client sends a GET request to `/api/products` with query parameters for filtering (`category`, `priceRange`), sorting (`sortBy`, `sortOrder`), and pagination (`page`, `limit`).
- The server builds a query based on these parameters, applies filtering, sorting, and pagination, and then sends the response.

### Example Request:
```http
GET /api/products?category=electronics&priceRange=100-500&sortBy=price&sortOrder=asc&page=2&limit=10
```

### Example Response:
```json
{
  "products": [
    { "name": "Product 1", "price": 199 },
    { "name": "Product 2", "price": 299 }
  ],
  "totalPages": 5,
  "totalProducts": 50,
  "currentPage": 2
}
```

### Considerations:
- **Input Validation:** Validate query parameters to ensure correct format and values (e.g., ensuring `sortBy` corresponds to a valid field).
- **Error Handling:** Return appropriate error messages when invalid filters or sort fields are provided.

By using a single endpoint for both filtering and sorting, you ensure that the API is flexible, simple to use, and performant.