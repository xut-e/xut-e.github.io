---
layout: apunte
title: "2. Getting the Flags"
---

<h2>Reconocimiento Inicial</h2>
Comenzamos escaneando los puertos abiertos.

!**Pasted image 20260921192605.png**

Ahora vamos a escanear dichos puertos más a fondo.

!**Pasted image 20260921192614.png**

Vamos a escanear posibles directorios.

!**Pasted image 20260921192552.png**

Ahora vamos a ver cómo es la página web.

!**Pasted image 20260921192541.png**

--------------------
<h2>Profundización</h2>
Vamos a ver qué hay en ese directorio que parece interesante.

!**Pasted image 20260921192744.png**

Vamos a analizar la subida de información con BurpSuite. 

------------------------------
<h2>Explotación</h2>
<h3>SQL Injection</h3>
No podemos encontrar aparentemente nada, por lo que empezamos a probar ataques, funcionando a la primera de cambio con una SQLi.

!**Pasted image 20260921193310.png**

Y de esta manera conseguimos acceso como el primer usuario registrado en la DB.

!**Pasted image 20260921193621.png**

En esta imagen vemos cosas curiosas: 
Usuarios:
- `jmartin`
- `netops`
Y algunas entradas curiosas con comandos como `whoami`. Además podemos observar cuatro segmentos de red y algunos servicios activos. Vamos a investigar más a fondo.

Si nos vamos a la sección de `Host Health`, podemos ver un formulario que manda pings junto a algunas notas de uso. 

!**Pasted image 20260921193853.png**

Vamos a ver si podemos conseguir un ping en nuestra máquina, lo que indicaría un posible SSRF. 

<h3>Command Injection</h3>
No lo hemos conseguido, pero probamos a ver si podemos inyectar comandos. Para ello interceptamos la petición con BurpSuite y escribimos un comando sencillo.

!**Pasted image 20260922090012.png**

Parece que existe inyección de comandos. Pues vamos a seguir investigando. Al comando `ls` el sistema responde con lo siguiente. Vamos a leer dichos archivos.

!**Pasted image 20260922090148.png**

Si miramos a ver de qué se trata `app.py` nos encontramos con lo siguiente:

```python
#!/usr/bin/env python3
import os
import re
import sqlite3
import subprocess
import hashlib
from functools import wraps
from flask import (
    Flask, request, render_template, redirect,
    url_for, session, g
)

app = Flask(__name__)
app.secret_key = os.environ.get(&#34;FLASK_SECRET&#34;)
if not app.secret_key:
    raise RuntimeError(&#34;FLASK_SECRET environment variable not set&#34;)

DATABASE = &#34;/opt/netops/netops.db&#34;


def get_db():
    db = getattr(g, &#34;_database&#34;, None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_db(exc):
    db = getattr(g, &#34;_database&#34;, None)
    if db is not None:
        db.close()


def init_db():
    db = sqlite3.connect(DATABASE)
    db.execute(&#34;&#34;&#34;
        CREATE TABLE IF NOT EXISTS users (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role     TEXT NOT NULL DEFAULT &#39;viewer&#39;
        )
    &#34;&#34;&#34;)
    db.execute(&#34;&#34;&#34;
        CREATE TABLE IF NOT EXISTS audit_log (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            action   TEXT,
            detail   TEXT,
            ts       TEXT
        )
    &#34;&#34;&#34;)
    pw = hashlib.md5(b&#34;C0rp$N3tS3cur3!&#34;).hexdigest()
    db.execute(
        &#34;INSERT OR IGNORE INTO users (username, password, role) VALUES (?,?,?)&#34;,
        (&#34;netops&#34;, pw, &#34;operator&#34;)
    )
    db.commit()
    db.close()


def log_action(username, action, detail=&#34;&#34;):
        pass


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get(&#34;user&#34;):
            return redirect(url_for(&#34;login&#34;))
        return f(*args, **kwargs)
    return decorated


# need to modify this filter.
BLOCK_RE = re.compile(
    r&#34;(union\s+select|drop\s+table|insert\s+into|xp_cmdshell)&#34;,
    re.IGNORECASE
)

FAKE_AUDIT = [
    (&#34;jmartin&#34;,  &#34;LOGIN_OK&#34;,     &#34;&#34;,           &#34;2026-01-14 08:03:11&#34;),
    (&#34;jmartin&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.1.4&#34;,   &#34;2026-01-14 08:04:02&#34;),
    (&#34;jmartin&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.1.7&#34;,   &#34;2026-01-14 08:04:28&#34;),
    (&#34;jmartin&#34;,  &#34;LOGOUT&#34;,       &#34;&#34;,           &#34;2026-01-14 08:31:55&#34;),
    (&#34;netops&#34;,   &#34;LOGIN_OK&#34;,     &#34;&#34;,           &#34;2026-01-14 09:17:40&#34;),
    (&#34;netops&#34;,   &#34;HEALTH_CHECK&#34;, &#34;10.0.0.1&#34;,   &#34;2026-01-14 09:18:03&#34;),
    (&#34;netops&#34;,   &#34;HEALTH_CHECK&#34;, &#34;10.0.2.12&#34;,  &#34;2026-01-14 09:19:47&#34;),
    (&#34;netops&#34;,   &#34;LOGOUT&#34;,       &#34;&#34;,           &#34;2026-01-14 09:44:22&#34;),
    (&#34;svc-mon&#34;,  &#34;LOGIN_OK&#34;,     &#34;&#34;,           &#34;2026-01-14 10:00:01&#34;),
    (&#34;svc-mon&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.1.1&#34;,   &#34;2026-01-14 10:00:04&#34;),
    (&#34;svc-mon&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.1.2&#34;,   &#34;2026-01-14 10:00:07&#34;),
    (&#34;svc-mon&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.1.3&#34;,   &#34;2026-01-14 10:00:10&#34;),
    (&#34;svc-mon&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.1.4&#34;,   &#34;2026-01-14 10:00:13&#34;),
    (&#34;svc-mon&#34;,  &#34;LOGOUT&#34;,       &#34;&#34;,           &#34;2026-01-14 10:00:16&#34;),
    (&#34;jmartin&#34;,  &#34;LOGIN_FAIL&#34;,   &#34;&#34;,           &#34;2026-01-14 11:02:38&#34;),
    (&#34;jmartin&#34;,  &#34;LOGIN_OK&#34;,     &#34;&#34;,           &#34;2026-01-14 11:02:51&#34;),
    (&#34;jmartin&#34;,  &#34;HEALTH_CHECK&#34;, &#34;10.0.2.5&#34;,   &#34;2026-01-14 11:03:14&#34;),
    (&#34;jmartin&#34;,  &#34;LOGOUT&#34;,       &#34;&#34;,           &#34;2026-01-14 11:28:07&#34;),
    (&#34;netops&#34;,   &#34;LOGIN_OK&#34;,     &#34;&#34;,           &#34;2026-01-15 07:55:30&#34;),
    (&#34;netops&#34;,   &#34;HEALTH_CHECK&#34;, &#34;10.0.0.254&#34;, &#34;2026-01-15 07:56:01&#34;),
]


@app.route(&#34;/&#34;)
def index():
    return render_template(&#34;index.html&#34;)


@app.route(&#34;/internal&#34;, methods=[&#34;GET&#34;, &#34;POST&#34;])
def login():
    error = None

    if request.method == &#34;POST&#34;:
        username = request.form.get(&#34;username&#34;, &#34;&#34;)
        password = request.form.get(&#34;password&#34;, &#34;&#34;)

        if BLOCK_RE.search(username) or BLOCK_RE.search(password):
            log_action(username, &#34;LOGIN_BLOCKED&#34;)
            error = &#34;Invalid username or password.&#34;
        else:
            pw_hash = hashlib.md5(password.encode()).hexdigest()
            # Vulnerable: direct string interpolation — no parameterisation
            query = (
                &#34;SELECT id, username, role FROM users &#34;
                &#34;WHERE username = &#39;%s&#39; AND password = &#39;%s&#39;&#34;
            ) % (username, pw_hash)

            try:
                db = get_db()
                row = db.execute(query).fetchone()
                if row:
                    session[&#34;user&#34;] = row[&#34;username&#34;]
                    session[&#34;role&#34;] = row[&#34;role&#34;]
                    log_action(row[&#34;username&#34;], &#34;LOGIN_OK&#34;)
                    return redirect(url_for(&#34;dashboard&#34;))
                else:
                    error = &#34;Invalid username or password.&#34;
                    log_action(username, &#34;LOGIN_FAIL&#34;)
            except Exception:
                error = &#34;Invalid username or password.&#34;
                log_action(username, &#34;LOGIN_ERROR&#34;)

    return render_template(&#34;login.html&#34;, error=error)


@app.route(&#34;/internal/dashboard&#34;)
@login_required
def dashboard():
    db = get_db()
    real_logs = db.execute(
        &#34;SELECT username, action, detail, ts FROM audit_log &#34;
        &#34;ORDER BY ts DESC LIMIT 8&#34;
    ).fetchall()

    combined = [(r[&#34;username&#34;], r[&#34;action&#34;], r[&#34;detail&#34;], r[&#34;ts&#34;])
                for r in real_logs]
    combined += list(FAKE_AUDIT)

    return render_template(
        &#34;dashboard.html&#34;,
        current_user=session[&#34;user&#34;],
        role=session[&#34;role&#34;],
        logs=combined
    )


# vulnerable to newline injection (\n / %0a), fix soon.
PING_BLOCK_RE = re.compile(r&#34;[;|`$&amp;]&#34;)


@app.route(&#34;/internal/health&#34;, methods=[&#34;GET&#34;, &#34;POST&#34;])
@login_required
def health_check():
    output  = None
    cmd_err = None
    target  = &#34;&#34;

    if request.method == &#34;POST&#34;:
        target = request.form.get(&#34;target&#34;, &#34;&#34;).strip()

        if not target:
            cmd_err = &#34;No target specified.&#34;
        elif len(target) &gt; 100:
            cmd_err = &#34;Invalid hostname or IP address.&#34;
        elif PING_BLOCK_RE.search(target):
            cmd_err = &#34;Invalid hostname or IP address.&#34;
        else:
            try:
                proc = subprocess.Popen(
                    &#34;ping -c 2 -W 1 &#34; + target,
                    shell=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    text=True
                )
                try:
                    output, _ = proc.communicate(timeout=8)
                except subprocess.TimeoutExpired:
                    proc.stdout.close()
                    output = &#34;[process running in background]&#34;

                log_action(session[&#34;user&#34;], &#34;HEALTH_CHECK&#34;,
                           target.split(&#34;\n&#34;)[0])
            except Exception:
                cmd_err = &#34;An error occurred.&#34;

    return render_template(
        &#34;health.html&#34;,
        current_user=session[&#34;user&#34;],
        role=session[&#34;role&#34;],
        output=output,
        error=cmd_err,
        target=target
    )


@app.route(&#34;/internal/logout&#34;)
def logout():
    user = session.get(&#34;user&#34;, &#34;unknown&#34;)
    session.clear()
    log_action(user, &#34;LOGOUT&#34;)
    return redirect(url_for(&#34;login&#34;))


@app.errorhandler(404)
def not_found(e):
    return render_template(&#34;404.html&#34;), 404


@app.errorhandler(403)
def forbidden(e):
    return render_template(&#34;404.html&#34;), 403


if __name__ == &#34;__main__&#34;:
    init_db()
    app.run(host=&#34;0.0.0.0&#34;, port=5050, debug=False)
```

Aquí podemos ver el código de funcinamiento de la app, y que realmente los logs están hardcodeados. Vamos a leer el archivo de configuración `secret.config`:

```config
# netops application config
# generated: 2026-01-03

[database]
path    = /opt/netops/netops.db
timeout = 5

[app]
host     = 0.0.0.0
port     = 5050
log_path = /var/log/netops/app.log

[auth]
session_lifetime = 1800

# service account used by the backup agent
# TODO: migrate to secrets manager before Q2 audit
[backup_agent]
run_as   = sysadmin
password = [REDACTED]

[smtp]
host = 127.0.0.1
port = 25
from = noc-alerts@corp.internal
```

Vamos a intentar descargar `netops.db`. Para ello abrimos un servidor en la máquina remota.

!**Pasted image 20260922091008.png**

Y descargamos en la local el archivo en cuestión:

!**Pasted image 20260922091053.png**

Ahora vamos a abrirlo con `sqlitebrowser`.

!**Pasted image 20260922091212.png**

No hay nada interesante, pues ya habíamos conseguido entrar mediante una SQLi. Vamos a ver si las credenciales obtenidas en el archivo de configuración sirven para entrar por SSH.

!**Pasted image 20260922091408.png**

Bingo. Vamos a buscar la primera flag.

!**Pasted image 20260922091437.png**


----------------------------------
<h2>Escalada de Privilegios</h2>
Ahora toca escalar privilegios. Vamos a comenzar mirando `id`.

!**Pasted image 20260922091508.png**

Y ahora nuestra lista principal de escalada. Ninguna de las técnicas ha funcionado, por lo que vamos a investigar el sistema. Si nos fijamos en el directorio que vimos, había un directorio llamado `backups/`. Vamos a ver qué contiene.

!**Pasted image 20260922092046.png**

Parece que es una copia de credenciales confidenciales.

!**Pasted image 20260922092132.png**

Vamos a intentar leerlo. Para poder hacerlo necesitamos software compatible con KDBX. Vamos a descargarnos el archivo en nuestra máquina y a leerlo.

!**Pasted image 20260922092559.png**

Parece que necesitamos una contraseña. Vamos a intentar crackearlo.

!**Pasted image 20260922092919.png**

Parece que johntheripper no está del todo actualizado. Buscamos otra herramienta que poder usar.

!**Pasted image 20260922093349.png**

Y con esto parece que hemos obtenido la contraseña de root.

!**Pasted image 20260922093538.png**

En efecto, con esto hemos obtenido la flag de root también.

>[!SUCCESS] Hemos conseguido obtener ambas flags.

