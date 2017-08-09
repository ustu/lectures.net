.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTTP Запросы/Ответы на C#
    :description: HTTP клиент на C# при помощи System.Net.Http в .Net Core под
                  Linux.
    :tags: C#, CShart, dotnet, Linux, HTTP

C#
--

.. seealso::

    * https://www.microsoft.com/net/download/linux
    * `HttpClient Class <https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient>`_

`HttpClient Class
<https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient>`_
содержится в поставке ``.NET Core`` для ``Linux``. Создадим проект на C#
отправляющий HTTP запрос.

Первой командой создается проект из шаблона, затем устанавливаются зависимости
и запускается программа.

.. code-block:: bash

    $ dotnet new Console
    $ dotnet restore
    $ dotnet run

HTTP запрос выполняется асинхронно.

.. code-block:: csharp
    :caption: Program.cs

    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    namespace ConsoleApplication
    {
        public class Program
        {
            public static void Main(string[] args)
            {
                MainAsync().Wait();
            }

            static async Task MainAsync()
            {
              var client = new HttpClient();
              client.DefaultRequestHeaders.Accept.Clear();
              client.DefaultRequestHeaders.Accept.Add(
                  new MediaTypeWithQualityHeaderValue(
                    "application/vnd.github.v3+json"
                  )
              );
              client.DefaultRequestHeaders.Add(
                "User-Agent",
                ".NET Foundation Repository Reporter"
              );

              var stringTask = client.GetStringAsync(
                "https://api.github.com/orgs/ustu/repos"
              );

              var msg = await stringTask;
              Console.Write(msg);
            }
        }
    }

Результат выполнения программы.

.. code-block:: bash

    $ dotnet run
    Project net (.NETCoreApp,Version=v1.1) will be compiled because inputs were modified
    Compiling net for .NETCoreApp,Version=v1.1

    Compilation succeeded.
        0 Warning(s)
        0 Error(s)

    Time elapsed 00:00:01.0363043

    [{"id":25028386,"name":"urfu_sphinx_theme","full_name":"ustu/urfu_sphinx_theme","owner":{"log
    in":"ustu","id":9111291,"avatar_url":"https://avatars0.githubusercontent.com/u/9111291?v=4","
    gravatar_id":"","url":"https://api.github.com/users/ustu","html_url":"https://github.com/ustu
    ","followers_url":"https://api.github.com/users/ustu/followers","following_url":"https://api.
    github.com/users/ustu/following{/other_user}","gists_url":"https://api.github.com/users/ustu/
    gists{/gist_id}","starred_url":"https://api.github.com/users/ustu/starred{/owner}{/repo}","su
    bscriptions_url":"https://api.github.com/users/ustu/subscriptions","organizations_url":"https
    ://api.github.com/users/ustu/orgs","repos_url":"https://api.github.com/users/ustu/repos","eve
    nts_url":"https://api.github.com/users/ustu/events{/privacy}","received_events_url":"https://
    api.github.com/users/ustu/received_events","type":"Organization","site_admin":false},"private
    ":false,"html_url":"https://github.com/ustu/urfu_sphinx_theme","description":null,"fork":fals
    e,"url":"https://api.github.com/repos/ustu/urfu_sphinx_theme","forks_url":"https://api.github
    .com/repos/ustu/urfu_sphinx_theme/forks","keys_url":"https://api.github.com/repos/ustu/urfu_s
    phinx_theme/keys{/key_id}","collaborators_url":"https://api.github.com/repos/ustu/urfu_sphinx
    _theme/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/ustu/urfu_sphi
