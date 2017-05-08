#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import re

while(1) :
    var = os.popen("sudo oraynewph status | grep ONLINE | sed -n \"1,0p\"").read()
    #print var
    #list = re.match(r'RUNSTATUS= ONLINE',var)
    #str = list.group()
    #print str
    if ('RUNSTATUS= ONLINE\n' == var) :
        print "花生壳客户端已经登录成功"
        os.system("sleep 2")
    else :
        print "正在重启花生壳客户端"
        os.system("sudo oraynewph stop")
        os.system("sleep 10")
        os.system("sudo oraynewph start")
        os.system("sleep 120")

