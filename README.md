# 🚗 Pico y Placa - Frontend

Aplicación web desarrollada en **Angular 21.2.0** para validar la circulación vehicular según la normativa de Pico y Placa.

Esta aplicación consume una API REST desarrollada en Spring Boot y desplegada en Render.

---

##  Información del Proyecto

- Nombre: pico-placa
- Package Manager: npm 11.6.2
- Arquitectura: Standalone Components
- Deploy: Netlify

---

##  Tecnologías y Versiones

###  Core
- Angular 21.2.0
- TypeScript 5.9.2
- RxJS 7.8.0
- Node Types 20.17.19

###  UI
- PrimeNG 21.1.1
- PrimeIcons 7.0.0
- @primeuix/themes 2.0.3
- TailwindCSS 4.2.1
- tailwindcss-primeui 0.6.1

## 🌐 Deploy en Producción

Frontend disponible en:

    https://pico-placa-jzm.netlify.app/

Backend conectado a:

    https://pico-placa-api-ipgk.onrender.com/api/pico-placa

---

##  Funcionalidades

- Validación de placa con máscara
- Selección de fecha y hora (formato 24h)
- Resultado dinámico con estado visual (Permitido / Restringido)
- Toast de confirmación de consulta exitosa
- Historial de consultas
- Eliminación individual
- Modal para confirmación de la elimincación de un registro
- Tabla con paginación
- Interfaz moderna y responsiva

---

##  Arquitectura

Estructura basada en features

##  Ejecutar Localmente

1. Clonar repositorio:

git clone https://github.com/JorgeZumbaMorales/pico-placa.git

2. Instalar dependencias:

npm install

3. Ejecutar en desarrollo:

npm start

Disponible en:

http://localhost:4200
