.. meta::
    :title: HTTP Запросы/Ответы на PHP
    :description: HTTP клиент на PHP
    :tags: PHP, socket, HTTP

PHP
===

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ php http_get.php

Простой ``GET`` запрос с использованием стандартной функции
`stream_socket_client
<http://php.net/manual/ru/function.stream-socket-client.php>`_:

.. code-block:: php
    :caption: http_get.php

    <?php

    $fp = stream_socket_client(
      "tcp://www.medium.com:80",
      $errno,
      $errstr,
      30
    );  // Инициализируем сокет соединение

    if (!$fp) {
      echo "$errstr ($errno)<br />\n";  // Если соединение не установлено
    } else {
      fwrite(
        $fp,
        "GET / HTTP/1.1\r\nHost: www.medium.com\r\nAccept: */*\r\n\r\n"
      );    // Отправляем наш запрос

      while (!feof($fp)) {
        echo fgets($fp, 1024);  // Выводим ответ
      }

      fclose($fp);  // Закрываем соединение
    }

    ?>

Ответ на наш запрос:

.. code-block:: text

    // Редирект на https://medium.com/
    HTTP/1.1 301 Moved Permanently
    Date: Fri, 29 Sep 2017 13:00:21 GMT
    // В теле ответа содержится html
    Content-Type: text/html
    Content-Length: 178
    // Для общения между клиентом и сервером устанавливается keep-alive соединение
    Connection: keep-alive
    Set-Cookie: __cfduid=d80724583d932338e3ba55295d95bb6c91506690021; expires=Sat, 29-Sep-18 13:00:21 GMT; path=/; domain=.medium.com; HttpOnly
    Location: https://medium.com/
    X-Content-Type-Options: nosniff
    // Информация о сервере
    Server: cloudflare-nginx
    CF-RAY: 3a5f1ff8b4cc762a-ARN

    // Тело ответа с информацией о перенаправлении
    <html>
    <head><title>301 Moved Permanently</title></head>
    <body bgcolor="white">
    <center><h1>301 Moved Permanently</h1></center>
    <hr><center>nginx</center>
    </body>
    </html>

Результатом работы кода на `PHP` является запрос на сервер и полученный от него
ответ. В теле ответа содержится запрашиваемая html страница с информацией о
перенаправлении.

`PHP` реализует как низкоуровневый, так и более доступный для использования
интерфейс к функциям связи между сокетами, основанными на популярных сокетах
BSD, обеспечивая возможность действовать и как сокет-сервер, и как сокет-клиент.
