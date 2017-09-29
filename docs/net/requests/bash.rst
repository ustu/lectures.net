.. meta::
    :title: HTTP Запросы/Ответы на Bash
    :description: HTTP клиент на Bash
    :tags: Bash, socket, HTTP, /dev/tcp

Bash
====

.. seealso::

    http://tldp.org/LDP/abs/html/devref1.html


Простой ``GET`` запрос с использованием стандартного устройства
``/dev/tcp/$host/$port``:

.. code-block:: bash
    :caption: http_get.sh

    #!/bin/bash

    server="it-monolit.ru"
    port=80

    exec 10<>/dev/tcp/${server}/${port} #открываем соединение
    echo -e "GET / HTTP/1.1\r\nhost: ${server}\r\nConnection: close\r\n\r\n" >&10 #тело запроса
    cat <&10

    exit $?

Ответ на наш запрос:

.. code-block:: bash

    $ . http_get.sh

    HTTP/1.1 200 OK
    Server: nginx/1.10.0 (Ubuntu)
    Date: Fri, 29 Sep 2017 16:19:53 GMT
    Content-Type: text/html; charset=utf-8
    Transfer-Encoding: chunked
    Connection: close
    X-Frame-Options: SAMEORIGIN
    Vary: Cookie
    Set-Cookie: csrftoken=Vc0kdssECaVGmduXvZ7Uu5rYzvQyIL9pqPmeGRQzkXsj8zen4a3eAkRgXXlBtCkf; expires=Fri, 28-Sep-2018 16:19:53 GMT; Max-Age=31449600; Path=/
    P3P: CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"
    Front-End-Https: on

    1eb0

    <html class="no-js" lang="ru">
        <head>
            <title> - It-monolit: компьютеры, и комплектующие.</title>
            ...
    </html>

Получен код ``200 OK`` и тело ответа, которое представляет собой страницу html.
