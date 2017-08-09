.. meta::
    :title: HTTP Запросы/Ответы на Python
    :description: HTTP клиент на Python при помощи библиотек http.client,
                  urllib, urllib2, requests.
    :tags: Python, requests, http.client, urllib, urllib2, HTTP

Python
======

http.client
-----------

.. seealso::

    * https://docs.python.org/2/library/httplib.html
    * https://docs.python.org/3/library/http.client.html

:mod:`http.client` представляет собой простую обертку вокруг модуля
:mod:`socket`, которая обеспечивает наибольший контроль при обращении
к web-сайту.

Отправка ``GET`` запроса.

.. code-block:: python

   import http.client
   conn = http.client.HTTPConnection("lectureswww.readthedocs.org")
   conn.request("GET", "/ru/latest/")
   r1 = conn.getresponse()
   print(r1.status)

   data1 = r1.read()
   conn.request("GET", "/parrot.spam")
   r2 = conn.getresponse()
   print(r2.status)

   data2 = r2.read()
   conn.close()

.. code-block:: text

    200
    404

В переменных ``data1``, ``data2`` хранится тело ответа.

``POST`` запрос, с использованием модуля :mod:`urllib.parse` для
преобразования Python словаря в строку параметров для HTTP запроса:

.. code-block:: python

   import http.client
   import urllib.parse

   params = urllib.parse.urlencode(
       {'@number': 12524, '@type': 'issue', '@action': 'show'}
   )
   headers = {"Content-type": "application/x-www-form-urlencoded",
              "Accept": "text/plain"}
   conn = http.client.HTTPConnection("bugs.python.org")
   conn.request("POST", "", params, headers)
   response = conn.getresponse()
   print(response.status, response.reason)

   data = response.read()
   print(data)

   conn.close()

.. code-block:: text

    302 Found
    b'Redirecting to <a href="http://bugs.python.org/issue12524">http://bugs.python.org/issue12524</a>'

urllib
------

.. seealso::

    * `Лекции Р. Сузи
      <http://www.wiki.intuit.ru/wiki/Курсы/Язык_программирования_Python/Лекция_9:_Сетевые_приложения_на_Python>`_
    * https://docs.python.org/3/library/urllib.request.html
    * https://docs.python.org/3/howto/urllib2.html

.. code-block:: python

    import urllib.request
    doc = urllib.request.urlopen("http://lectureswww.readthedocs.org")
    print(doc.read()[:350])

.. code-block:: html

    <!DOCTYPE html>
    <!--[if IE 8]><html class="no-js lt-ie9" lang="en" > <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Основы Веб-программирования &mdash; Документ

Функция :func:`urllib.request.urlopen` создает файлоподобный объект,
который читается методом :meth:`~http.client.HTTPResponse.read`.
Другие методы этого объекта:
:meth:`~http.client.HTTPResponse.readline`,
:meth:`~http.client.HTTPResponse.readlines`,
:meth:`~http.client.HTTPResponse.fileno`,
:meth:`~http.client.HTTPResponse.close`,
работают как и у обычного файла, а также есть метод
:meth:`~http.client.HTTPResponse.info`, который возвращает
соответствующий полученному с сервера Message-объект.

Его можно использовать для получения дополнительной информации:

.. code-block:: python

    import urllib.request
    doc = urllib.request.urlopen("http://lectureswww.readthedocs.org")
    print(doc.info())

.. no-code-block:: python

    Server: nginx/1.4.6 (Ubuntu)
    X-Deity: chimera-lts
    Vary: Accept-Encoding
    X-Served: Nginx
    Content-Type: text/html
    Date: Thu, 05 Feb 2015 13:30:41 GMT
    Accept-Ranges: bytes
    ETag: "54c74bc0-62a2"
    Connection: close
    X-Subdomain-TryFiles: True
    Last-Modified: Tue, 27 Jan 2015 08:26:40 GMT
    Content-Length: 25250

С помощью функции :func:`urllib.request.urlopen` можно делать и более
сложные вещи, например, передавать web-серверу данные формы. Как
известно, данные заполненной web-формы могут быть переданы на
web-сервер с использованием метода GET или метода POST. Метод GET
связан с кодированием всех передаваемых параметров после знака "?" в
URL, а при методе POST данные передаются в теле HTTP-запроса.

Оба варианта передачи представлены ниже:

.. code-block:: python

    import urllib.request
    import urllib.parse

    data = {"s": "Веб программирование"}
    enc_data = urllib.parse.urlencode(data)

    # GET запрос
    f = urllib.request.urlopen("http://nigma.ru/" + "?" + enc_data)
    print(f.read())

    # POST запрос
    f = urllib.request.urlopen("http://nigma.ru/", enc_data.encode('utf-8'))
    print(f.read())

В некоторых случаях данные имеют повторяющиеся имена. В этом случае в качестве
параметра :func:`urllib.parse.urlencode` можно использовать вместо словаря
последовательность пар имя-значение:

.. code-block:: python

    import urllib.parse
    data = [("n", "1"), ("n", "3"), ("n", "4"), ("button", "Привет"), ]
    enc_data = urllib.parse.urlencode(data)
    print(enc_data)

.. code-block:: text

    n=1&n=3&n=4&button=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82

Модуль :mod:`urllib.request` позволяет загружать web-объекты через
прокси-сервер. Если ничего не указывать, будет использоваться прокси-сервер,
который был задан принятым в конкретной ОС способом. В Unix прокси-серверы
задаются в переменных окружения ``http_proxy``, ``ftp_proxy`` и т.п., в Windows
прокси-серверы записаны в реестре, а в Mac OS они берутся из конфигурации
Internet. Задать прокси-сервер можно через
:class:`urllib.request.ProxyHandler`:

.. code-block:: python

    proxies = {'http': 'http://www.proxy.com:3128'}
    # Использовать указанный прокси
    proxy = urllib.request.ProxyHandler(proxies)
    opener = urllib.request.build_opener(proxy)
    urllib.request.install_opener(opener)
    # make a request
    urllib.request.urlretrieve('http://www.google.com')

requests
--------

.. seealso::

    * http://docs.python-requests.org/en/latest/

:mod:`requests` - самая популярная библиотека на языке
программирования Python. Она предоставляет более абстрактный уровень
чем :mod:`urllib` и использует его в своем коде.

Пример Basic авторизации через urllib:

.. code-block:: python

    import urllib.request
    import ssl

    import certifi


    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
    context.verify_mode = ssl.CERT_REQUIRED
    context.load_verify_locations(certifi.where())
    httpsHandler = urllib.request.HTTPSHandler(context = context)

    manager = urllib.request.HTTPPasswordMgrWithDefaultRealm()
    manager.add_password(None, 'https://api.github.com', 'username', 'password')
    authHandler = urllib.request.HTTPBasicAuthHandler(manager)

    opener = urllib.request.build_opener(httpsHandler, authHandler)

    # Used globally for all urllib.request requests.
    # If it doesn't fit your design, use opener directly.
    urllib.request.install_opener(opener)

    response = urllib.request.urlopen('https://api.github.com')
    print(response.getcode())
    print(response.headers.getheader('content-type'))

    # ------
    # 200
    # 'application/json'

Тоже но на :mod:`requests`, код значительно меньше:

.. code-block:: python

    import requests

    r = requests.get('https://api.github.com', auth=('user', 'pass'))

    print(r.status_code)
    print(r.headers['content-type'])

    # ------
    # 200
    # 'application/json'

Сессии хранят куки и настройки, как браузер:

.. code-block:: python

    import requests

    s = requests.Session()

    s.get('http://httpbin.org/cookies/set/sessioncookie/123456789')
    r = s.get("http://httpbin.org/cookies")

    print(r.text)
    # {"cookies": {"sessioncookie": "123456789"}}

    print(s.cookies.get_dict())
    # {'sessioncookie': '123456789'}

    r = s.get("http://httpbin.org/cookies")
    print(r.text)
    # {"cookies": {"sessioncookie": "123456789"}}
