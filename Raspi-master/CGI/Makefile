CC=gcc
AFLAGS=-Wall -g  
OBJS=login.cgi configshow.cgi setconfig.cgi send_mail.cgi setVNC.cgi rcv_liuyan.cgi SendMail.cgi 
run:$(OBJS)

$(OBJS):%.cgi:%.c
	$(CC) $(AFLAGS) $< cgic.c -o $@
.PHONY:clean
clean:
	rm *.cgi

