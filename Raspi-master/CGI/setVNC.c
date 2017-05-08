#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>
#include <unistd.h>
#include <errno.h>
#include "cgic.h"
#define N 50
#define VNC_NUM 16



int cgiMain()
{
	char buf[N] = {0}; //字符接收缓冲区
	int i;

	FILE *fp;
	fp = fopen("/home/pi/github/www_log.txt","w" );
	if(fp == NULL)
 	{
		printf("open failed\n");
		return -1;
	}

	cgiFormString("VNC", buf, N);
	
	fprintf(fp, "VNC设置参数为： %s\n", buf);
	
	if((strncmp(buf,"VNC", 3)) == 0)
	{
	    system("sudo vncserver -geometry 1300x670");
		system("date >> /home/pi/github/www_log.txt");
		system("ps -ef|grep -i vnc >> /home/pi/github/www_log.txt");
		cgiHeaderContentType("text/html"); 
		fprintf(cgiOut, "<HTML><HEAD>"); 
		fprintf(cgiOut, "<TITLE>操作提示</TITLE></HEAD>"); 
		fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
		fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../setting1.html\">");
		fprintf(cgiOut, "<H2>提交<font color=\"#FF0000\" size=\"+3\">成功！</font>请检查VNC能否连接上！本页面3秒后自动关闭。</H2>");	
		fprintf(cgiOut, "<H2>VNC设置<font color=\"#FF0000\">%s</font></H2>", buf);
		fprintf(cgiOut, "<script type=\"text/jscript\">");
		fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
		fprintf(cgiOut, "</script>");
		fprintf(cgiOut, "</BODY>"); 
		fprintf(cgiOut, "</HTML>");
		fflush(stdout);	
	}
	else if( (strncmp(buf,"kill", 4)) == 0 )
	{
	
		for(i = 0; i < VNC_NUM; i++)
		{	
			sprintf(buf,"sudo vncserver -kill :%d;",i);
			//sprintf(buf,"sudo vncserver -kill :%d;",i);
			//printf("%s\n",buf);
			system(buf);
		}
		system("date >> /home/pi/github/www_log.txt");
	    //system("ps -ef|grep -i vnc >> /home/pi/github/www_log.txt");
	    system("netstat -tulpn | grep vnc >> /home/pi/github/www_log.txt");

		cgiHeaderContentType("text/html"); 
		fprintf(cgiOut, "<HTML><HEAD>"); 
		fprintf(cgiOut, "<TITLE>操作提示</TITLE></HEAD>"); 
		fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
		fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../setting1.html\">");
		fprintf(cgiOut, "<H2>请稍后<font color=\"#FF0000\" size=\"+3\"></font>正在关闭VNCserver设置！本页面3秒后自动关闭。</H2>");
		fprintf(cgiOut, "<H2>VNC设置<font color=\"#FF0000\">%s</font></H2>", buf);
		fprintf(cgiOut, "<script type=\"text/jscript\">");
		fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
		fprintf(cgiOut, "</script>");
		fprintf(cgiOut, "</BODY>"); 
		fprintf(cgiOut, "</HTML>");
		fflush(stdout);	
	}
	else
	{
		
		for(i = 0; i < VNC_NUM; i++)
		{	
			sprintf(buf,"vncserver -kill :%d;",i);
			//sprintf(buf,"sudo vncserver -kill :%d;",i);
			//printf("%s\n",buf);
			system(buf);
		}
		cgiHeaderContentType("text/html"); 
		fprintf(cgiOut, "<HTML><HEAD>"); 
		fprintf(cgiOut, "<TITLE>操作提示</TITLE></HEAD>"); 
		fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
		fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../setting1.html\">");
		fprintf(cgiOut, "<H2>输入不正确<font color=\"#FF0000\" size=\"+3\"></font>请检查VNCserver设置！本页面3秒后自动关闭。</H2>");
		fprintf(cgiOut, "<H2>VNC设置<font color=\"#FF0000\">%s</font></H2>", buf);
		fprintf(cgiOut, "<script type=\"text/jscript\">");
		fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
		fprintf(cgiOut, "</script>");
		fprintf(cgiOut, "</BODY>"); 
		fprintf(cgiOut, "</HTML>");
		fflush(stdout);	
	}
	fclose(fp);
	return 0; 
}
