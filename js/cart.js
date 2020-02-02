(function () {
  function $(selector) {
    return document.querySelector(selector);
  }

  function Cart() {
    this.constructor = function () {
      if (!localStorage.getItem("peter_cart")) {
        localStorage.setItem("peter_Cart", '[]');
      }
    }

    this.getCart = JSON.parse(localStorage.getItem("peter_cart"));

    this.setQuantityItem = function (id, newQuantity) {
      for (obj of this.getCart) {
        if (obj.id === id) {
          obj.quantity = newQuantity;
          obj.total = parseFloat((obj.quantity * obj.price).toFixed(2));
          localStorage.setItem("peter_cart", JSON.stringify(this.getCart));
          
          var selectThis = "#total-" + id;
          $(selectThis).textContent = "$" + obj.total;
          
          $("#totalCart").textContent = "$" + cart.getTotal();
          return;
        }
      }
    }
    
    this.deleteItem = function (id) {
      for (var index in this.getCart) {
        if (this.getCart[index].id === id) {
          this.getCart.splice(index, 1);
          break;
        }
      }
      localStorage.setItem("peter_cart", JSON.stringify(this.getCart));
      cart_view.renderCart();
    }

    this.getTotal = function () {
      var total = 0;
      for (obj of this.getCart) {
        total += obj.total;
      }
      return parseFloat(total).toFixed(2);
    }
  }

  function Cart_View() {
    this.renderCart = function () {
      if (cart.getCart.length <= 0) {
        var template = `
          <p style="display: block; text-align: center">No products in cart.</p>
        `;
        $("#cartProducts").innerHTML = template;
      } else {
        $("#cartProducts").innerHTML = "";
        var template = `
          <table id="tableCart" class="wp-10">
           <thead>
              <tr>
                 <th>Image</th>
                 <th>Name</th>
                 <th>Price</th>
                 <th>Quantity</th>
                 <th>Total</th>
                 <th>Action</th>
              </tr>
           </thead>
           <tbody>
        `;
        for (obj of cart.getCart) {          
          template += `
                  <tr>
                     <td width="100"><img src="./img/${obj.image}"></td>
                     <td>${obj.name}</td>
                     <td>$${obj.price}</td>
                     <td>
                        <input class="w-4" type="number" value="${obj.quantity}" data-product="${obj.id}" min="1" max="100" />
                     </td>
                     <td id="total-${obj.id}">$${obj.total}</td>
                     <td><input type="submit" class="btn btn-red" id="delete-${obj.id}" value="Delete"></td>
                  </tr>
          `;          
        }
        template += `
                  <tr>
                      <th colspan="4">Total Price:</th>
                      <th id="totalCart">$0</th>
                      <td><input type="submit" class="btn btn-green" value="Checkout"></td>
                  </tr>
               </tbody>
            </table>
        `;

        $("#cartProducts").innerHTML = template;
        $("#totalCart").textContent = "$" + cart.getTotal();
      }

      document.querySelectorAll("input[type='number']").forEach(function (input) {
        input.addEventListener("change", function (e) {
           var id = e.target.dataset.product;
           var newQuantity = parseInt(e.target.value);
           cart.setQuantityItem(id, newQuantity);
        });
      });
      
      document.querySelectorAll("input[value='Delete']").forEach(function(input) {
         input.addEventListener("click", function(e) {
           e.preventDefault();
           if (confirm("Are you sure?")) {
             var almostID = e.target.id;
             var id=almostID.split("-")[1];
             cart.deleteItem(id);
           }
         });
      });
    }

  }

  var cart = new Cart();
  var cart_view = new Cart_View();

  document.addEventListener('DOMContentLoaded', function () {
    cart.constructor();
    cart_view.renderCart();
  });

})();
