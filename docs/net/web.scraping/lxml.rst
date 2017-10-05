lxml.html
=========

.. seealso::

    * http://devacademy.ru/posts/parsing-resursov-pri-pomoschi-python/

Разбор HTTP ответа
------------------

Довольно легко распарсить HTML код полученный при помощи `lxml <lxml.de>`_.
Как только мы преобразовали данные в дерево, можно использовать `XPath
<https://ru.wikipedia.org/wiki/XPath>`_ для их извлечения.

.. code-block:: python

   import requests
   from lxml import html

   response = requests.get('http://ya.ru')

   # Преобразование тела документа в дерево элементов (DOM)
   parsed_body = html.fromstring(response.text)

   # Выполнение xpath в дереве элементов
   print(parsed_body.xpath('//title/text()')[0])  # Получить title страницы
   print(parsed_body.xpath('//a/@href'))          # Получить аттрибут href для всех ссылок

Пример извлекает название `HTML` страницы и все ссылки найденные в этом
документе.

.. code-block:: bash

    Яндекс
    ['https://mail.yandex.ru', '//www.yandex.ru']


Скачиваем все изображения со страницы
-------------------------------------

Следующий скрипт скачает все изображения и сохранит их в директории
``downloaded_images/``. Только сначала не забудьте создать соответствующий
каталог.

.. code-block:: python

    # standard library
    import sys
    from pathlib import Path
    from urllib.parse import urljoin

    # third-party
    import requests
    from lxml import html

    response = requests.get('http://imgur.com/')
    parsed_body = html.fromstring(response.text)

    # Парсим ссылки с картинками при помощи XPath
    images = parsed_body.xpath('//img/@src')
    if not images:
        sys.exit("images Not Found")

    # Конвертирование всех относительных ссылок в абсолютные
    images = [
        urljoin(response.url, url)
        for url in images
    ]
    print('Found {} images'.format(len(images)))

    # Скачиваем только первые 10
    for url in images[0:10]:
        r = requests.get(url)
        target = Path(
            'downloaded_images/{}'.format(
                url.split('/')[-1]  # file name from URL
            )
        )
        target.write_bytes(r.content)

После выполнения скрипта в каталоге окажутся скачанные изображения.

.. figure:: /_static/4.net/imgur.png
   :align: center
   :width: 500pt

CSS selector
------------

.. seealso::

    https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Селекторы


.. code-block:: python

    # standard library
    from io import StringIO

    # third-party
    import requests
    from lxml import html

    r = requests.get('http://ru.arf.ru/')

    print(r.encoding)  # Кодировка по умолчанию ISO-8859-1
    r.encoding = 'cp1251' # Указываем настоящюю кодировку документа

    # Формируем дерево элементов
    root = html.parse(
        StringIO(r.text)
    ).getroot()

    # Выбираем ссылки внутри тегов <td> выровненных по центру
    links = root.cssselect('td[align=CENTER] > a')

    for item in links:
        print(
            item.get('href')  # печатаем значение атрибута href
        )

    print()

    # Выбираем все изображения
    images = root.cssselect('img')
    for item in images:
        print(
            item.get('src'),  # печатаем значение атрибута src
            html.tostring(item)  # и сам элемент
        )

Результат выполнения:

.. code-block:: bash

    $ python parse.py
    ISO-8859-1
    /
    /Ludi/index.html
    /Hrono/index.html
    /Svid/index.html
    /Links/index.html
    mailto:sova@arf.ru
    /Ludi/index.html
    /Hrono/index.html
    /Svid/index.html
    /Links/index.html
    mailto:sova@arf.ru

    /Pict/ru.png b'<img src="/Pict/ru.png" height="80" width="120" alt="RU History Logo" border="0">'
    /Pict/line.png b'<img src="/Pict/line.png" height="3" width="550" alt="divider">\r\n          '
    /Pict/line.png b'<img src="/Pict/line.png" height="3" width="550" alt="divider">\r\n          '
