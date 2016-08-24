#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 uralbash <root@uralbash.ru>
#
# Distributed under terms of the MIT license.

import os
import sys

sys.path.insert(0, os.path.abspath('../_lectures/docs/'))

from config_sphinx import *  # noqa

project = u'Сетевое программирование'
epub_title = project
latex_documents = [
    ('index', 'lectures.tex',
     project,
     u'Свинцов Дмитрий', 'manual'),
]
