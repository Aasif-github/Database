In PHP, `implode()` and `explode()` are two commonly used **string functions** for converting between **arrays and strings**.

---

## ✅ `implode()` — Convert Array to String

### 🔹 **Syntax**:

```php
implode(string $separator, array $array)
```

* Joins array elements into a single string using a separator.

### 🔹 **Example**:

```php
$colors = ['red', 'green', 'blue'];
echo implode(', ', $colors);  // Output: red, green, blue
```

---

## ✅ `explode()` — Convert String to Array

### 🔹 **Syntax**:

```php
explode(string $separator, string $string)
```

* Splits a string into an array based on a delimiter.

### 🔹 **Example**:

```php
$string = "apple,banana,grape";
$fruits = explode(',', $string);
print_r($fruits);
```

### 🔹 **Output**:

```php
Array
(
    [0] => apple
    [1] => banana
    [2] => grape
)
```

---

## 🔄 Summary Table

| Function    | Purpose                    | Input              | Output |
| ----------- | -------------------------- | ------------------ | ------ |
| `implode()` | Join array into a string   | Array + separator  | String |
| `explode()` | Split string into an array | String + separator | Array  |

---

 
