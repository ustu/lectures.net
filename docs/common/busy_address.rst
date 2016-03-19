.. _addressinuse:

Что делать когда возникает ошибка "Address already in use"
==========================================================

.. seealso::

    * http://hea-www.harvard.edu/~fine/Tech/addrinuse.html
    * http://www.cyberciti.biz/faq/what-process-has-open-linux-port/

Не закрытые соединения занимают порт, даже после завершения программы.
Обычно операционная система закрывает их сама по таймауту.
Рассмотрим варианты как это сделать вручную.

Netstat
-------

:man:`netstat` показывает сетевую активность системы.
Из списка всех сетевых сервисов мы можем отфильтровать интересующий нас:

.. code-block:: bash

   $ sudo netstat -tulpn | grep :8080
   tcp   0    0 127.0.0.1:8080     0.0.0.0:*     LISTEN      11778/python

Номер процесса, который занимает порт, 11778.
Уничтожим его принудительно:

.. code-block:: bash

   $ sudo kill -9 11778

Дополнительную информацию о процессе можно получить из директории ``/proc``:

.. code-block:: bash

   $ ls /proc/11778/

fuser
-----

Утилита :man:`fuser` ищет номер процесса по порту:

.. code-block:: bash

    $ fuser 8080/tcp
    8080/tcp:            11778

Флаг ``-k`` уничтожит процесс:

.. code-block:: bash

   $ fuser -k 8080/tcp
   8080/tcp:            11778

lsof
----

:man:`lsof` - показывает все процессы связанные с файловыми дескрипторами.
Флаг ``-i`` позволяет фильтровать сетевые сокеты:

.. code-block:: bash

    $ lsof -i :8080
    COMMAND   PID     USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
    python  11778 uralbash    7u  IPv4 5754939      0t0  TCP localhost:http-alt (LISTEN)
