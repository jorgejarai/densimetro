# ¿Ya se robaron otro denísmetro nuclear?

Esta es una pequeña *app* que lleva cuenta de cuántos días han pasado desde el último robo de un densímetro nuclear en Chile. La página está disponible actualmente en [densimetro.jorgejarai.xyz](https://densimetro.jorgejarai.xyz). Mi plan es eventualmente crear un *bot* de Twitter que publique a diario el número de días que han pasado desde el último robo, pero considerando la situación de Twitter no sé si voy a poder hacerlo.

El funcionamiento de la *app* es bastante simple, por lo que podría ser fácilmente replicada para otros propósitos si alguien lo desea.

## ¿Cómo funciona?

El *frontend* está basado en Next.js y Tailwind CSS, mientras que el *backend* utiiza Redis para almacenar el historial de fechas. La aplicación completa opera con TypeScript y cuenta con configuración para ser publicada con Docker.

La página muestra el número de días desde el último robo y el récord actual desde que se comenzó a llevar la cuenta.

## ¿Cómo puedo correr la aplicación?

Para probar la aplicación localmente, se debe primero instalar las dependencias con `yarn` y luego correr el servidor de desarrollo con `yarn dev`. Para correr la aplicación en un contenedor de Docker, se debe primero construir la imagen con `docker build -t densimetro .` y luego correr el contenedor con `docker run -p 3000:3000 densimetro`, publicando la *app* en el puerto 3000. El proyecto también cuenta con un archivo `docker-compose.yml` para facilitar el despliegue de la *app* y la base de datos.

La aplicación espera encontrar una URL a la base de datos Redis en `REDIS_URL`. Si no se provee, se utilizará `redis://localhost:6379` por defecto.

## Poblando la base de datos

Inicialmente, la base de datos no cuenta con ningún dato, por lo que es necesario poblarlo con fechas. Existen dos formas: acceder a la base de datos manualmente y agregando las fechas a la lista `densimetro:dates` (por defecto; se puede cambiar la llave modificando la variable de entorno `REDIS_DATES_KEY`) o utilizar el *endpoint* `/api/update`, la cual espera una petición POST conteniendo un JSON con la fecha a añadir y una contraseña:

```json
{
  "date": "2023-01-01",
  "password": "..."
}
```

La contraseña se provee a la aplicación mediante la variable de entorno `PASSWORD_HASH`, la cual debe ser un *hash* de la contraseña en formato bcrypt. Esta no es para nada la implementación más segura, pero es suficiente para evitar que cualquiera pueda modificar la base de datos.

Una forma de generar el *hash* de una contraseña es utilizando la biblioteca `bcrypt` de Python:

```python
import bcrypt

password = "..."

print(bcrypt.hashpw(password.encode(), bcrypt.gensalt()))
```

Al momento de definir `PASSWORD_HASH` en algún archivo `.env`, es importante escapar los `$` para que no sean interpretados como variables de entorno. Así, un *hash* válido sería:

```bash
PASSWORD_HASH="\$2b\$12\$..."
```
