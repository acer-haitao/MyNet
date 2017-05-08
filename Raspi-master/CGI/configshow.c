#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>
#include "cgic.h"
#include "getset_configmsg.h"
#define bit 2


int dropsmb(char *str)
{
	while(*str)
	{
		if (*str == ',')
		{
			*str = '\0';
		}
		str++;
	}
	return 0;
}

int getconfigmsg(configmsg *MSG)
{
	FILE *fp = fopen(FILEPATH, "r");
	char buf[1024];
	char *p = NULL;

	int linesize = 0;

	if(fp == NULL)
	{
		printf("fopen failed\n");
		return -1;
	}

	while(fgets(buf,1024,fp) != NULL)
	{	

#if 1
		//去掉行尾的\n
		linesize = strlen(buf);
		if(buf[linesize - 1] == '\n')
		{
			buf[linesize -1] = '\0';
		}
#endif
		if((p = strstr(buf,"成功登录:")) != NULL) //登录时间
		{
			p = p + strlen("成功登录:");
			sprintf(MSG->gateway_ID,"%s",p);
			printf("%s\n",MSG->gateway_ID);

		}	
#if 0
		else if((p = strstr(buf,"无线IP:")) != NULL)
		{
			p = p + strlen("无线IP:");
			sprintf(MSG->ipaddr,"%s\n",p);
			printf("%s\n",MSG->ipaddr);
		}
#endif
		else if((p = strstr(buf,"serv_port_up")) != NULL)
		{
			p = p + strlen("serv_port_up") + bit;
			dropsmb(p);
			sprintf(MSG->serv_port_up,"%s",p);
			
		}
#if 1
		else if((p = strstr(buf,"serv_port_down")) != NULL)
		{
			p = p + strlen("serv_port_down") + bit;
			dropsmb(p);
			sprintf(MSG->serv_port_down,"%s",p);
		}
		else if((p = strstr(buf,"keepalive_interval")) != NULL)
		{
			p = p + strlen("keepalive_interval") + bit;
			dropsmb(p);
			sprintf(MSG->keepalive_interval,"%s",p);
		}
		else if((p = strstr(buf,"/dev/root")) != NULL)
		{
			p = p + strlen("/dev/root");
			sprintf(MSG->stat_interval,"%s",p);
			printf("%s\n",MSG->stat_interval);
		}
		else if((p = strstr(buf,"CPU温度:")) != NULL)
		{
			p = p + strlen("CPU温度:");
			sprintf(MSG->push_timeout_ms,"%s",p);
			printf("CPU温度%s\n",MSG->push_timeout_ms);
		}
		else if((p = strstr(buf,"主机信息:")) != NULL)
		{
			p = p + strlen("主机信息:");
			sprintf(MSG->forward_crc_valid,"%s",p);
			printf("主机信息%s\n",MSG->forward_crc_valid);
		}
		else if((p = strstr(buf,"forward_crc_error")) != NULL)
		{
			p = p + strlen("forward_crc_error") + bit;
			dropsmb(p);
			sprintf(MSG->forward_crc_error,"%s",p);
		}

		else if((p = strstr(buf,"无线IP:")) != NULL)
		{
			p = p + strlen("无线IP:");
			sprintf(MSG->forward_crc_disabled,"192.168.4.103%s",p);
			printf("%s\n",MSG->forward_crc_disabled);
		}
#endif
	}
	fclose(fp);
	return 0;
}


int cgiMain()
{

	//生成系统信息保存到log文件	
	system("/home/pi/github/ip_cpu_sd_info.sh >> /home/pi/github/pc_info.log");
	system("sudo chmod 777 /home/pi/github/pc_info.log");
	
	configmsg MSG;
	getconfigmsg(&MSG);

	cgiHeaderContentType("text/html"); 
	fprintf(cgiOut, "<HTML><HEAD>"); 
    fprintf(cgiOut, "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>");  
	fprintf(cgiOut, "<TITLE>当前系统信息</TITLE>");  
	fprintf(cgiOut, "<style type=\"text/css\"> body,td,th {font-size: 12px;margin-left: 0px;margin-top: 0px;}</style></HEAD>"); 
	fprintf(cgiOut, "<BODY BGCOLOR=\"#F8F9FA\">"); 
	fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3\">");

#if 1
		fprintf(cgiOut, "<tr>");	
		fprintf(cgiOut, 		"<H2>登录时间:<font color = \"#FF0000\">%s</font></H2>", MSG.gateway_ID);
	//	fprintf(cgiOut, 		"<H2>Web服务器是否开启:<font color=\"#FF0000\">%s</font></H2>", MSG.serv_port_down);
	//	fprintf(cgiOut, 		"<H2>Oray是否在线:<font color = \"#FF0000\">%s</font></H2>", MSG.keepalive_interval);
		fprintf(cgiOut,			"<H2>磁盘信息:<font color=\"#FF0000\">%s容量-已用-可用-已用百分比</font></H2>",MSG.stat_interval);
		fprintf(cgiOut, 		"<H2>CPU温度:<font color=\"#FF0000\">%f摄氏度</font></H2>", (float)atoi(MSG.push_timeout_ms)/1000);
		fprintf(cgiOut, 		"<H2>主机信息:<font color = \"#FF0000\">%s</font></H2>", MSG.forward_crc_valid);
	    fprintf(cgiOut, 		"<H2>IP地址:<font color = \"#FF0000\">%s</font></H2>", MSG.forward_crc_disabled);
		
		fprintf(cgiOut, 		"<td height=\"30\" align=\"center\" valign=\"middle\" width=\"15%%\">-</td>");
		fprintf(cgiOut, 		"<td height=\"30\" align=\"center\" valign=\"middle\" width=\"45%%\"></td>");
		fprintf(cgiOut, 	"</tr>");
#endif	
	fprintf(cgiOut, "</table>");
	fprintf(cgiOut, "<script type=\"text/jscript\">");
	fprintf(cgiOut, "setTimeout(\"self.close()\", 30000)");
	fprintf(cgiOut, "</script>");
	fprintf(cgiOut, "</BODY>"); 
	fprintf(cgiOut, "</HTML>");
	fflush(stdout);
	system("sudo rm /home/pi/github/pc_info.log");
	return 0;
}
