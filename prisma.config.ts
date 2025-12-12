
import 'dotenv/config'; 

import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // Now process.env.DATABASE_URL will be properly loaded from your .env file
    url: process.env.DATABASE_URL!, 
    // Since you removed shadowDatabaseUrl from here, your setup is now simpler
    // If you want to use it for development, you must add it back here:
    // shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL!,
  },
});