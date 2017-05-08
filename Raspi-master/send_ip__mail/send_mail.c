/*************************************************************************
    > File Name: 1.c
    > Author: yuhaitao
    > Mail:acer_yuhaitao@163.com 
    > Created Time: 2016年12月03日 星期六 19时20分11秒
 ************************************************************************/
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
	
	system("sudo /usr/local/bin/raspbian-ip-mailer.py  &");     
	system("/home/pi/github/send_ip__mail/send_IP.sh");
	return 0;
}
