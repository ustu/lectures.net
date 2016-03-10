Закрепление материала "Сокеты"
==============================

Реализовать задания из :ref:`dz1`

Задание 1
---------

.. note::

   Оформить в виде репозитария или `Gist` на `GitHub`.

.. seealso::

   * http://ruslanspivak.com/lsbaws-part1/

::

   myproject/
   ├── about
   │   └── aboutme.html
   └── index.html

* Написать socket сервер который отдает статикой файлы по HTTP при обращении по IP адресу.
* Файл ``aboutme.html`` должен быть доступен по ссылке http://localhost:8000/about/aboutme.html
* Файл ``index.html`` должен быть доступен по ссылке
  http://localhost:8000/index.html или http://localhost:8000/

Задание 2
---------

.. note::

   Оформить в виде заметок на сервисе `Gist` от `GitHub`.

#. Реализовать HTTP запросы при помощи модуля :mod:`socket`;
#. Реализовать HTTP запросы при помощи модуля :mod:`http.client`.

Задание 3
---------

.. note::

   Оформить в виде заметок на сервисе `Gist` от `GitHub`.

#. Реализовать HTTP запросы при помощи модуля :mod:`socket`;
#. Реализовать HTTP запросы при помощи модуля :mod:`http.client`
   (или :mod:`urllib.request`, или :mod:`requests`).

Задание 4
---------

Делать на сокетах не надо.

Задание 5
---------

.. note::

   Оформить в виде заметок на сервисе `Gist` от `GitHub`.

Отправить следующие параметры POST запросом на сервис http://httpbin.org/post

.. code-block:: json

   {
       "github": "MyNickName",
       "Name": "MyName",
       "Surname": "MySurname"
   }

При помощи утилиты ``tcpdump`` перехватить трафик с запросом и выложить
результат в виде заметок ``Gist`` от ``GitHub``.
