#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import subprocess
import smtplib
import socket
import datetime
import time
from email.mime.text import MIMEText

#处理ASCCI错误提示
import sys
defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)




def start( action ):
    os.system( '. /lib/lsb/init-functions; log_begin_msg "' + action  + ' ..."' );
def success():
    os.system( '. /lib/lsb/init-functions; log_progress_msg done; log_end_msg 0');
def fail():
    os.system( '. /lib/lsb/init-functions; log_end_msg 1');

# Mail server settings
smtp_server = 'smtp.126.com'
smtp_port = 25

# Mail account settings
send_to = 'dih_yuhaitao@126.com'
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

#从文件里读文件
File = open("/home/pi/github/www_rcv.txt", "r")
my_ip = File.read()
File.close()

if isinstance(my_ip,unicode):
            my_ip = str(my_ip) # 内容中文乱码解决方案

ipaddr = "hello world"

start( 'Send ip mail ( ' + ipaddr + ' )' )

#邮件正文解决方案
msg = MIMEText(my_ip,'plain','utf-8') #第二个参数不是format
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
except Exception, what:
    fail()
smtpserver.quit()
#os.system(' rm /home/pi/github/sys_info.c')
File.close()
