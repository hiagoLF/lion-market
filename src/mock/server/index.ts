import { Factory, Model, createServer, Response } from "miragejs";
import faker from "faker";

type LoginRequestBody = {
  login?: string;
  password?: string;
};

type Product = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  created_at: string;
};

// @ts-ignore
if (window.server) {
  // @ts-ignore
  server.shutdown();
}

// @ts-ignore
window.server = createServer({
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
        return faker.image.image();
      },
      created_at() {
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
        data: products.models.slice(10 * page - 10, 10 * page),
      };
      return new Response(200, {}, dataToSentd);
    });

    this.post("/login", (schema, request) => {
      const { login, password } = JSON.parse(
        request.requestBody
      ) as LoginRequestBody;
      if (login !== "admin")
        return new Response(404, {}, { error: "user not found" });
      if (password !== "admin")
        return new Response(404, {}, { error: "wrong password" });
      return { token: "IDFDF89N23OSDJFSDF009F8F9G9DF8GS" };
    });

    // this.namespace = "";
    this.passthrough();
  },
});
