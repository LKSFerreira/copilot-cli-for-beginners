# Aplicación de colección de libros

*(Este README es intencionalmente básico para que puedas mejorarlo con GitHub Copilot CLI)*

Una aplicación de consola en C# para gestionar libros que tienes o quieres leer.
Puede añadir, eliminar y listar libros. También marcarlos como leídos.

---

## Características actuales

* Lee libros desde un archivo JSON (nuestra base de datos)
* La validación de entradas es débil en algunas áreas
* Existen algunas pruebas pero probablemente no son suficientes

---

## Archivos

* `Program.cs` - Punto de entrada principal del CLI
* `Models/Book.cs` - Clase del modelo Book
* `Services/BookCollection.cs` - Clase BookCollection con la lógica de datos
* `data.json` - Datos de ejemplo de libros
* `Tests/BookCollectionTests.cs` - Pruebas xUnit

---

## Ejecutar la aplicación

```bash
dotnet run -- list
dotnet run -- add
dotnet run -- find
dotnet run -- remove
dotnet run -- help
```

## Ejecutar pruebas

```bash
cd Tests
dotnet test
```

---

## Notas

* No apto para producción (obviamente)
* Parte del código podría mejorarse
* Podrían añadirse más comandos más adelante

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->