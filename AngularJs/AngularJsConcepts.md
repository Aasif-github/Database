AngularJS (often referred to as Angular 1.x) is a popular JavaScript framework for building dynamic web applications. Although AngularJS has been largely superseded by Angular (version 2 and above), it's still valuable to understand its key concepts, especially when maintaining legacy applications.

Here are the core concepts of AngularJS:

---

### **1. MVC Architecture**
AngularJS follows the **Model-View-Controller (MVC)** design pattern:
- **Model**: Represents the data and the business logic of the application.
- **View**: The user interface (UI) which displays the model’s data.
- **Controller**: Acts as the intermediary between the model and view. It defines the behavior and functions for the view.

---

### **2. Directives**
Directives are special markers in the DOM (Document Object Model) that tell AngularJS to do something with DOM elements. They extend HTML with new behavior. 

Some common directives:
- `ng-model`: Binds an input field to a model.
- `ng-repeat`: Loops over an array and renders HTML for each item.
- `ng-if`: Conditionally includes/excludes an HTML element based on an expression.
- `ng-show/ng-hide`: Show or hide elements based on expressions.
- `ng-bind`: Bind data to an element.

Example of using a directive:
```html
<div ng-app="myApp" ng-controller="myCtrl">
  <p>{{ message }}</p>
</div>
```

---

### **3. Two-Way Data Binding**
AngularJS provides **two-way data binding**, meaning that any changes in the model (JavaScript variables) are reflected in the view (HTML), and changes in the view are automatically reflected in the model.

For example:
```html
<input type="text" ng-model="name">
<p>Hello, {{ name }}!</p>
```
If you type in the input, the paragraph updates instantly to reflect the value of `name`.

---

### **4. Dependency Injection**
AngularJS has a built-in **dependency injection (DI)** mechanism. This allows for better modularity and easier testing by injecting required dependencies (like services, factories, etc.) into controllers, services, and other components.

Example:
```javascript
angular.module('myApp', [])
  .controller('myCtrl', function($scope, $http) {
    // $http is injected here
  });
```

---

### **5. Services**
Services in AngularJS are reusable components that can contain business logic or data that can be shared across controllers and other services.

There are different types of services:
- **Factories**: Return an object or function.
- **Services**: Constructor function, which is instantiated using `new`.
- **Value**: A simple constant value.
- **Provider**: A more configurable service.

Example of a service:
```javascript
angular.module('myApp', [])
  .service('myService', function() {
    this.getData = function() {
      return 'Some data';
    };
  });
```

---

### **6. Filters**
Filters are used to format data before displaying it in the view. They can be applied to expressions in templates.

Some built-in filters:
- `currency`: Formats a number as a currency.
- `date`: Formats a date.
- `uppercase`: Transforms text to uppercase.
- `json`: Formats an object as a JSON string.

Example:
```html
<p>{{ price | currency }}</p>
```

---

### **7. Modules**
Modules in AngularJS are containers for different parts of the application like controllers, services, directives, etc. A module is created using the `angular.module()` method.

Example:
```javascript
angular.module('myApp', [])
  .controller('myCtrl', function($scope) {
    $scope.message = "Hello, World!";
  });
```

---

### **8. Controllers**
Controllers are used to define the logic for the views in AngularJS. They are responsible for initializing the model and adding functionality.

Example:
```javascript
angular.module('myApp', [])
  .controller('myCtrl', function($scope) {
    $scope.greeting = 'Hello, World!';
  });
```

---

### **9. Routing**
AngularJS provides **ngRoute** for handling routing in single-page applications (SPA). This allows for navigating between different views without reloading the page.

Example:
```javascript
angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
```

---

### **10. Templates**
Templates in AngularJS are the HTML part of the application. They contain AngularJS expressions and directives. AngularJS compiles the template into executable JavaScript code.

Example:
```html
<div ng-app="myApp" ng-controller="myCtrl">
  <h1>{{ greeting }}</h1>
</div>
```

---

### **11. $scope**
The `$scope` object is used to bind data between the controller and the view. It is an execution context for expressions and serves as the glue between the controller and view.

Example:
```javascript
angular.module('myApp', [])
  .controller('myCtrl', function($scope) {
    $scope.message = "Hello, World!";
  });
```

In the template, the `{{ message }}` expression will display the value of `message` from the `$scope`.

---

### **12. $http Service**
The `$http` service is used to make AJAX requests to a server. It returns a promise that can be used to handle success or error responses.

Example:
```javascript
angular.module('myApp', [])
  .controller('myCtrl', function($scope, $http) {
    $http.get('/api/data')
      .then(function(response) {
        $scope.data = response.data;
      }, function(error) {
        console.log(error);
      });
  });
```

---

### **13. Lifecycle Hooks**
AngularJS provides lifecycle hooks to manage the lifecycle of directives and components:
- **`$onInit()`**: Called when the component is initialized.
- **`$onChanges()`**: Called when the inputs to the component change.
- **`$onDestroy()`**: Called when the component is destroyed.

---

These concepts should help you get started with AngularJS. However, it's recommended to upgrade to **Angular 2+** if you're starting new projects, as AngularJS (1.x) is no longer actively maintained.