#!/bin/bash
# check network availability
echo "成功登录:`date '+%F %T'` "

#echo "主机信息："
echo "主机信息:`uname -a`"

#echo "无线IP:"
echo 无线IP:`ifconfig wlan0 | sed -n "2,2p" | awk '{print substr($2,6)}'`
echo "有线IP:`ifconfig eth0 | sed -n "2,2p" | awk '{print substr($2,6)}'`"

echo "磁盘信息："
echo " `df -h` "

#echo "boa服务器信息:"
echo " boa服务器信息:`ps -e | grep boa ` "

echo "花生壳客户端登录信息:"
echo " `ps -e | grep oraynewph `"
echo " ` sudo oraynewph status`"


echo "CPU温度:`cat /sys/class/thermal/thermal_zone0/temp` "

#echo `ps -ef|grep -i vnc`
echo "VNC开启状态:"
echo `netstat -tulpn | grep vnc`
