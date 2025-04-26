# UrbanMarket
Proyecto 

Este proyecto esta construido con [Next.js](https://nextjs.org/docs) y [Laravel 8](https://laravel.com/api/8.x/)
## Requerimientos
Estos son los Requerimientos para trabajar con el Proyecto, asi como el orden para instalarlos.
- Un servidor PHP y MySQL, [Wamp](https://sourceforge.net/projects/wampserver/)(Recomendado) o Xampp
- La version especifica de PHP 7.4.22([Aqui para Wamp](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x64_addon_php7.4.22.exe/download))
- [Node JS](https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi)
- [Composer](https://getcomposer.org/Composer-Setup.exe)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)(Package Manager de NodeJs)
- Algún editor de texto o IDE, [Visual Studio Code](https://code.visualstudio.com/download) es recomendado

### Instalacion de Wamp
Simplemente es instalar el ejecutable y seguir los pasos. Para instalar  la version especifica solo es descargar la version especifica e instalarla.
### Instalacion de NodeJs
Simplemente es instalar el ejecutable y seguir los pasos.
### Instalacion de Composer
Es necesario tener antes el Wamp o el Xammp instalados, tambien es instalar el ejecutable y seguir los pasos.
### Instalacion de Yarn
Una vez nos aseguramos que tenemos el Node JS instalado, es necesario ejecutar el siguiente comando:
```
npm install --global yarn
```
Luego, si al usar yarn tenemos algún error, debemos abrir el powershell como **administrador** e introducir el siguiente comando:
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```
## Ejecucion del Proyecto
Una vez clonado el proyecto, debemos abrir visual studio code y abrir la carpeta del proyecto.
Tenemos dos carpetas para el proyecto:
- **Backend**: Esta carpeta contiene el proyecto de Laravel
- **Frontend**: Esta carpeta contiene el proyecto de Next.js
  
Es necesario saber identificar que el directorio en el que estas es el correcto, antes de Ejecutar los comandos.
Lo recomendable es que tengas dos terminales abiertas, una para el Backend y otra para el Frontend.
Los comandos para navegar entre directorios son:
```
cd <nombre de la carpeta> (para entrar al directorio seleccionado) 
cd .. (para salir del directorio actual e ir atrás)
```
### Ejecucion del Backend


Primero, dentro de la carpeta backend, ejecutamos el siguiente comando:
```
composer install
```

Luego, debemos configurar adecuadamente el archivo .env, para ello, debemos copiar el archivo .env.example y renombrarlo a .env. Normalmente ya deberia poseer todo para correr, lo unico que falta seria la APP_KEY, para ello, ejecutamos el siguiente comando:
```
php artisan key:generate
```
Luego, debemos crear la base de datos, para ello, abrimos el Wamp y nos dirigimos a la opcion de phpMyAdmin, una vez dentro, creamos una base de datos con el nombre que queramos, pero debemos asegurarnos que el nombre de la base de datos sea el mismo que el que pusimos en el archivo .env en la variable DB_DATABASE.


Esto instalará todas las dependencias necesarias para el proyecto.
Luego ejecutamos el siguiente comando:
```
php artisan migrate
```
Esto creará las tablas necesarias para el proyecto, y cada vez que se haga un cambio en las tablas, se debe ejecutar este comando para que se actualicen los cambios.
Si todo esta bien, ejecutamos el siguiente comando:
```
php artisan serve
```
Esto iniciará el servidor de Laravel, y si todo esta bien, deberiamos poder acceder a la pagina de inicio de Laravel, que es la que aparecera en la consola.

### Ejecucion del Frontend
Dentro de la carpeta frontend, ejecutamos el siguiente comando:
```
yarn install
```
Esto instalará todas las dependencias necesarias para el proyecto.
Tambien es necesario crear un archivo llamado .env.development, que contendrá lo siguiente:
```
NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000/api
```
Luego ejecutamos el siguiente comando:
```
yarn run dev
```
Esto iniciará el servidor de Next.js, y si todo esta bien, deberiamos poder acceder a la pagina de inicio de Next.js, que es la que aparecera en la consola, además de ver un Hello World, el cual se obtiene del proyecto del backend.

