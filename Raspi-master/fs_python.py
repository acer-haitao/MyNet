#!/usr/bin/python
#-*- coding: utf-8 -*-
#########################################################################
# Author: yuhaitao
# mail: acer_yuhaitao@163.com
# Created Time: Mon 20 Mar 2017 07:01:04 AM PDT
########################################################################
import cgi, cgitb
import os

form = cgi.FieldStorage()

if form.getvalue('fs'):
	test = form.getvalue('fs')
else : 
	test = "Failed submit!"
if (test == 'on') :
	print "open:%s" % test
	os.system("gpio -g write 26 1")
if (test == 'off'):
	print "close:%s" % test
	os.system("gpio -g write 26 0")

print "Content-type:text/html"
print
print "<html>"
print "<head>"
print "<meta charset=\"utf-8\">"
print "<title>风扇控制</title>"
print "</head>"
print "<body>"
print "<h2>您的操作结果:%s</h2>" % test
print "</body>"
print "</html>"







