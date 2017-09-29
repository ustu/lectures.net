.. meta::
    :title: HTTP Запросы/Ответы на Common Lisp
    :description: HTTP клиент на Common Lisp
    :tags: Common Lisp, Lisp, socket, HTTP

Common Lisp
===========

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ clisp http_get.lisp

   Но есть некоторые нюансы. После установки `CLISP` необходимо скачать скрипт
   ``quicklisp``:

   .. code-block:: bash

       $ curl -O https://beta.quicklisp.org/quicklisp.lisp

   Установить этот скрипт:

   .. code-block:: bash

       $ clisp
       > (load "quicklisp.lisp")
       > (quicklisp-quickstart:install)

   После чего добавить в программу строчку ``(load "~/quicklisp/setup.lisp")``.

Простой ``GET`` запрос с использованием модуля `usocket
<https://github.com/usocket/usocket>`_:

.. code-block:: clisp
    :caption: http_get.lisp

    (load "~/quicklisp/setup.lisp")
    (ql:quickload "usocket") ;; Загрузка пакета для работы с сокетами

    (defun http-request (host port) ;; Функция, выполняющая http-запрос по хосту и порту
      (let ((sock (usocket:socket-connect host port))) ;; Создаем сокет
        (format (usocket:socket-stream sock) ;; Формируем и форматируем текст запроса
          "GET /index.html HTTP/1.1~%Host: httpbin.org~%Connection: close~%~%")
        (force-output (usocket:socket-stream sock)) ;; Отправляем запрос

        ;; Считываем ответ сервера в строку
        (do ((line
               (read-line (usocket:socket-stream sock) nil)
               (read-line (usocket:socket-stream sock) nil))
             (all ""))
          ((not line) all)
          (setf all (concatenate 'string all line '(#\Return #\Newline))))))

    ;; Делаем запрос и печатаем ответ
    (print (http-request "docs.gl" 80))

Ответ на наш запрос:

.. code-block:: bash

    $ clisp http_get.lisp
    To load "usocket":
      Install 2 Quicklisp releases:
        split-sequence usocket
    ; Fetching #<URL "http://beta.quicklisp.org/archive/split-sequence/2015-08-04/split-sequence-1.2.tgz">
    ; 3.83KB
    ==================================================
    3,919 bytes in 0.01 seconds (495.04KB/sec)
    ; Fetching #<URL "http://beta.quicklisp.org/archive/usocket/2016-10-31/usocket-0.7.0.1.tgz">
    ; 72.23KB
    ==================================================
    73,964 bytes in 0.13 seconds (572.88KB/sec)
    ; Loading "usocket"
    [package split-sequence]..........................
    [package usocket]....

    "HTTP/1.1 200 OK
    Server: nginx/1.1.19
    Date: Fri, 29 Sep 2017 14:20:21 GMT
    Content-Type: text/html
    Content-Length: 5082
    Last-Modified: Fri, 13 Dec 2013 04:04:32 GMT
    Connection: close
    Accept-Ranges: bytes

    <!doctype html>
    <!--[if lt IE 7 ]> <html class=\"no-js ie6\" lang=\"en\"> <![endif]-->
    <!--[if IE 7 ]>    <html class=\"no-js ie7\" lang=\"en\"> <![endif]-->
    <!--[if IE 8 ]>    <html class=\"no-js ie8\" lang=\"en\"> <![endif]-->
    <!--[if (gte IE 9)|!(IE)]><!--> <html class=\"no-js\" lang=\"en\"> <!--<![endif]-->
    <head>
      <meta charset=\"utf-8\">
      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">

      <title>5 for $5 Bundle</title>
      <meta name=\"description\" content=\"For the price of a convenience store sandwich, an old country music album, a DVD of a forgotten 80's movie star, or a pair of socks you get over $40 worth of endless indie fun.\">
      <meta name=\"author\" content=\"Jay Margalus\">

      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
      <link rel=\"shortcut icon\" href=\"/favicon.ico\">
      <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">

      <link rel=\"stylesheet\" href=\"css/style.css?v=2\">
      <script src=\"js/libs/modernizr-1.7.min.js\"></script>
      <script type=\"text/javascript\" src=\"https://apis.google.com/js/plusone.js\"></script>

    </head>

    <body>
    ...
