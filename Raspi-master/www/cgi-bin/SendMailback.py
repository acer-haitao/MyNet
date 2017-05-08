#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import subprocess
import smtplib
import socket
import datetime
import time
from email.mime.text import MIMEText
import cgi,cgitb

#处理ASCCI错误提示
import sys
defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)


#接收网页数据
form = cgi.FieldStorage()
getMail = form.getvalue('netEmail')
getNumRecv = form.getvalue('sendnumber')
getPaswd = form.getvalue('sendpwd')
#将gb2312转换成utf-8
getNum = [0,1,2]

if getNumRecv == "0" :
    del getNum[1]
    del getNum[2]
elif getNumRecv == "1" :
    del getNum[0]
    del getNum[2]
elif getNumRecv == "2" :
    del getNum[0]
    del getNum[1]
    
#strRecv = getName.decode("gb2312").encode("utf-8")
SAVEURL =['留言内容','系统消息','网站增删']
def start( action ):
    os.system( '. /lib/lsb/init-functions; log_begin_msg "' + action  + ' ..."' );
def success():
    os.system( '. /lib/lsb/init-functions; log_progress_msg done; log_end_msg 0');
def fail():
    os.system( '. /lib/lsb/init-functions; log_end_msg 1');

#反馈
def SucessPrin():
	print "Content-type:text/html"
	print
	print "<html>"
	print "<head>"
	print "<meta http-equiv=\"Content-Type\"content=\"text/html;charset=utf-8\"/>"
	print "<title>远程添加网址测试实例</title>"
	print "</head>"
	print "<body>"
	print "<h2>发送到邮箱:%s </h2>" %(getMail)
	print "<h2>发送内容:%s </h2>" % (SAVEURL[getNum[0]])
	print "<h2><font color=\"#FF0000\" size=\"+3\">提交成功！</font>本页面3秒后自动关闭.</h2>"
	print "<meta http-equiv=\"refresh\" content=\"3; url=../HT-Test.html\">"
	print "<script type=\"text/jscript\">"
	print "setTimeout(\"self.close()\",3000)"
	print "</script>"
	print "</body>"
	print "</html>"

def FaildPrin():
        print "Content-type:text/html"
	print
	print "<html>"
	print "<head>"
	print "<meta http-equiv=\"Content-Type\"content=\"text/html;charset=utf-8\"/>"
	print "<title>远程添加网址测试实例</title>"
	print "</head>"
	print "<body>"
	print "<h2>发送到邮箱:%s </h2>" % (getMail)
	print "<h2>发送内容:%s </h2>" % (SAVEURL[getNum[2]])
	print "<h2><font color=\"#FF0000\" size=\"+3\">提交失败！请检查邮箱是否输入正确！</font>本页面3秒后自动关闭.</h2>"
	print "<meta http-equiv=\"refresh\" content=\"3; url=../HT-Test.html\">"
	print "<script type=\"text/jscript\">"
	print "setTimeout(\"self.close()\",3000)"
	print "</script>"
	print "</body>"
        print "</html>"

# Mail server settings
smtp_server = 'smtp.126.com'
smtp_port = 25

# Mail account settings
send_to = getMail
mail_user = 'dih_yuhaitao@126.com'
mail_password = 'haitao131'

# Connect to smtp server, try several times
start( 'Connect to [ ' + smtp_server + ' ]' )
#start( 'Connect to [ ' + smtp.126.com ' ]' )

try_max = 5
try_times = 0
try_delay = 1
while try_times <= try_max:
    try_times += 1
    try:
        smtpserver = smtplib.SMTP( smtp_server, smtp_port )
        #smtpserver = smtplib.SMTP( smtp.126.com, 25 )
        success() #系统调用
        break
    except Exception, what:
        if try_times > try_max:
            fail()#系统调用
            exit()
        else:
            time.sleep( try_delay )
            try_delay *= 2

# Login to mail system
start( 'Login with ( ' + mail_user + ' )' )
try:
    smtpserver.ehlo()
    smtpserver.starttls()
    smtpserver.login( mail_user, mail_password )
    success()
except Exception, what:
    fail()
    exit()

# Build ip mail and send (for Raspberry only)
'''
today = datetime.date.today()
p = subprocess.Popen( 'ip route list', shell = True, stdout = subprocess.PIPE )
data = p.communicate()
split_data = data[ 0 ].split()
ipaddr = split_data[ split_data.index( 'src' ) + 1 ]
my_ip = 'Your IP is :%s' % ipaddr
'''
#调用sh脚本
#os.system('/home/pi/github/ip_cpu_sd_info.sh >> /home/pi/github/sys_info.c')

my_ip = ["Test1","Test2","Test3"]

#从文件里读文件
if getPaswd == "haitao" :
    if getNum == "1" :
        File = open("/home/pi/github/www_rcv.txt", "r")
        my_ip[0] = File.read()
        File.close()
    elif getNum == "2" :
        File = open("/home/pi/github/www_rcv.txt", "r")
        my_ip[1] = File.read()
        File.close()
    elif getNum == "3" :
        File = open("/home/pi/github/Add_Del_NetLog.txt", "r")
        my_ip[2] = File.read()
        File.close()
    else:
        FaildPrin()
else:
    FaildPrin()

if isinstance(my_ip[getNum[0]],unicode):
            my_ip[getNum[0]] = str(my_ip[getNum[0]]) # 内容中文乱码解决方案

ipaddr = "hello world"

start( 'Send ip mail ( ' + ipaddr + ' )' )

#邮件正文解决方案
msg = MIMEText(my_ip[getNum[0]],'plain','utf-8') #第二个参数不是format
msg["Accept-Language"]="zh-CN"
msg["Accept-Charset"]="ISO-8859-1,utf-8"

#主题
subject = '树莓派:IP For RaspberryPi on %s' % time.strftime('%Y/%m/%d/ %H:%M:%S')
if not isinstance(subject,unicode):
        subject = unicode(subject)
msg[ 'Subject' ] = subject 

#发件人
msg[ 'From' ] = mail_user

#收件人
msg[ 'To' ] = send_to


try:
    smtpserver.sendmail( mail_user, [send_to], msg.as_string() )
    success()
    SucessPrin()
except Exception, what:
    fail()
    FaildPrin()
smtpserver.quit()
#os.system(' rm /home/pi/github/sys_info.c')
#File.close()

