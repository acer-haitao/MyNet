#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>
#include <unistd.h>
#include <errno.h>
#include "cgic.h"
#include <time.h> 

#define N 4096



int cgiMain()
{
	char buf_mail[100] = {0}; //字符接收缓冲区
	char buf_txt[N] = {0}; //字符接收缓冲区
	time_t timep;
	time(&timep); 

	FILE *fp;
	fp = fopen("/home/pi/github/www_rcv.txt","a+" );
	if(fp == NULL)
 	{
		printf("open failed\n");
		return -1;
	}

	cgiFormString("ipaddr", buf_mail, 100);
	cgiFormString("liuyan", buf_txt, N);
	
	fprintf(fp, "时间:%s邮箱： %s\n",ctime(&timep), buf_mail);
	fprintf(fp, "留言内容：\n %s", buf_txt);
	fprintf(fp, "\n------------------------------------------------\n");
 	
	cgiHeaderContentType("text/html"); 
	fprintf(cgiOut, "<HTML><HEAD>"); 
	fprintf(cgiOut, "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>"); 
	fprintf(cgiOut, "<TITLE>留言板块</TITLE></HEAD>"); 
	fprintf(cgiOut, "<BODY BGCOLOR=\"#EEF2FB\">"); 
	fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3; url=../index.html\">");
	fprintf(cgiOut, "<H2>提交<font color=\"#FF0000\" size=\"+3\">成功！</font>本页面3秒后自动关闭。</H2>");	
	fprintf(cgiOut, "<H2>谢谢您的参与！<font color=\"#FF0000\">%s</font></H2>", buf_mail);
	fprintf(cgiOut, "<script type=\"text/jscript\">");
	fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
	fprintf(cgiOut, "</script>");
	fprintf(cgiOut, "</BODY>"); 
	fprintf(cgiOut, "</HTML>");
	fflush(stdout);	

	fclose(fp);
	return 0; 
}
