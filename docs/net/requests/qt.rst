.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTTP Запросы/Ответы на C++/Qt
    :description: HTTP клиент на C++/Qt при помощи модуля QNetwork.
    :tags: C++, Qt, QNetwork, HTTP

C++/Qt
------

.. seealso::

   http://doc.qt.io/qt-5/qtnetwork-index.html

`Qt <https:/qt.io/>`_ невероятно мощный фреймворк, который делает разработку на
C++ простой и удобной. Модуль `QtNetwork
<http://doc.qt.io/qt-5/qtnetwork-index.html>`_ позволяет выполнять различные
сетевые операции, в том числе и HTTP запросы.

.. code-block:: cpp
    :caption: main.cpp

    // Qt loop app
    #include <QtCore/QDebug>
    #include <QtCore/QJsonDocument>
    #include <QtCore/QCoreApplication>

    // Network
    #include <QtNetwork/QNetworkReply>
    #include <QtNetwork/QNetworkRequest>
    #include <QtNetwork/QNetworkAccessManager>

    int main(int argc, char *argv[])
    {
        QCoreApplication a(argc, argv);

        auto manager = new QNetworkAccessManager();
        QObject::connect(
                    manager,
                    &QNetworkAccessManager::finished,
                    // Лямбда функция - обработчик HTTP ответа
                    [=](QNetworkReply *reply) {

            // Обработка ошибок
            if (reply->error()) {
                qDebug() << QString("Error %1").arg(reply->errorString());
                exit(1);
            }

            // Вывод заголовков
            for (auto &i:reply->rawHeaderPairs()) {
                QString str;
                qDebug() << str.sprintf(
                                "%40s: %s",
                                i.first.data(),
                                i.second.data());
            }

            // Вывод стандартного заголовка
            qDebug() << reply->header(QNetworkRequest::ContentTypeHeader).toString();

            // Тело ответа в формате JSON
            QByteArray responseData = reply->readAll();
            qDebug() << QJsonDocument::fromJson(responseData);

            // Delete garbage && Exit
            reply->deleteLater();
            manager->deleteLater();
            exit(0);
        });

        manager->get(QNetworkRequest(QUrl("http://httpbin.org/get")));

        return a.exec();
    }

Программа в цикле обработки событий дожидается HTTP ответ и передает управление
в лямбда функцию.

Результат выполнения.

.. code-block:: text

    "                              Connection: keep-alive"
    "                                  Server: meinheld/0.6.1"
    "                                    Date: Fri, 04 Aug 2017 09:33:08 GMT"
    "                            Content-Type: application/json"
    "             Access-Control-Allow-Origin: *"
    "        Access-Control-Allow-Credentials: true"
    "                            X-Powered-By: Flask"
    "                        X-Processed-Time: 0.000859022140503"
    "                          Content-Length: 269"
    "                                     Via: 1.1 vegur"
    QVariant(QString, "application/json")
    QJsonDocument({"args":{},"headers":{"Accept-Encoding":"gzip, deflate","Accept-Language":"en-US,*","Connection":"close","Host":"httpbin.org","User-Agent":"Mozilla/5.0"},"origin":"89.111.232.62","url":"http://httpbin.org/get"})

.. seealso::

    http://doc.qt.io/qbs/

Для сборки проекта можно использовать систему сборки `Qbs
<http://doc.qt.io/qbs/>`_.

.. code-block:: qbs
    :caption: qt-request.qbs

    import qbs

    Project {
        minimumQbsVersion: "1.7.1"

        CppApplication {
            Depends { name: "Qt.core" }
            Depends { name: "Qt.network" }

            cpp.cxxLanguageVersion: "c++11"

            files: "main.cpp"

            Group {     // Properties for the produced executable
                fileTagsFilter: product.type
                qbs.install: true
            }
        }
    }
