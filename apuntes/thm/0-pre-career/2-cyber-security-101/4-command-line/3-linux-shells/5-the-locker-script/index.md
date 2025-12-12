---
layout: apunte
title: "5. The Locker Script"
---

En la tarea anterior hemos estudiado variables, bucles, condicionales y comentarios.

--------------
<h2>Requerimiento</h2>
Un usuario tiene una taquilla en un banco. Para securizar la taquillas, tenemos que tener un script que verifique el usuario en primer lugar. Cuando el usuario introduzca su usuario, nombre de la compañía y PIn, debería dejarle acceder.

```bash
#!/bin/bash 

# Defining the variables
username=""
companyname=""
pin=""

# Defining the loop
for i in {1..3}; do
# Defining the conditional statements
        if [ "$i" -eq 1 ]; then
                echo "Enter your Username:"
                read username
        elif [ "$i" -eq 2 ]; then
                echo "Enter your Company name:"
                read companyname
        else
                echo "Enter your PIN:"
                read pin
        fi
done

# Checking if the user entered the correct details
if [ "$username" = "John" ] && [ "$companyname" = "Tryhackme" ] && [ "$pin" = "7385" ]; then
        echo "Authentication Successful. You can now access your locker, John."
else
        echo "Authentication Denied!!"
fi
```