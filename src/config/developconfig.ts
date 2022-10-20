import { registerAs } from "@nestjs/config"

export default registerAs ('develop', () => ({
        appPort: parseInt(process.env.APP_PORT, 10),
        corsOrigin: process.env.CORS_ORIGIN
    })
)