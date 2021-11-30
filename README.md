# GTI-3A-Backend

## Requisitos

1. Instalar [XAMPP](https://www.apachefriends.org/es/index.html)
2. Instalar [Node.js](https://nodejs.org/es/download/)

## Instalación
1. En el XAMPP, le das a Start a los servicios de Apache y MySQL
2. Cuando arranque MySQL, le das a admin y te redirigirá a *localhost/phpmyadmin*
3. Crea una nueva base de datos llamada *gti3a_sprint0*
4. Entras en esa base de datos, le das a Importar y buscas el fichero *gti3a_sprint0.sql*, que encontrarás en
> GTI-3A-Backend/src/bd
5. Una vez hecho todo esto, abres el terminal y te diriges a
> GTI-3A-Backend/src/api/logica
6. Ejecutas este comando
> npm install
7. Posteriormente, en otro terminal te diriges a
> GTI-3A-Backend/src/api/servidor
8. Ejecutas este comando
> npm install
9. Una vez acabe todo de instalarse, en este último terminal ejecutas
> npm run servidor
10. Si quieres hacer las pruebas, en el primer terminal ejecutas
> npm test
