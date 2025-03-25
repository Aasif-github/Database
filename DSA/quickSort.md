### **Quick Sort Algorithm (Fast & Efficient)**
Quick Sort is a **divide-and-conquer** sorting algorithm that works by selecting a **pivot** element, partitioning the array, and then recursively sorting the subarrays.

### **How Quick Sort Works:**
1. Choose a **pivot** (typically the last, first, or a random element).
2. **Partition** the array so that:
   - Elements **smaller than pivot** go to the left.
   - Elements **greater than pivot** go to the right.
3. Recursively apply Quick Sort to the left and right subarrays.
4. Combine the sorted subarrays to get the final sorted array.

---

### **Quick Sort Code (JavaScript - ES6)**
```javascript
function quickSort(arr) {
    if (arr.length <= 1) return arr; // Base case: already sorted

    let pivot = arr[arr.length - 1]; // Choosing the last element as pivot
    let left = [], right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) left.push(arr[i]); // Elements smaller than pivot
        else right.push(arr[i]); // Elements greater than pivot
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage
let numbers = [5, 2, 9, 1, 5, 6];
console.log(quickSort(numbers)); // Output: [1, 2, 5, 5, 6, 9]
```

---

### **Time Complexity:**
| Case        | Time Complexity |
|------------|----------------|
| **Best Case** (Random Pivot) | O(n log n) |
| **Average Case** | O(n log n) |
| **Worst Case** (Already Sorted, Poor Pivot Choice) | O(n²) |

💡 **Why Quick Sort is Fast?**
✅ **O(n log n) on average** (faster than Bubble Sort O(n²))  
✅ **Efficient for large datasets**  
✅ **No extra space required** (in-place sorting possible)  

Would you like an **in-place** Quick Sort version (without extra arrays)? 🚀