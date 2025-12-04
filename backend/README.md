# 📦 Flask Patología -- Docker

Este proyecto contiene una aplicación Flask empacada dentro de un
contenedor Docker. A continuación se describen los pasos necesarios para
construir y ejecutar la imagen localmente.

## 🚀 Requisitos previos

Asegúrate de tener instalado:

-   **Docker** (versión 20+ recomendada)

## 🛠️ Construcción de la imagen

Ejecuta el siguiente comando en la raíz del proyecto (donde está ubicado
el `Dockerfile`):

``` bash
docker build -t flask-patologia .
```

Este comando:

-   Construye la imagen Docker.
-   Asigna el nombre (tag) **flask-patologia** a la imagen.

## ▶️ Ejecución del contenedor

Para iniciar la aplicación Flask dentro de Docker, ejecuta:

``` bash
docker run -d -p 5000:5000 flask-patologia
```

Este comando:

-   Inicia el contenedor en segundo plano (`-d`).
-   Expone el puerto **5000** del contenedor en el puerto **5000** de tu
    máquina.
-   Ejecuta la imagen **flask-patologia** que construiste anteriormente.

## 🌐 Acceder a la aplicación

Una vez ejecutado el contenedor, puedes acceder a la API o aplicación
Flask en:

    http://localhost:5000

## 🛑 Detener el contenedor

Lista los contenedores activos:

``` bash
docker ps
```

Detén el contenedor (reemplaza `<CONTAINER_ID>`):

``` bash
docker stop <CONTAINER_ID>
```
