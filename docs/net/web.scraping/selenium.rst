Selenium
========

.. seealso::

    * https://ru.wikipedia.org/wiki/Selenium
    * http://www.seleniumhq.org/projects/webdriver/
    * https://kreisfahrer.gitbooks.io/selenium-webdriver/
    * http://selenium-python.readthedocs.org/

`Selenium Webdriver <http://www.seleniumhq.org/projects/webdriver/>`_ -
инструмент для автоматизации реального браузера, как локально, так и удаленно,
наиболее близко имитирующий действия пользователя.

.. code-block:: python

    from selenium import webdriver

    driver = webdriver.Firefox()

    # Открыли страницу
    driver.get(
        'https://github.com/ustu/students/blob/master/' +
        'Веб-программирование/2016.fo-331002.rst'
    )

    # Нашли иконки всех пользователей
    contributors = driver.find_elements_by_xpath(
        "//img[contains(@class, 'avatar')]"
    )

    # Вывели логины
    for user in contributors:
        print(user.get_attribute("alt"))

    # Кликнули мышкой по последнему юзеру
    user.click()
