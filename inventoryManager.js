class Item {
    constructor(name) {
        this.name = name;
        this.discriptions = [];
    }
    
    addItem(price, qty, amountSold) {
        this.items.push(new Item(price, qty, amountSold));
    }
}

class Discripton {
    constructor(){
        this.qty = qty;
        this.price = price;
        this.amountSold = amountSold;
    }
}

class ItemService {
    static url = "http://crudcrud.com/api/d4cd6184ffd74f848e28ac8657748f1b/unicorns";

    static getAllItems() {
        return $.get(this.url);
    }

    static getItem(id) {
        return $.get(this.url + `/${id}`);
    }

    static createItem(item) {
        return $.post(this.url, item);
    }

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

    static render(items) {
      this.items = items;
      $(`#app`).empty();
      for (let item of items) {
          $(`app`).prepend(
              `<div id="${item._id}" class="card">
                <div class ="card-header">
                <h2>${item.name}</h2>
                </div>
                `
          );
      }  
    }
}

DOMManager.getAllItems()