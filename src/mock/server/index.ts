import { createServer, Factory, Model, Server } from "miragejs";
import faker from "faker";

type Product = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  created_at: string;
};

export function startFakeServer() {
  const server = new Server({
    models: {
      product: Model.extend<Partial<Product>>({}),
    },

    factories: {
      product: Factory.extend({
        title(index: number) {
          return `Produto ${index + 1}`;
        },
        description() {
          return faker.lorem.sentence(30);
        },
        price() {
          return faker.commerce.price(100, 1000);
        },
        imageUrl() {
          return faker.image.imageUrl();
        },
        createdAt() {
          return faker.date.recent(30);
        },
      }),
    },

    seeds(server) {
      server.createList("product", 300);
    },

    routes() {
      this.timing = 2000;

      this.namespace = "/api";

      this.get("/products/:page", (schema, request) => {
        const products = this.schema.all("product");
        const page = Number(request.params.page);
        const dataToSentd = {
          pagination: {
            currentPage: page,
            pagesNumber: Math.ceil(products.length / 10),
          },
          data: products.models.slice(10 * (page - 1), 10 * (page - 1) - 10),
        };

        console.log(page * 10 - 10 - 1, page * 10);

        return dataToSentd;
      });

      this.namespace = "api";
      this.passthrough();
    },
  });

  return server;
}
