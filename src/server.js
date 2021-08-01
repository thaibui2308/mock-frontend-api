import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
  Factory,
  trait
} from "miragejs";

export default function () {
  createServer({
    serializers: {
      produt: RestSerializer.extend({
        include: ["category"],
        embed: true
      })
    },
    // Our data model, similar to a collection in MongoDB
    models: {
      product: Model.extend({
        category: belongsTo()
      }),
      category: Model.extend({
        product: hasMany()
      })
    },

    factories: {
      product: Factory.extend({
        imgs() {
          let arr = [];
          arr.push("https://s1.uphinh.org/2021/06/22/b482fcceee771b294266.jpg");
          arr.push("https://s1.uphinh.org/2021/06/22/DAC.jpg");
          arr.push("https://s1.uphinh.org/2021/06/22/headphone.jpg");
          arr.push("https://uphinh.org/image/9XaUNN");
          arr.push("https://uphinh.org/image/9XaWf1");
          arr.push("https://uphinh.org/image/9XaRAZ");
          arr.push("https://uphinh.org/image/9XawDb");
          arr.push("https://uphinh.org/image/9XaAnD");

          return arr;
        },
        attribute(i) {
          let obj = {
            name: `Test product ${i}`,
            oldPrice: 19090000,
            price: 14990000,
            new: 70,
            status: "Còn hàng",
            shipFee: 0,
            tag: {
              hot: false,
              freeShip: true,
              sale: true
            },
            categoryID: 1
          };
          return obj;
        },
        info() {
          let obj = {
            description: [
              {
                title: "series",
                content: "NA"
              },
              {
                title: "tình trạng sản phẩm",
                content: "chúng tôi đã kiểm tra và dùng thử không có vấn đề gì"
              },
              {
                title: "đánh giá",
                content:
                  "Chiếc tai nghe này có chất âm trong trẻo mặc dù thiên thướng là nhưng rất cân bằng ở các dải âm khác"
              },
              {
                title: "ghi chú",
                content: "Sản phẩm đã mua không thể hoàn lại tiền"
              }
            ],
            specification:
              "When you run this code, you’ll be given a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements. We’ll discuss why it’s important in the next section.",
            guarantee:
              "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:"
          };
          return obj;
        },
        createdAt(i) {
          return i;
        },
        updatedAt(i) {
          return i;
        }
      }),
      category: Factory.extend({
        name(i) {
          return `Category ${i}`;
        },

        withProductsIncluded: trait({
          afterCreate(category, server) {
            server.createList("product", 5, { category });
          }
        })
      })
    },

    seeds(server) {
      server.create("list", {
        name: "Cáp",
        products: [server.create("product", 1)]
      });

      server.create("category", "withProductsIncluded");
    },
    routes() {
      // Mock GET request
      this.get("/api/products", (schema) => {
        return schema.products.all();
      });

      // Mock POST request
      this.post("/api/products", (schema, request) => {
        let obj = JSON.parse(request.requestBody);

        return schema.products.create(obj);
      });

      // Mock DELETE request
      this.delete("/api/products/:productId", (schema, request) => {
        let id = request.params.productId;

        return schema.products.find(id).destroy();
      });

      // Mock GET request for a wishlist and its associated products
      this.get("/api/category/:id/products", (schema, request) => {
        let categoryId = request.params.id;
        let list = schema.categorys.find(categoryId);

        return list.products;
      });
    }
  });
}
