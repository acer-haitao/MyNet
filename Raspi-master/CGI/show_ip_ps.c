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
		if((p = strstr(buf,"gateway_ID")) != NULL)
		{
			p = p + strlen("gateway_ID") + bit;
			dropsmb(p);
			sprintf(MSG->gateway_ID,"%s",p);
			printf("%s\n",MSG->gateway_ID);

		}	
		else if((p = strstr(buf,"server_address")) != NULL)
		{
			p = p + strlen("server_address") + bit;
			dropsmb(p);
			sprintf(MSG->server_address,"%s",p);
		}
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
		else if((p = strstr(buf,"stat_interval")) != NULL)
		{
			p = p + strlen("stat_interval") + bit;
			dropsmb(p);
			sprintf(MSG->stat_interval,"%s",p);
		}
		else if((p = strstr(buf,"push_timeout_ms")) != NULL)
		{
			p = p + strlen("push_timeout_ms") + bit;
			dropsmb(p);
			sprintf(MSG->push_timeout_ms,"%s",p);
		}
		else if((p = strstr(buf,"forward_crc_valid")) != NULL)
		{
			p = p + strlen("forward_crc_valid") + bit;
			dropsmb(p);
			sprintf(MSG->forward_crc_valid,"%s",p);
		}
		else if((p = strstr(buf,"forward_crc_error")) != NULL)
		{
			p = p + strlen("forward_crc_error") + bit;
			dropsmb(p);
			sprintf(MSG->forward_crc_error,"%s",p);
		}
		else if((p = strstr(buf,"forward_crc_disabled")) != NULL)
		{
			p = p + strlen("forward_crc_disabled") + bit; 
			dropsmb(p);
			sprintf(MSG->forward_crc_disabled,"%s",p);
		}
#endif
	}
	fclose(fp);
	return 0;
}


int cgiMain()
{

#if 0
	configmsg MSG ={"gateway_ID","server_address","server_port_up","serv_port_down",\
			"keepalive_interval","stat_interval","push_timeout_ms",
			"forward_crc_valid","forward_crc_error",\
			"forward_crc_disabled"
	};
#endif	
	configmsg MSG;
	getconfigmsg(&MSG);

	cgiHeaderContentType("text/html"); 
	fprintf(cgiOut, "<HTML><HEAD>"); 
	fprintf(cgiOut, "<TITLE>当前配置信息</TITLE>");  
	fprintf(cgiOut, "<style type=\"text/css\"> body,td,th {font-size: 12px;margin-left: 0px;margin-top: 0px;}</style></HEAD>"); 
	fprintf(cgiOut, "<BODY BGCOLOR=\"#F8F9FA\">"); 
	fprintf(cgiOut, "<meta http-equiv=\"refresh\" content=\"3\">");

#if 1
		fprintf(cgiOut, "<tr>");	
		fprintf(cgiOut, 		"<H2>gateway_ID:<font color=\"#FF0000\">%s</font></H2>", MSG.gateway_ID);
		fprintf(cgiOut, 		"<H2>server_address:<font color = \"#FF0000\">%s</font></H2>", MSG.server_address);
		fprintf(cgiOut,			"<H2>serv_port_up:<font color=\"#FF0000\">%s</font></H2>", MSG.serv_port_up);
		fprintf(cgiOut, 		"<H2>serv_port_down:<font color=\"#FF0000\">%s</font></H2>", MSG.serv_port_down);
		fprintf(cgiOut, 		"<H2>keepalive_interval:<font color = \"#FF0000\">%s</font></H2>", MSG.keepalive_interval);
		fprintf(cgiOut,			"<H2>stat_interval:<font color=\"#FF0000\">%s</font></H2>",MSG.stat_interval);
		fprintf(cgiOut, 		"<H2>push_timeout_ms:<font color=\"#FF0000\">%s</font></H2>", MSG.push_timeout_ms);
		fprintf(cgiOut, 		"<H2>forward_crc_valid:<font color = \"#FF0000\">%s</font></H2>", MSG.forward_crc_valid);
		fprintf(cgiOut,			"<H2>forward_crc_error:<font color=\"#FF0000\">%s</font></H2>", MSG.forward_crc_error);
		fprintf(cgiOut, 		"<H2>forward_crc_disabled:<font color=\"#FF0000\">%s</font></H2>", MSG.forward_crc_disabled);
		
		fprintf(cgiOut, 		"<td height=\"30\" align=\"center\" valign=\"middle\" width=\"15%%\">-</td>");
		fprintf(cgiOut, 		"<td height=\"30\" align=\"center\" valign=\"middle\" width=\"45%%\"></td>");
		fprintf(cgiOut, 	"</tr>");
#endif	
	fprintf(cgiOut, "</table>");
	fprintf(cgiOut, "<script type=\"text/jscript\">");
	fprintf(cgiOut, "setTimeout(\"self.close()\", 3000)");
	fprintf(cgiOut, "</script>");
	fprintf(cgiOut, "</BODY>"); 
	fprintf(cgiOut, "</HTML>");
	fflush(stdout);
	return 0;
}
