# FUDO Challenge
## Antes de correrlo
Correr:
```
npm install
```

## Como correrlo (dev)
Para correr ambos devservers juntos simplemente correr:
```
npm run dev
```
Tambien se pueden correr los dev servers por separado con:
```
npm run dev # En api
npm run serve # En webapp 
```
## Como correrlo (prod)
Correr 
```
npm run build
```
esto dejara una carpeta dist en el directorio actual

Para construir las partes por separado se puede correr:
```
npm run build # En api
npm run build # En webapp 
```
Luego es necesario copiar la carpeta ```dist``` de ```webapp``` a la carpeta ```dist``` de ```api``` cambiandole el nombre a ```public```
