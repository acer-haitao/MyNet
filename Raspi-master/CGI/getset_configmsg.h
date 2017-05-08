/*************************************************************************
    > File Name: getset_configmsg.h
    > Author: yuhaitao
    > Mail:acer_yuhaitao@163.com 
    > Created Time: Sat 10 Sep 2016 11:06:56 AM CST
 ************************************************************************/

#ifndef 	_GETSET_CONFIGMSG_
#define     _GETSET_CONFIGMSG_
#define N 512

typedef struct {
	char gateway_ID[N];
	char server_address[N];
	char serv_port_up[N];
	char ipaddr[60];
	char serv_port_down[N];
	char keepalive_interval[N];
	char stat_interval[N];
	char push_timeout_ms[N];
	char forward_crc_valid[N];
	char forward_crc_error[N];
	char forward_crc_disabled[N];
}configmsg;

#define  FILEPATH "/home/pi/github/pc_info.log"
int  getconfigmsg(configmsg *MSG);
int  setconfigmsg(configmsg *MSG, char *inbuf);
#endif
