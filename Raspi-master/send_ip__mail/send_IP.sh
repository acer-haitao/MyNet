#!/bin/bash
# check network availability
while true
do
  TIMEOUT=5
  SITE_TO_CHECK="www.126.com"
  RET_CODE=`curl -I -s --connect-timeout $TIMEOUT $SITE_TO_CHECK -w %{http_code} | tail -n1`
    if [ "x$RET_CODE" = "x200" ]; 
		then
			echo " `date '+%F %T'`--> Network OK, will send mail..."
	    break
	else
	    echo " `date '+%F %T'`--> Network not ready, wait..."
	    sleep 1s
    fi
done
 
 # get the IP address of eth0, e.g. "192.168.16.5"
 ETH0_IP_ADDR=`ifconfig wlan0 | sed -n "2,2p" | awk '{print substr($2,1)}'`
 # send the Email
 echo  -e "`uname -a` \n 成功登录时间: `date '+%F %T'`. 祝您生活愉快! \n 
 `ifconfig` \n `df -h` \n `ps -e`" | mutt -s "IP地址为: $ETH0_IP_ADDR" dih_yuhaitao@126.com

 echo " `date '+%F %T'`--> Network  finish..."

