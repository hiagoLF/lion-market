import { Factory, Model, createServer, Response } from "miragejs";
import faker from "faker/locale/pt_BR";

type LoginRequestBody = {
  login?: string;
  password?: string;
};

type Product = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at: string;
};

const testToken = "IDFDF89N23OFFCSDJFSDF009F8F9G9DF8GSds";

export function makeFakeServer() {
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
          return faker.commerce.productName();
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
      // this.timing = 2000;

      this.namespace = "/api";

      this.get("/product", (schema, request) => {
        const token = request.requestHeaders.token as String;
        if (token.split(" ")[1] !== testToken) {
          return new Response(401, {}, { error: "Incorrect token" });
        }
        const products = this.schema
          .all("product")
          .sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
        const title = request.queryParams.title;

        if (title && title !== "") {
          products.models.sort((a, b) => {
            if (a.title.includes(title) && b.title.includes(title)) {
              if (a.title.length > b.title.length) {
                return -1;
              }
              if (a.title.length < b.title.length) {
                return 1;
              }
              return 0;
            }
            if (a.title.includes(title)) return -1;
            if (b.title.includes(title)) return 1;
            return 0;
          });
        }

        const page = Number(request.queryParams.page);
        const dataToSentd = {
          pagination: {
            currentPage: page,
            pagesNumber: Math.ceil(products.length / 10),
          },
          data: products.models.slice(10 * page - 10, 10 * page),
        };
        return new Response(200, {}, dataToSentd);
      });

      this.delete("/product/:productId", (schema, request) => {
        const token = request.requestHeaders.token as String;
        if (token.split(" ")[1] !== testToken) {
          return new Response(401, {}, { error: "Incorrect token" });
        }
        const { productId } = request.params;
        this.schema.where("product", { id: productId }).destroy();
        return new Response(200);
      });

      this.get("/product/:productId", (schema, request) => {
        const token = request.requestHeaders.token as String;
        if (token.split(" ")[1] !== testToken) {
          return new Response(401, {}, { error: "Incorrect token" });
        }
        const { productId } = request.params;
        const product = this.schema.find("product", productId);
        if (!product) return new Response(404);
        return product;
      });

      this.post("/product", (schema, request) => {
        const token = request.requestHeaders.token as String;
        if (token.split(" ")[1] !== testToken) {
          return new Response(401, {}, { error: "Incorrect token" });
        }
        const data = JSON.parse(request.requestBody);
        const resp = schema.create("product", { ...data });
        return { id: resp.id };
      });

      this.put("/product/image/:productId", (schema, request) => {
        const token = request.requestHeaders.token as String;
        if (token.split(" ")[1] !== testToken) {
          return new Response(401, {}, { error: "Incorrect token" });
        }
        const { productId } = request.params;
        const product = this.schema.find("product", productId);
        if (!product) {
          return new Response(404);
        }
        product.update({
          imageUrl: faker.image.food(),
        });
        return new Response(200);
      });

      this.patch("/product/:productId", (schema, request) => {
        const token = request.requestHeaders.token as String;
        if (token.split(" ")[1] !== testToken) {
          return new Response(401, {}, { error: "Incorrect token" });
        }
        const data = JSON.parse(request.requestBody);
        const { productId } = request.params;
        const product = this.schema.find("product", productId);
        if (!product) {
          return new Response(404);
        }
        product.update({
          ...data,
        });
        return new Response(200);
      });

      this.post("/user/login", (schema, request) => {
        const { login, password } = JSON.parse(
          request.requestBody
        ) as LoginRequestBody;
        if (login !== "admin")
          return new Response(404, {}, { error: "user not found" });
        if (password !== "admin")
          return new Response(404, {}, { error: "wrong password" });
        return { token: testToken };
      });

      this.passthrough();
    },
  });
}
