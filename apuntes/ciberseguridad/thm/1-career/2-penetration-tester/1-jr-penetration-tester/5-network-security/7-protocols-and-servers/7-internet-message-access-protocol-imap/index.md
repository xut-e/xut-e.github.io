---
layout: apunte
title: "7. Internet Message Access Protocol (IMAP)"
---

Internet Message Access Protocol (IMAP) es una forma más sofisticada que POP3 para ver los correos ya que permite sincronizar la bandeja de entrada a lo largo de múltiples dispositivos.

Para iniciar sesión usamos `LOGIN username password`. IMAP requiere que cada comando vaya precedido de una string random para llevar un control de la respuesta. Por esto hemos añadido `c1` y `c2` abajo. Después listamos los mensajes con `LIST "" "*"` antes de comprobar los mensajes con `EXAMINE INBOX`. El puerto por defecto de IMAP es el 143.

```shell
pentester@TryHackMe$ telnet 10.80.185.10 143
Trying 10.80.185.10...
Connected to 10.80.185.10.
Escape character is '^]'.
* OK [CAPABILITY IMAP4rev1 UIDPLUS CHILDREN NAMESPACE THREAD=ORDEREDSUBJECT THREAD=REFERENCES SORT QUOTA IDLE ACL ACL2=UNION STARTTLS ENABLE UTF8=ACCEPT] Courier-IMAP ready. Copyright 1998-2018 Double Precision, Inc.  See COPYING for distribution information.
c1 LOGIN frank D2xc9CgD
* OK [ALERT] Filesystem notification initialization error -- contact your mail administrator (check for configuration errors with the FAM/Gamin library)
c1 OK LOGIN Ok.
c2 LIST "" "*"
* LIST (\HasNoChildren) "." "INBOX.Trash"
* LIST (\HasNoChildren) "." "INBOX.Drafts"
* LIST (\HasNoChildren) "." "INBOX.Templates"
* LIST (\HasNoChildren) "." "INBOX.Sent"
* LIST (\Unmarked \HasChildren) "." "INBOX"
c2 OK LIST completed
c3 EXAMINE INBOX
* FLAGS (\Draft \Answered \Flagged \Deleted \Seen \Recent)
* OK [PERMANENTFLAGS ()] No permanent flags permitted
* 0 EXISTS
* 0 RECENT
* OK [UIDVALIDITY 631694851] Ok
* OK [MYRIGHTS "acdilrsw"] ACL
c3 OK [READ-ONLY] Ok
c4 LOGOUT
* BYE Courier-IMAP server shutting down
c4 OK LOGOUT completed
Connection closed by foreign host.
```

IMAP también manda las comunicaciones en texto plano por lo que cualquier persona analizando la red podrá verlo.

