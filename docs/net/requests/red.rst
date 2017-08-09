.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTTP Запросы/Ответы на Red-lang
    :description: HTTP клиент на Red при помощи read и http-tool.
    :tags: Red, Red-lang, HTTP

Red lang
--------

.. seealso::

    * http://www.red-lang.org/
    * https://github.com/red/red
    * `<https://ru.wikipedia.org/wiki/Red_(язык_программирования)>`_

``Red`` удивительный язык программирования, помимо своей функциональной
природы, он способен охватить полный стек разработки от высокоуровневых
программ с GUI-интерфейсом до низкоуровневого программирования операционных
систем и драйверов.

read
^^^^

Создать GET запрос на ``Red`` очень просто, достаточно вызвать встроенную
функцию ``read``.

.. code-block:: bash

    $ ./red-063
    --== Red 0.6.3 ==--
    Type HELP for starting information.

    >> help read
    USAGE:
         READ source

    DESCRIPTION:
         Reads from a file, URL, or other port.
         READ is an action! value.

    ARGUMENTS:
         source       [file! url!]

    REFINEMENTS:
         /part        => Partial read a given number of units (source relative).
            length       [number!]
         /seek        => Read from a specific position (source relative).
            index        [number!]
         /binary      => Preserves contents exactly.
         /lines       => Convert to block of strings.
         /info        =>
         /as          => Read with the specified encoding, default is 'UTF-8.
            encoding     [word!]

    >>

Примеры запросов к сервису http://httpbin.org

.. code-block:: bash

    $ ./red-063
    --== Red 0.6.3 ==--
    Type HELP for starting information.

    >> print read http://httpbin.org/ip
    {
      "origin": "82.168.221.111"
    }

    >> print read http://httpbin.org/user-agent
    {
      "user-agent": null
    }

    >>

http-tool
^^^^^^^^^

.. note::

    `http-tools
    <https://github.com/rebolek/red-tools/blob/master/http-tools.red>`_ -
    модуль для отправки HTTP запросов

Для более сложных запросов можно воспользоваться модулем `http-tools
<https://github.com/rebolek/red-tools/blob/master/http-tools.red>`_.

.. code-block:: red
    :caption: requests.red

    Red []

    #include %red-tools/http-tools.red
    print send-request/raw/with
      http://httpbin.org/user-agent
      'GET [User-Agent: "Mozilla/Gecko/IE 1.2.3"]

В результате получим заголовок ``User-Agent`` который мы указали в запросе.

.. code-block:: bash
    :caption: ./red-063 requests.red

    $ ./red-063 requests.red

    200 Connection: "keep-alive"
    Server: "meinheld/0.6.1"
    Date: "Tue, 01 Aug 2017 07:27:47 GMT"
    Content-Type: "application/json"
    Access-Control-Allow-Origin: "*"
    Access-Control-Allow-Credentials: "true"
    X-Powered-By: "Flask"
    X-Processed-Time: "0.000529050827026"
    Content-Length: "45"
    Via: "1.1 vegur" {
      "user-agent": "Mozilla/Gecko/IE 1.2.3"
    }
