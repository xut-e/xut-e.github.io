---
layout: apunte
title: "2. HTML"
---

Las páginas web son creadas, principalmente, usando:

- HTML, para construir webs y definir su estructura.
- CSS, para hacer que las webs se vean bonitas añadiendo opciones de estilos.
- JavaScript, implementa funciones complejas usando la interactividad.

HyperText Markup Language (HTML) es el lenguaje en el que se escriben las páginas. Los elemenos o etiquetas (tags) son los bloques que construyen las páginas. Un código sencillo:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Page Title</title>
	</head>
	<body>
		<h1>Ejemplo de Cabecera</h1>
		<p>Ejemplo de párrafo.</p>
	</body>
</html>
```

La estructura HTML consta de los siguientes componentes:

- El encabezado `<!DOCTYPE html>` indica que la página es un documento html5.
- La etiqueta `<html>` es el elemento raíz de la página HTML.
- La etiqueta `<head>` contiene información sobre la página, como el título.
- La etiqueta `<body>` define el cuerpo principal ldel documento HTML. Sólo lo que está dentro del cuerpo se muestra en el buscador.
- La etiqueta `<h1>` es el encabezado más grande. Existen hasta el `<h6>`.
- La etiqueta `<p>` define un párrafo.
- Hay más elementos para diferentes finalidades como `<button>`, `<img>` o `<form>`.

Las etiquetas contienen atributos como *class* que sirve para cambiar el color por ejemplo `<p class="bold-text">` o el atributo *src* para especificar localización del enlace (usado en fotos) `img src="img/cat.jpg">`. Un elemento puede tener varios atributos: `<p atributo1="valor1" atributo2="valor2">`.

Los elementos también pueden tener un atributo id `<p id="ejemplo">`, el cual es único para cada elemento. Al contrario que el atributo clase, el cual puede pertenecer el mismo a varios elementos. Estos id's son usados para los estilos y para que JavaScript identifique los elementos.

