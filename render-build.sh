#!/usr/bin/env bash
# exit on error
set -0 errexit
npm install 
npm run build
npx prisma generate 
npx prisma migrate deploy