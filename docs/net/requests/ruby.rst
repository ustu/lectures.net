.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTTP Запросы/Ответы на Ruby
    :description: HTTP клиент на Ruby
    :tags: Ruby, socket, HTTP

Ruby
====

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ ruby http_get.rb

Простой ``GET`` запрос с использованием стандартного модуля
`socket <https://ruby-doc.org/stdlib-2.4.2/libdoc/socket/rdoc/Socket.html>`_:

.. code-block:: ruby
    :caption: http_get.rb

    #!/usr/bin/ruby -w  # Путь до интерпретатора Ruby
    require 'socket'
     
    host = 'cosmoport.club'     # Космопорт <3
    port = 80                   # Порт сервера
    path = "/"                  # Запросим главную 

    request = "GET #{path} HTTP/1.0\r\n\r\n"    # HTTP запрос

    socket = TCPSocket.open(host, port)     # Устанавливаем TCP соединение
    socket.print(request)                   # Отправляем запрос по соединению
    response = socket.read                  # Читаем ответ

    headers, body = response.split("\r\n\r\n", 2) 
    puts headers
    puts "-----------------------"
    puts body 
