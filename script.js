// Handle ordering on the main product page
function orderProduct(name, price) {
    // Redirect to the order page with product info
    window.location.href = `order.html?name=${encodeURIComponent(name)}&price=${price}`;
  }
  
  // Extract query parameters and prefill the form on the order page
  if (window.location.pathname.includes("order.html")) {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("productName").value = params.get("name");
    document.getElementById("price").value = params.get("price");
  
    document.getElementById("orderForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Collect order details
      const order = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        productName: document.getElementById("productName").value,
        price: document.getElementById("price").value
      };
  
      // Save the order to local storage
      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
  
      // Redirect to a confirmation page or clear form
      alert("Order placed successfully!");
      window.location.href = "index.html";
    });
  }
  
  // Load orders on the admin page
  if (window.location.pathname.includes("admin.html")) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersDiv = document.getElementById("orders");
  
    if (orders.length === 0) {
      ordersDiv.innerText = "No orders yet.";
    } else {
      orders.forEach((order, index) => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order");
        orderElement.innerHTML = `
          <h3>Order ${index + 1}</h3>
          <p><strong>Name:</strong> ${order.name}</p>
          <p><strong>Address:</strong> ${order.address}</p>
          <p><strong>Product:</strong> ${order.productName}</p>
          <p><strong>Price:</strong> $${order.price}</p>
        `;
        ordersDiv.appendChild(orderElement);
      });
    }
  }
  