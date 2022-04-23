class Item {
    constructor(name, qty, price, amountSold) {
        this.name = name;
        this.qty = qty;
        this.price = price;
        this.amountSold = amountSold;
    }
    
    addItem(price, qty, amountSold) {
        this.items.push(new Item(price, qty, amountSold));
    }
}

class Discripton {
    constructor(qty, price, amountSold){
        this.qty = qty;
        this.price = price;
        this.amountSold = amountSold;
    }
}

class ItemService {
    static url = "https://crudcrud.com/api/7b9079c3c2324ae797f0d6d80264c8cc/unicorns";

    static getAllItems() {
        return $.get(this.url);
    }

    static getItem(id) {
        return $.get(this.url + `/${id}`);
    }

    static createItem(item) {
        return $.ajax({
        url: this.url,
        dataType: 'json',
        data: JSON.stringify(item),
        contentType: `application/json`,
        type: 'POST'
    })}

    static updateItem(item) {
        return $.ajax({
            url: this.url + `/${item._id}`,
            dataType: 'json',
            data: JSON.stringify(item),
            contentType: `application/json`,
            type: 'PUT'
        });
    }

    static deleteItem(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: "DELETE"
        })
    }
}

class DOMManager {
    static items;

    static getAllItems() {
        ItemService.getAllItems().then(items => this.render(items));
    }

    static createItem(name) {
       ItemService.createItem(new Item(name))
       .then(() => {
           return ItemService.getAllItems();
       })
       .then((items) => this.render(items));
    }

    static deleteItem(id) {
        ItemService.deleteItem(id)
        .then(() => {
            return ItemService.getAllItems();
        })
        .then((items) => this.render(items));
    }
    


    static render(items) {
      this.items = items;
      console.log(typeof(items),items)
      $(`#app`).empty();
      for (let item of items) {
          $(`app`).prepend(
              `<div id="${item._id}" class="card">
                <div class ="card-header">
                <h2>${item.name}</h2>
                <button class ="btn btn-danger" onclick="DOMManager.deleteItem('${item.id})">Delete</button>
                </div>
                <div class ="card-body">
                <div class="card">
                <div class="row">
                    <div class="col-sm">
                    <input type="number" id="${item._id}-discription-qty" class="form-control" placeholder="Price">
                    </div>
                    <div class="col-sm">
                    <input type="currency" id="${item._id}-discription-price" class="form-control" placeholder="Quantity">
                    </div>
                    <div class="col-sm">
                    <input type="number" id="${item._id}-discription-amountSold" class="form-control" placeholder="Amount Sold">
                    </div>
                  </div>
                </div>
              </div>
            </div>
                `
          );
          if (item.discription && item.discription.length >= 0)
          {for (let discription of item.discriptions) {
            $(`#${item._id}`).find('.card-body').append(
                `<p>
                <span id="amountof-${item._id}"><strong>Quantity: </strong> ${discription.qty}</span>
                
                <span id="amountof-${item._id}"><strong>Price: </strong> ${discription.price}</span>

                <span id="amountof-${item._id}"><strong>Amount sold: </strong> ${discription.amountSold}</span>

                <button class="btn btn-danger" onclick="DOMManager.deleteQuantity('${item._id}", "${discription._id}')">deleteQuantity</button>
                `
                );}
        }
    }
      }  
}

$("#create-new-item").on("click",() => {
    DOMManager.createItem($('#new-item-name').val());
    $('#new-item-name').val('');
});

DOMManager.getAllItems();


/// fix render items