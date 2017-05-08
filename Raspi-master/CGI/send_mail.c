#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>
#include <unistd.h>
#include <errno.h>
#include "cgic.h"



struct setWifi
{
	char cmd[16];
    char ipaddr[16];
    char gateway[16];
};

int cgiMain()
{
		
		struct setWifi wifi = {{0}, {0}};
							
		cgiFormString("submit_set_wifi", wifi.cmd, 16);
		cgiFormString("ipaddr",wifi.ipaddr,16);
		cgiFormString("gateway",wifi.gateway,16);
		
		printf("%s\n",wifi.cmd);
		printf("%s\n",wifi.ipaddr);
		
		if(strncmp(wifi.gateway,"haitao",6) == 0)
		{
		system("sudo  /home/pi/github/send_sys_info.py  &");
		//system("/home/pi/github/send_ip__mail/send_myemail");
		cgiHeaderContentType("text/html"); 
		fprintf(cgiOut, "<HTML><HEAD>"); 
		fprintf(cgiOut, "<TITLE>操作提示</TITLE></HEAD>"); 
		fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
		fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../setting1.html\">");
		fprintf(cgiOut, "<H2>提交<font color=\"#FF0000\" size=\"+3\">成功！</font>本页面3秒后自动关闭。</H2>");
		fprintf(cgiOut, "<H2>cmd：%s</H2>", wifi.cmd);
		fprintf(cgiOut, "<H2>邮箱:%s</H2>", wifi.ipaddr);
		fprintf(cgiOut, "<H2>密码:%s</H2>", wifi.gateway);
		fprintf(cgiOut, "<script type=\"text/jscript\">");
		fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
		fprintf(cgiOut, "</script>");
		fprintf(cgiOut, "</BODY>"); 
		fprintf(cgiOut, "</HTML>");	
		}
		else
		{
		
		cgiHeaderContentType("text/html"); 
		fprintf(cgiOut, "<HTML><HEAD>"); 
		fprintf(cgiOut, "<TITLE>操作提示</TITLE></HEAD>"); 
		fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
		fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../setting1.html\">");
		fprintf(cgiOut, "<H2>提交<font color=\"#FF0000\" size=\"+3\">失败！</font>本页面3秒后自动关闭。</H2>");
		fprintf(cgiOut, "<H2>cmd：%s</H2>", wifi.cmd);
		fprintf(cgiOut, "<H2>邮箱:%s</H2>", wifi.ipaddr);
		fprintf(cgiOut, "<H2>密码:%s</H2>", wifi.gateway);
		fprintf(cgiOut, "<script type=\"text/jscript\">");
		fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
		fprintf(cgiOut, "</script>");
		fprintf(cgiOut, "</BODY>"); 
		fprintf(cgiOut, "</HTML>");	
		fflush(stdout);
		}
		return 0;
}

