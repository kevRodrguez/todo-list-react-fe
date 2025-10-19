# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# --- Build args que llegará desde Dokploy ---
ARG VITE_STAGE
ARG VITE_API_URL
ARG VITE_PUBLIC_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Conviértelos en ENV para que Vite los vea en el proceso de build
ENV VITE_STAGE=$VITE_STAGE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_PUBLIC_API_URL=$VITE_PUBLIC_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
# --------------------------------------------

RUN npm run build   # Vite leerá import.meta.env.* desde estas ENV

# Etapa runtime
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]