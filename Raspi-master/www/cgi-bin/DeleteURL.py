#!/usr/bin/python
# -*- coding: UTF-8 -*-
#########################################################################
# File Name: DeleteURL.py
# Author: yuhaitao
# mail: acer_yuhaitao@163.com
# Created Time: Tue 04 Apr 2017 08:22:00 PM PDT
#########################################################################
import re
import shutil
import os
import sys 
import re
import cgi,cgitb
import codecs
import time

#接收数据
form = cgi.FieldStorage()
getName = form.getvalue('deletenetName')
getURL = form.getvalue('deletenetURL')
getPaswd = form.getvalue('deletepwd')
#将gb2312转换成utf-8
strRecv = getName.decode("gb2312").encode("utf-8")


#读取文件
str = strRecv + "</a></li>"
tt = [str]
SAVEURL  = [strRecv, getURL]

#打开文件删除指定内容所在行
def DeleteURL():
        with open('/www/right.html','r') as f:
		with open ('/home/pi/righttmp.html','w') as g:
			for line in f.readlines():
				if all(string not in line for string in tt) :
					g.write(line)
				else :
                                        SAVEURL[1] = line
        shutil.move('/home/pi/righttmp.html','/www/right.html')

def SucessPrin():
	print "Content-type:text/html"
	print
	print "<html>"
	print "<head>"
	print "<meta http-equiv=\"Content-Type\"content=\"text/html;charset=utf-8\"/>"
	print "<title>远程添加网址测试实例</title>"
	print "</head>"
	print "<body>"
	print "<h2>网站名称:%s </h2>" %	(strRecv)
	print "<h2>网站地址:%s </h2>" % (SAVEURL[1])
	print "<h2><font color=\"#FF0000\" size=\"+3\">提交成功！</font>本页面3秒后自动关闭.</h2>"
	print "<meta http-equiv=\"refresh\" content=\"3; url=../HT-Test.html\">"
	print "<script type=\"text/jscript\">"
	print "setTimeout(\"self.close()\",3000)"
	print "</script>"
	print "</body>"
	print "</html>"
        SaveLog(strRecv, SAVEURL[1])
def FaildPrin():
	print "Content-type:text/html"
	print
	print "<html>"
	print "<head>"
	print "<meta http-equiv=\"Content-Type\"content=\"text/html;charset=utf-8\"/>"
	print "<title>远程添加网址测试实例</title>"
	print "</head>"
	print "<body>"
	print "<h2>网站名称:%s </h2>" %	(strRecv)
	print "<h2>网站地址:%s </h2>" % (getURL)
	print "<h2><font color=\"#FF0000\" size=\"+3\">提交失败！</font>本页面3秒后自动关闭.</h2>"
	print "<meta http-equiv=\"refresh\" content=\"3; url=../HT-Test.html\">"
	print "<script type=\"text/jscript\">"
	print "setTimeout(\"self.close()\",3000)"
	print "</script>"
	print "</body>"
	print "</html>"
def SaveLog(strRecv, getURL):
    Strtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    try :   
        LogFile = open("/home/pi/github/Add_Del_NetLog.txt","a+")
        LogFile.write("\n--------------------------------------\n")
        LogFile.write("时间:" + Strtime + "-->删除网站:\n")
        LogFile.write("网站名称:" + strRecv + "\n")
        LogFile.write("网站地址:" + getURL + "\n")
        LogFile.close()
    except IOError:
        LogFile.close()

if getPaswd == "haitaodelete":
        if ((getName != "") or (getURL != "")):
	#if getName != "" :
		DeleteURL()
		SucessPrin()
	else :
		FaildPrin()
else :
	FaildPrin()

