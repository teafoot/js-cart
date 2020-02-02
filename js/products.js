(function () {
    if (!localStorage.getItem("peter_cart")) {
      localStorage.setItem("peter_cart", '[]');
    }

  function $(selector) {
    return document.querySelector(selector);
  }

  function Cart() {
    this.catalog = [{
        id: "1",
        name: 'F1 Sneakers X',
        price: 5.20,
        image: '0001.jpg'
      },
      {
        id: "2",
        name: 'Nike Triple T',
        price: 6.20,
        image: '0002.jpg'
      },
      {
        id: "3",
        name: 'Nike Sand Z',
        price: 4.20,
        image: '0003.jpg'
      },
      {
        id: "4",
        name: 'Randabam High Heels',
        price: 30.20,
        image: '0004.jpg'
      },
      {
        id: "5",
        name: 'Nike Sport',
        price: 8.20,
        image: '0005.jpg'
      },
      {
        id: "6",
        name: 'Echo Heel',
        price: 41.20,
        image: '0006.jpg'
      },
      {
        id: "7",
        name: 'Gen Z Shoes',
        price: 18.20,
        image: '0007.jpg'
      },
      {
        id: "8",
        name: 'Z Stars',
        price: 81.20,
        image: '0008.jpg'
      },
      {
        id: "9",
        name: 'Brown Boots',
        price: 55.20,
        image: '0009.jpg'
      },
      {
        id: "10",
        name: 'Purple Boots',
        price: 71.20,
        image: '0010.jpg'
      },      
      {
        id: "11",
        name: 'Hot Pink Boots',
        price: 49.20,
        image: '0011.jpg'
      },      
      {
        id: "12",
        name: 'Invictus Sneaker',
        price: 36.20,
        image: '0012.jpg'
      },
      {
        id: "13",
        name: 'Ultra High Heels X',
        price: 16.20,
        image: '0013.jpg'
      },
      {
        id: "14",
        name: 'Ultra High Heels Y',
        price: 19.20,
        image: '0014.jpg'
      },
      {
        id: "15",
        name: 'Super Tough Boots',
        price: 17.20,
        image: '0015.jpg'
      },
      {
        id: "16",
        name: 'Converse XYZ',
        price: 51.20,
        image: '0016.jpg'
      },
    ];

    this.getCart = JSON.parse(localStorage.getItem("peter_cart"));

    this.addItem = function (id) {
      for (obj of this.catalog) {
        if (obj.id === id) {
          var record = obj;
          break;
        }
      }

      if (!record) {
        return;
      }

      for (obj of this.getCart) {
        if (obj.id === id) {
          obj.quantity++;
          obj.total = parseFloat((obj.quantity * obj.price).toFixed(2));
          localStorage.setItem("peter_cart", JSON.stringify(this.getCart));
          return;
        }
      }

      record.quantity = 1;
      record.total = parseFloat((record.quantity * record.price).toFixed(2));
      this.getCart.push(record);
      localStorage.setItem("peter_cart", JSON.stringify(this.getCart));
    };
    
    this.alreadyExists = function(id) {
       for (var obj of this.getCart) {
         if (obj.id == id && obj.quantity>=1) {
           var selectThis = "[data-product='" + id + "']";
           $(selectThis).classList.remove("btn-green");
           $(selectThis).classList.add("btn-yellow");
           $(selectThis).textContent = `Already in cart! (${obj.quantity})`;
           break;
         }
      }
    }
  }

  function Cart_View() {
    this.renderCatalog = function () {
      var template = ``;
      var shoe = 0;
      for (var i=1;i<=4;i++) {
        template += `
          <div class="col-1-1">
            <section>
               <nav class="horizontalNavigation">
                  <ul>
        `;
        for (var j=1;j<=4;j++) {
          template += `
                   <li class="p-1">
                      <a href="product${shoe+1}.html"><img src="img/${cart.catalog[shoe].image}" alt="" />${cart.catalog[shoe].name}</a>
                      <span class="price">Price: $${cart.catalog[shoe].price}</span>
                      <button class="btn-cart btn btn-green wp-10" data-product="${cart.catalog[shoe].id}">Add to Cart</button>
                   </li>
          `;
          shoe++;
        }
        template += `
                  </ul>
               </nav>
            </section>
          </div>
        `;        
      }

      $("#catalog").innerHTML = template;
      
      var buttons = document.getElementsByClassName("btn-cart");
      for(var i=0;i<buttons.length;i++) {
        var id = buttons[i].dataset.product;
        cart.alreadyExists(id);
      }
    };
    
    this.renderSingleProduct = function () {
      var fileName = location.pathname.split("/").slice(-1)[0];
      var id = fileName.replace(/[^0-9]/g, '');
      
      var template = `
        <button class="btn-cart btn btn-green wp-10" data-product="${id}">Add to Cart</button>
      `;

      $("#addtocart").innerHTML = template;
      
      var buttons = document.getElementsByClassName("btn-cart");
      for(var i=0;i<buttons.length;i++) {
        var id = buttons[i].dataset.product;
        cart.alreadyExists(id);
      }
    }
    
    this.slashPrices = function () {
      var slashedPrices = [100, 200, 70, 90];
      var newPrices = [55.2, 71.2, 49.2, 36.2];

       for (var id=9;id<=12;id++) {
         var selectThis = "[data-product='" + id + "']";
         var oldPrice = $(selectThis).previousElementSibling;
         oldPrice.classList.add("slash-price");
         oldPrice.textContent = "$" + slashedPrices[id-9];
         
          var newPrice = document.createElement("span");
          newPrice.classList.add("price");
          newPrice.textContent = "New Price: $" + newPrices[id-9];
          oldPrice.parentNode.insertBefore(newPrice, oldPrice.nextSibling);
       }
    }
  }

  var cart = new Cart();
  var cart_view = new Cart_View();

  document.addEventListener('DOMContentLoaded', function () {
    if ($('body').classList.contains("product1")){
      cart_view.renderSingleProduct();
      
      $("#addtocart").addEventListener("click", function (ev) {
        if (ev.target.classList.contains("btn-cart")) {
          var id = ev.target.dataset.product;
          cart.addItem(id);
          cart_view.renderSingleProduct();
        }
      });
    } else if ($('body').classList.contains("products")) {
      cart_view.renderCatalog();
      cart_view.slashPrices();
      
      $("#catalog").addEventListener("click", function (ev) {
        if (ev.target.classList.contains("btn-cart")) {
          var id = ev.target.dataset.product;
          cart.addItem(id);
          cart_view.renderCatalog();
          cart_view.slashPrices();
        }
      });
    }
  });

})();
