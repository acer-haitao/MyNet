#!/usr/bin/python
#-*- coding: utf-8 -*-
#########################################################################
# Author: yuhaitao
# mail: acer_yuhaitao@163.com
# Created Time: Tue 10 Jan 2017 05:28:30 AM PST
#########################################################################


import cgi, os
import cgitb; cgitb.enable()

form = cgi.FieldStorage()

# 获取文件名
fileitem = form['filename']

# 检测文件是否上传
if fileitem.filename:
    # 设置文件路径 
    #fn = os.path.basename(fileitem.filename)
    fn = os.path.basename(fileitem.filename.replace("\\", "/" ))
    open('/home/pi/FTP/' + fn, 'wb').write(fileitem.file.read())
    message = '文件 "' + fn + '" 上传成功'
else:
    message =  '文件没有上传'
    #message = '文件 "' + fn + '" 上传成功'
print """\
<Content-Type: text/html\n
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<p>%s</p>
</body>
</html>
""" % (message,)
