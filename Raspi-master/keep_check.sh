#!/bin/bash
# check network availability
sleep 60
while true
do
	RET_CODE=`sudo oraynewph status | grep ONLINE`
	if [ "$RET_CODE" != "RUNSTATUS= ONLINE" ];  		
	then
		`sudo oraynewph start`
	else
	 	 echo " `date '+%F %T'`-->orayneph ready ok, wait...";							    
	 	 sleep 600s;
	fi														
done
