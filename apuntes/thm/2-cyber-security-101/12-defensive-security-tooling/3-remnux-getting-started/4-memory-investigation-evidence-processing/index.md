---
layout: apunte
title: "4. Memory Investigation - Evidence Processing"
---

Una de las prácticas investigativas más comunes en la forénsica digital es el pre-procesado de evidencia. Esto incluye ejecutar herramientas y guardar los resultados en texto o JSON. El analista normalmente confía en herramientas como Volatility al lidiar con imágenes de memoria como evidencia. Esta herramienta ya está incluida en REMnux. Los comandos de volatility se ejecutan para identificar y extraer artefactos específicos de las imágenes de memoria.

----------------------------
<h2>Pre-procesado con Volatility</h2>
En esta tarea usaremos la versión de la herramienta Volatility 3. Sin embargo, no iremos muy profundo en la parte de análisis de resultados. Queremos que te familiarices un poco con la herramienta. Ejecuta el comando como se dice y espera el resultado. Cada plugin toma entre 2-3 minutos para mostrar el output.

Aquí hay algunos de los parámetros o plugins que usaremos. Nos enfocaremos en plugins de Windows.

En la máquina REMnux, `sudo su` y luego navega hasta `/home/ubuntu/Desktop/tasks/Wcry_memory_image/` y nuestro archivo será **wcry.mem**. Correremos cada plugin después del comando `vol3 -f wcry.mem`.

----------------------------
<h2>PsTree</h2>
Este plugin procesa en un árbol basado en los procesos padres:

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.pstree.PsTree
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished

PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime	ExitTime

4	0	System	0x823c8830	51	244	N/A	False	N/A	N/A
* 348	4	smss.exe	0x82169020	3	19	N/A	False	2017-05-12 21:21:55.000000 	N/A
** 620	348	winlogon.exe	0x8216e020	23	536	0	False	2017-05-12 21:22:01.000000 	N/A
*** 664	620	services.exe	0x821937f0	15	265	0	False	2017-05-12 21:22:01.000000 	N/A
**** 1024	664	svchost.exe	0x821af7e8	79	1366	0	False	2017-05-12 21:22:03.000000 	N/A
***** 1768	1024	wuauclt.exe	0x81f747c0	7	132	0	False	2017-05-12 21:22:52.000000 	N/A
***** 1168	1024	wscntfy.exe	0x81fea8a0	1	37	0	False	2017-05-12 21:22:56.000000 	N/A
**** 1152	664	svchost.exe	0x821bea78	10	173	0	False	2017-05-12 21:22:06.000000 	N/A
**** 544	664	alg.exe	0x82010020	6	101	0	False	2017-05-12 21:22:55.000000 	N/A
**** 836	664	svchost.exe	0x8221a2c0	19	211	0	False	2017-05-12 21:22:02.000000 	N/A
**** 260	664	svchost.exe	0x81fb95d8	5	105	0	False	2017-05-12 21:22:18.000000 	N/A
**** 904	664	svchost.exe	0x821b5230	9	227	0	False	2017-05-12 21:22:03.000000 	N/A
**** 1484	664	spoolsv.exe	0x821e2da0	14	124	0	False	2017-05-12 21:22:09.000000 	N/A
**** 1084	664	svchost.exe	0x8203b7a8	6	72	0	False	2017-05-12 21:22:03.000000 	N/A
*** 676	620	lsass.exe	0x82191658	23	353	0	False	2017-05-12 21:22:01.000000 	N/A
** 596	348	csrss.exe	0x82161da0	12	352	0	False	2017-05-12 21:22:00.000000 	N/A
1636	1608	explorer.exe	0x821d9da0	11	331	0	False	2017-05-12 21:22:10.000000 	N/A
* 1956	1636	ctfmon.exe	0x82231da0	1	86	0	False	2017-05-12 21:22:14.000000 	N/A
* 1940	1636	tasksche.exe	0x82218da0	7	51	0	False	2017-05-12 21:22:14.000000 	N/A
** 740	1940	@WanaDecryptor@	0x81fde308	2	70	0	False	2017-05-12 21:22:22.000000 	N/A
```

----------------------------
<h2>PsList</h2>
Este plugin se usa para listar todos los procesos actualmente activos en la máquina.

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.pslist.PsList
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished

PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime	ExitTime	File output

4	0	System	0x823c8830	51	244	N/A	False	N/A	N/A	Disabled
348	4	smss.exe	0x82169020	3	19	N/A	False	2017-05-12 21:21:55.000000 	N/A	Disabled
596	348	csrss.exe	0x82161da0	12	352	0	False	2017-05-12 21:22:00.000000 	N/A	Disabled
620	348	winlogon.exe	0x8216e020	23	536	0	False	2017-05-12 21:22:01.000000 	N/A	Disabled
664	620	services.exe	0x821937f0	15	265	0	False	2017-05-12 21:22:01.000000 	N/A	Disabled
676	620	lsass.exe	0x82191658	23	353	0	False	2017-05-12 21:22:01.000000 	N/A	Disabled
836	664	svchost.exe	0x8221a2c0	19	211	0	False	2017-05-12 21:22:02.000000 	N/A	Disabled
904	664	svchost.exe	0x821b5230	9	227	0	False	2017-05-12 21:22:03.000000 	N/A	Disabled
1024	664	svchost.exe	0x821af7e8	79	1366	0	False	2017-05-12 21:22:03.000000 	N/A	Disabled
1084	664	svchost.exe	0x8203b7a8	6	72	0	False	2017-05-12 21:22:03.000000 	N/A	Disabled
1152	664	svchost.exe	0x821bea78	10	173	0	False	2017-05-12 21:22:06.000000 	N/A	Disabled
1484	664	spoolsv.exe	0x821e2da0	14	124	0	False	2017-05-12 21:22:09.000000 	N/A	Disabled
1636	1608	explorer.exe	0x821d9da0	11	331	0	False	2017-05-12 21:22:10.000000 	N/A	Disabled
1940	1636	tasksche.exe	0x82218da0	7	51	0	False	2017-05-12 21:22:14.000000 	N/A	Disabled
1956	1636	ctfmon.exe	0x82231da0	1	86	0	False	2017-05-12 21:22:14.000000 	N/A	Disabled
260	664	svchost.exe	0x81fb95d8	5	105	0	False	2017-05-12 21:22:18.000000 	N/A	Disabled
740	1940	@WanaDecryptor@	0x81fde308	2	70	0	False	2017-05-12 21:22:22.000000 	N/A	Disabled
1768	1024	wuauclt.exe	0x81f747c0	7	132	0	False	2017-05-12 21:22:52.000000 	N/A	Disabled
544	664	alg.exe	0x82010020	6	101	0	False	2017-05-12 21:22:55.000000 	N/A	Disabled
1168	1024	wscntfy.exe	0x81fea8a0	1	37	0	False	2017-05-12 21:22:56.000000 	N/A	Disabled
```

---------------------------
<h2>CmdLine</h2>
Este plugin se usa para listar argumentos de procesos de linea de comandos.

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.cmdline.CmdLine
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished

PID	Process	Args

4	System	Required memory at 0x10 is not valid (process exited?)
348	smss.exe	\SystemRoot\System32\smss.exe
596	csrss.exe	C:\WINDOWS\system32\csrss.exe ObjectDirectory=\Windows SharedSection=1024,3072,512 Windows=On SubSystemType=Windows ServerDll=basesrv,1 ServerDll=winsrv:UserServerDllInitialization,3 ServerDll=winsrv:ConServerDllInitialization,2 ProfileControl=Off MaxRequestThreads=16
620	winlogon.exe	winlogon.exe
664	services.exe	C:\WINDOWS\system32\services.exe
676	lsass.exe	C:\WINDOWS\system32\lsass.exe
836	svchost.exe	C:\WINDOWS\system32\svchost -k DcomLaunch
904	svchost.exe	C:\WINDOWS\system32\svchost -k rpcss
1024	svchost.exe	C:\WINDOWS\System32\svchost.exe -k netsvcs
1084	svchost.exe	C:\WINDOWS\system32\svchost.exe -k NetworkService
1152	svchost.exe	C:\WINDOWS\system32\svchost.exe -k LocalService
1484	spoolsv.exe	C:\WINDOWS\system32\spoolsv.exe
1636	explorer.exe	C:\WINDOWS\Explorer.EXE
1940	tasksche.exe	"C:\Intel\ivecuqmanpnirkt615\tasksche.exe" 
1956	ctfmon.exe	"C:\WINDOWS\system32\ctfmon.exe" 
260	svchost.exe	C:\WINDOWS\system32\svchost.exe -k LocalService
740	@WanaDecryptor@	@WanaDecryptor@.exe
1768	wuauclt.exe	"C:\WINDOWS\system32\wuauclt.exe" /RunStoreAsComServer Local\[400]SUSDS81a6658cb72fa845814e75cca9a42bf2
544	alg.exe	C:\WINDOWS\System32\alg.exe
1168	wscntfy.exe	C:\WINDOWS\system32\wscntfy.exe
```

------------------------------------
<h2>FileScan</h2>
Este plugin escanea objetos en una imagen de memoria particular. Los resultados tienen más de 1400 líneas, pongo sólo un ejemplo del output.

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.filescan.FileScan
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished

Offset	Name	Size
0x1f40310	\Endpoint	112
0x1f65718	\Endpoint	112
0x1f66cd8	\WINDOWS\system32\wbem\wmipcima.dll	112
0x1f67198	\WINDOWS\Prefetch\TASKDL.EXE-01687054.pf	112
0x1f67a70	\WINDOWS\system32\security.dll	112
0x1f67c68	\boot.ini	112
0x1f67ef8	\WINDOWS\system32\cfgmgr32.dll	112
0x1f684d0	\WINDOWS\system32\wbem\framedyn.dll	112
0x1f686d8	\WINDOWS\system32\wbem\cimwin32.dll	112
0x1f6a7f0	\WINDOWS\system32\kmddsp.tsp	112
0x1f6ae20	\$Directory	112
0x1f6b9b0	\$Directory	112
0x1f6bbf8	\$Directory	112
```

---------------------------
<h2>DllList</h2>
Este plugin lista los módulos cargados en una imagen de memoria particular de Windows. Debido a limitación de texto, no podemos ver el resultado aquí.

```powershell
oot@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.dlllist.DllList
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished
```

-------------------------------------
<h2>PsScan</h2>
Este plugin se usa para escanear procesos presentes en imagenes de memorias Windows particulares.

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.psscan.PsScan
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished

PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime	ExitTime	File output
860	1940	taskdl.exe	0x1f4daf0	0	-	0	False	2017-05-12 21:26:23.000000 	2017-05-12 21:26:23.000000 	Disabled
536	1940	taskse.exe	0x1f53d18	0	-	0	False	2017-05-12 21:26:22.000000 	2017-05-12 21:26:23.000000 	Disabled
424	1940	@WanaDecryptor@	0x1f69b50	0	-	0	False	2017-05-12 21:25:52.000000 	2017-05-12 21:25:53.000000 	Disabled
1768	1024	wuauclt.exe	0x1f747c0	7	132	0	False	2017-05-12 21:22:52.000000 	N/A	Disabled
576	1940	@WanaDecryptor@	0x1f8ba58	0	-	0	False	2017-05-12 21:26:22.000000 	2017-05-12 21:26:23.000000 	Disabled
260	664	svchost.exe	0x1fb95d8	5	105	0	False	2017-05-12 21:22:18.000000 	N/A	Disabled
740	1940	@WanaDecryptor@	0x1fde308	2	70	0	False	2017-05-12 21:22:22.000000 	N/A	Disabled
1168	1024	wscntfy.exe	0x1fea8a0	1	37	0	False	2017-05-12 21:22:56.000000 	N/A	Disabled
544	664	alg.exe	0x2010020	6	101	0	False	2017-05-12 21:22:55.000000 	N/A	Disabled
1084	664	svchost.exe	0x203b7a8	6	72	0	False	2017-05-12 21:22:03.000000 	N/A	Disabled
596	348	csrss.exe	0x2161da0	12	352	0	False	2017-05-12 21:22:00.000000 	N/A	Disabled
348	4	smss.exe	0x2169020	3	19	N/A	False	2017-05-12 21:21:55.000000 	N/A	Disabled
620	348	winlogon.exe	0x216e020	23	536	0	False	2017-05-12 21:22:01.000000 	N/A	Disabled
676	620	lsass.exe	0x2191658	23	353	0	False	2017-05-12 21:22:01.000000 	N/A	Disabled
664	620	services.exe	0x21937f0	15	265	0	False	2017-05-12 21:22:01.000000 	N/A	Disabled
1024	664	svchost.exe	0x21af7e8	79	1366	0	False	2017-05-12 21:22:03.000000 	N/A	Disabled
904	664	svchost.exe	0x21b5230	9	227	0	False	2017-05-12 21:22:03.000000 	N/A	Disabled
1152	664	svchost.exe	0x21bea78	10	173	0	False	2017-05-12 21:22:06.000000 	N/A	Disabled
1636	1608	explorer.exe	0x21d9da0	11	331	0	False	2017-05-12 21:22:10.000000 	N/A	Disabled
1484	664	spoolsv.exe	0x21e2da0	14	124	0	False	2017-05-12 21:22:09.000000 	N/A	Disabled
1940	1636	tasksche.exe	0x2218da0	7	51	0	False	2017-05-12 21:22:14.000000 	N/A	Disabled
836	664	svchost.exe	0x221a2c0	19	211	0	False	2017-05-12 21:22:02.000000 	N/A	Disabled
1956	1636	ctfmon.exe	0x2231da0	1	86	0	False	2017-05-12 21:22:14.000000 	N/A	Disabled
4	0	System	0x23c8830	51	244	N/A	False	N/A	N/A	Disabled
```

-------------------------------------
<h2>Malfind</h2>
Este plugin se usa para listar rangos de procesos de memoria que potencialmente tienen código inyectado. No habrá resultados por limitaciones de texto.

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ vol3 -f wcry.mem windows.malfind.Malfind
Volatility 3 Framework 2.0.0
Progress:  100.00		PDB scanning finished
```

Para más información respecto a plugins consulta este [link](https://volatility3.readthedocs.io/en/stable/volatility3.plugins.html).

Pero ahora los tienes uno por uno, ¿cómo procesamos esto en bloque? La respuesta es haciendo un bucle y metiendo los logs en archivos:

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ for plugin in windows.malfind.Malfind windows.psscan.PsScan windows.pstree.PsTree windows.pslist.PsList windows.cmdline.CmdLine windows.filescan.FileScan windows.dlllist.DllList; do vol3 -q -f wcry.mem $plugin > wcry.$plugin.txt; done
```

Veamos el comando:

- Creamos una variable `$plugin` con los valores de cada plugin.
- Entonces el comando `vol3` corre el parámetro `-q`, que significa modo silencioso.
- El parámetro `-f` hace que lea de la captura de memoria.
- La parte `plugin > wcry.$plugin.txt; done;` hace que volatility corra con los plugins y meta el resultado en un archivo con el nombre del plugin.
Después de ejecutar el comando nos encontraremos con esto:

![](/apuntes/img/Pasted image 20251029200952.png)

-------------------------------
<h2>Pre-procesado con Strings</h2>
Después, pre-procesaremos la imagen de memoria con las utilidades de strings de Linux. Extraeremos las cadenas: ASCII, 16-bit little-endian, y 16-bit big-endian. Con los siguientes comandos:

```powershell
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ strings wcry.mem > wcry.strings.ascii.txt
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ strings -e l  wcry.mem > wcry.strings.unicode_little_endian.txt
root@10.10.134.94:/home/ubuntu/Desktop/tasks/Wcry_memory_image$ strings -e b  wcry.mem > wcry.strings.unicode_big_endian.txt
```

Los comandos strings extraen texto ASCII legible. La opción `-e l` le dice a la string que extraiga 16-bit little endian. Mientras que la opción `-e b` le dice que extraiga las strings 16-bit  big endian.