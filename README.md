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
esto creara una carpeta ```dist``` en el directorio ```api```

Para construir las partes por separado se puede correr:
```
npm run build # En api
npm run build # En webapp
```
Y luego copiar ```webapp/dist``` a ```api/dist/public```


Por ultimo correr:
```
npm start
```
