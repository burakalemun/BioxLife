import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    databaseDriverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },

    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "./src/modules/fragrance",
    },
    {
      resolve: "./src/modules/unit",
    },
    {
      resolve: "./src/modules/wishlist",
    },
    {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/iyzico",
            id: "iyzico",
            options: {
              apiKey: process.env.IYZICO_API_KEY,
              secretKey: process.env.IYZICO_SECRET_KEY,
              baseUrl: process.env.IYZICO_BASE_URL,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@ridoy_sarker/medusa-cloudinary/providers/cloudinary",
            id: "cloudinary",
            options: {
              cloudName: process.env.CLOUDINARY_CLOUD_NAME,
              apiKey: process.env.CLOUDINARY_API_KEY,
              apiSecret: process.env.CLOUDINARY_API_SECRET,
              secure: true,
            },
          },
        ],
      },
    },
  ],
})
