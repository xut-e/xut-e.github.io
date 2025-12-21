---
layout: apunte
title: "2. Finding the Flags"
---

1. Vamos a realizar enumeración.
	1. Primero de puertos.
	   !**Pasted image 20251220235400.png**
	2. Ahora un escaneo de esos puertos abiertos.
	   !**Pasted image 20251220235502.png**
	3. Ahora directorios.
	   !**Pasted image 20251221000515.png**
2. Ahora vamos a la web.
	1. La página principal.
	   !**Pasted image 20251221000618.png**
	   !**Pasted image 20251221001103.png**
	   Vemos algo sobre los romanos. ¿Puede estarse refiriendo a cifrado César?
	2. En `/admin`.
	   !**Pasted image 20251221001152.png**
	3. En `/aboutus` parece que hay una posible lista de usuarios.
	   !**Pasted image 20251221001343.png**
3. Vamos a investigar `/admin`, parece lo más prometedor.
	1. Si abrimos Burp Suite y capturamos una petición errónea.
	   !**Pasted image 20251221001624.png**
	2. Vamos  a mandarlo al repetidor.
	   !**Pasted image 20251221001703.png**
	3. Vamos a probar a capturar la respuesta del servidor.
	   !**Pasted image 20251221002421.png**
	4. Cambiamos la respuesta a `Correct credentials`, le damos a "Forward", quitamos el "Intercept" y conseguimos una clave privada.
	   !**Pasted image 20251221002813.png**
4. Ahora nos guardamos la clave privada, le cambiamos los permisos a `600` y la usamos con `-i` para entrar por ssh.
   
5. No podemos porque está encriptada. Vamos a desencriptarla para crackearla. Para ello necesitamos primero convertirla a un formato que `john` entienda. Para ello usamos `ssh2john`.
   !**Pasted image 20251221003948.png**
6. Iniciamos sesión como `james`.
   !**Pasted image 20251221004358.png**
7. Encontramos `user.txt`.
   !**Pasted image 20251221004427.png**
8. No podemos hacer `sudo -l` por lo que nos ponemos a mirar más y encontramos `.overpass`.
   !**Pasted image 20251221005535.png**
9. Si le preguntamos a Gemini si reconoce este tipo de cifrado nos dice que es ROT47.
   !**Pasted image 20251221005717.png**
10. Si se lo damos a CyberChef.
    !**Pasted image 20251221005946.png**
11. No hemos encontrado nada que hacer con ese usuario y contraseña de momento por lo que seguimos mirando. Ahora `/etc/crontab`.
    !**Pasted image 20251221010618.png**
    Parece que root carga un script desde internet si conseguimos modificarlo tenemos acceso.
12. Vamos a mirar a quien le pertenece `/etc/hosts`.
    !**Pasted image 20251221010922.png**
    Parece que todos pueden escribir. Vamos a cambiar la redirección a nuestra propia máquina.
13. Creamos un script que mande una reverse shell a nuestra máquina y lo servimos.
    !**Pasted image 20251221012235.png**
    !**Pasted image 20251221012251.png**
    Es importante hacerlo en el puerto 80 porque `curl` manda la petición al puerto 80.
14. Nos ponemos en escucha por el puerto que hemos puesto en el script.
    !**Pasted image 20251221011236.png**
15. Modificamos el `/etc/hosts` para que ponga `192.168.128.94    overpass.thm` nos llega la conexión.
    !**Pasted image 20251221011937.png**
16. Y obtenemos la flag de root.
    !**Pasted image 20251221011956.png**

>[!SUCCESS] Por fin hemos conseguido las dos flags!! Que máquina más divertida :)

