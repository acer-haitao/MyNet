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
	char email[16];
    char rcvNum[16];
    char sendpwd[16];
};

int cgiMain()
{
		
	struct setWifi wifi = {{0}, {0}};
							
	cgiFormString("netEmail", wifi.email, 16);
	cgiFormString("sendnumber",wifi.rcvNum,16);
	cgiFormString("sendpwd",wifi.sendpwd,16);
		
		
	if(strncmp(wifi.sendpwd,"haitao",6) == 0)
	{
			if(strncmp(wifi.rcvNum,"0",1) == 0)
			{
				system("sudo  /home/pi/github/Mail/rcvinfo.py  &");
			}
			else if (strncmp(wifi.rcvNum,"1",1) == 0)
			{
				system("sudo /home/pi/github/Mail/sysinfo.py &");
			}
			else if (strncmp(wifi.rcvNum,"2",1) == 0)
			{
				system("sudo /home/pi/github/Mail/NetaddDel.py  &");
			}
			else
			{
				cgiHeaderContentType("text/html"); 
				fprintf(cgiOut, "<HTML><HEAD>"); 
				fprintf(cgiOut, "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>"); 
				fprintf(cgiOut, "<TITLE>远程测试</TITLE></HEAD>"); 
				fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
				fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../index.html\">");
				fprintf(cgiOut, "<H2><font color=\"#FF0000\" size=\"+3\">提交失败！</font>本页面3秒后自动关闭。</H2>");	
				fprintf(cgiOut, "<H2>谢谢您的参与！<font color=\"#FF0000\">%s</font></H2>", wifi.email);
				fprintf(cgiOut, "<script type=\"text/jscript\">");
				fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
				fprintf(cgiOut, "</script>");
				fprintf(cgiOut, "</BODY>"); 
				fprintf(cgiOut, "</HTML>");
				fflush(stdout);	
			}
				cgiHeaderContentType("text/html"); 
				fprintf(cgiOut, "<HTML><HEAD>"); 
				fprintf(cgiOut, "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>"); 
				fprintf(cgiOut, "<TITLE>远程测试</TITLE></HEAD>"); 
				fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
				fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../index.html\">");
				fprintf(cgiOut, "<H2>提交<font color=\"#FF0000\" size=\"+3\">成功！</font>本页面3秒后自动关闭。</H2>");	
				fprintf(cgiOut, "<H2>谢谢您的参与！<font color=\"#FF0000\">%s</font></H2>", wifi.email);
				fprintf(cgiOut, "<script type=\"text/jscript\">");
				fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
				fprintf(cgiOut, "</script>");
				fprintf(cgiOut, "</BODY>"); 
				fprintf(cgiOut, "</HTML>");
				fflush(stdout);				
	}
	else
	{
				cgiHeaderContentType("text/html"); 
				fprintf(cgiOut, "<HTML><HEAD>"); 
				fprintf(cgiOut, "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>"); 
				fprintf(cgiOut, "<TITLE>远程测试</TITLE></HEAD>"); 
				fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
				fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../index.html\">");
				fprintf(cgiOut, "<H2><font color=\"#FF0000\" size=\"+3\">提交失败！</font>本页面3秒后自动关闭。</H2>");	
				fprintf(cgiOut, "<H2>谢谢您的参与！<font color=\"#FF0000\">%s</font></H2>", wifi.email);
				fprintf(cgiOut, "<script type=\"text/jscript\">");
				fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
				fprintf(cgiOut, "</script>");
				fprintf(cgiOut, "</BODY>"); 
				fprintf(cgiOut, "</HTML>");
				fflush(stdout);	
	}
		return 0;
}

