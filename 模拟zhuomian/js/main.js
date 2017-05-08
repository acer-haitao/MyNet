$(function(){
	
	var desktop = new Desktop();    // 桌面图标定义
	desktop.deskmove( );
	desktop.fnsize();

	window.desktop = desktop;
	var zmenu = new Zmenu();        //右键菜单
	zmenu.init();
	zmenu.fnMenu(); 

	var newCell = new NewCell();    //方块格子
	newCell.init();
	newCell.cellOpen();
	
	
	var search = new Search();
	search.init();
	window.search = search;

	var clearBg = new Clearbg();    //桌面导航 背景
	clearBg.init();
	clearBg.showImg();
	clearBg.setNav();
	window.clearBg = clearBg;

	var show3d = new Show3d();      //3d效果
	show3d.init();

	var talk = new Talk();          //我的说说  
	talk.init();
	window.talk = talk;

	var destopc = new Destopc();    // 桌面弹窗
	destopc.init();

	var recom = new Recom();
	recom.init();	
});
