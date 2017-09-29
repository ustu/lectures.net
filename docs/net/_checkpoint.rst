Работа с HTTP через сокеты
==========================

Цель работы
-----------

Получить практические навыки по работе с ``HTTP`` протоколом при помощи
системного вызова `socket`.

Замечания к выполнению
----------------------

Address already in use
^^^^^^^^^^^^^^^^^^^^^^

Данная ошибка может возникать при аварийном завершении программы или если в
программе забыли прописать закрытие сокета. Как это исправить см. раздел
":ref:`addressinuse`".

В ОС `Windows` также доступна команда `netstat`, которая позволяет увидеть
текущие соединения.

.. code-block:: bash

    Microsoft Windows [Version 10.0.14393]
    (c) Корпорация Майкрософт (Microsoft Corporation), 2016. Все права защищены.

    C:\Users\user>netstat -a

    Активные подключения

      Имя    Локальный адрес        Внешний адрес          Состояние
      TCP    0.0.0.0:135            DESKTOP-9JPISDO:0      LISTENING
      TCP    0.0.0.0:445            DESKTOP-9JPISDO:0      LISTENING
      TCP    0.0.0.0:3050           DESKTOP-9JPISDO:0      LISTENING
      TCP    0.0.0.0:7680           DESKTOP-9JPISDO:0      LISTENING
      TCP    0.0.0.0:8889           DESKTOP-9JPISDO:0      LISTENING
      TCP    10.0.2.15:139          DESKTOP-9JPISDO:0      LISTENING
      TCP    10.0.2.15:54628        a172-226-117-113:https  ESTABLISHED
      TCP    10.0.2.15:54629        2.19.78.144:http       ESTABLISHED
      TCP    [::]:135               DESKTOP-9JPISDO:0      LISTENING
      UDP    0.0.0.0:3544           *:*
      UDP    0.0.0.0:5050           *:*
      UDP    10.0.2.15:137          *:*
      UDP    [::]:5353              *:*
      UDP    [::]:5355              *:*
      UDP    [::1]:1900             *:*
      UDP    [::1]:60633            *:*
      UDP    [fe80::e0aa:34e:fe8c:d651%2]:546  *:*
      UDP    [fe80::e0aa:34e:fe8c:d651%2]:1900  *:*
      UDP    [fe80::e0aa:34e:fe8c:d651%2]:60632  *:*

Задания
-------

Описание заданий находится в разделе :ref:`dz1`.

Задание 1
^^^^^^^^^

.. seealso::

   * http://ruslanspivak.com/lsbaws-part1/

::

   myproject/
   ├── about
   │   └── aboutme.html
   └── index.html

* Написать socket сервер который отдает статикой файлы по HTTP при
  обращении по IP адресу.
* Файл ``aboutme.html`` должен быть доступен по ссылке
  http://localhost:8000/about/aboutme.html
* Файл ``index.html`` должен быть доступен по ссылке
  http://localhost:8000/index.html или http://localhost:8000/

Задание 2, 3
^^^^^^^^^^^^

#. Реализовать HTTP запросы при помощи модуля :mod:`socket`;
#. Реализовать HTTP запросы при помощи модуля :mod:`http.client`
   (или :mod:`urllib.request`, или :mod:`requests`).

Задание 4
^^^^^^^^^

Делать на сокетах не надо.

Задание 5
^^^^^^^^^

.. seealso::

    http://www.tcpdump.org/

Отправить следующие параметры POST запросом на сервис http://httpbin.org/post

.. code-block:: json

   {
       "github": "MyNickName",
       "Name": "MyName",
       "Surname": "MySurname"
   }

При помощи утилиты :man:`tcpdump` перехватить трафик с запросом и выложить
результат в виде заметок ``Gist`` от ``GitHub``.

Содержание отчета
-----------------

На каждое задание создать отчет, который должен быть оформлен в виде
репозитария на :l:`GitHub` или заметок на сервисе :l:`Gist`. В отчете должно
быть: исходный код программы, описание последовательности действий, результат
выполнения заданий и выводы по работе.
