# Usamos una imagen ligera de Nginx como servidor web
FROM nginx:alpine

# Eliminamos el contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos todos los archivos de la aplicación dentro del contenedor
COPY . /usr/share/nginx/html

# Exponemos el puerto 80 para acceder a la aplicación
EXPOSE 80

# Ejecutamos Nginx como servicio principal
CMD ["nginx", "-g", "daemon off;"]
