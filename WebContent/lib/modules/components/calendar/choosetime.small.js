/**
 * 时间选择控件
 *  @author Xiaoyin Song
 *  
 *  v 1.0.0
 *  
 *  
 *  对范围日历的一个包装，继承与choosetime.js，
 *  没有确定取消按钮
 * 	new ChooseTimeSmall({
 *		caleNum:1,
 *		location:"left",
 *		startTime:"2013-11-16",
 *      endTime: "2013-11-17",
 *		inputElem:document.getElementById("buttontime7"),
 * 		triggerElem:document.getElementById("buttontime7")
 *	});
 * 
 */
define(function(require, exports, module) {
	require("modules/components/calendar/calendar.css");
	var BaseClass=require("modules/components/calendar/choosetime.js");
	
	var ChooseTime=Class(BaseClass,{	
		destroyModle : function() {
			delete this.Modle;
		},
		Modle : {
			modle : ['<table border="0" cellspacing="0" cellpadding="0">',
                       '<tr>',
                          '<td valign="top">',
                            '<input  type="hidden" id="startmonth@{id}" value="" />',
                            '<input  type="hidden" id="endmonth@{id}" value=""  />',
                             '<div id="choose@{id}"></div>',
                          '</td>',
                        '</tr>', 
//                        '<tr>',
//                          '<td align="center">',                                     
//                          '<button  type="button" class="btn btn-primary" style="margin-left:0px;" id="submit@{id}">应用</button>',              
//                          '<button   type="button" data-bb-handler="cancel" class="btn btn-default" style="margin-left:5px;" id="cancel@{id}">取消</button>',               
//                          '</td>',                          
//                       '</tr>',
                      '</table></form>'
			         ].join(""),
			modleTem : null,
			initialize : function(Template) {
				
				this.modleTem = new Template(this.modle);
				this.sign = false;
			},
			getElemEx : function(options) {
				return this.modleTem.compile(options);
			},
			sign : true
		},	
		show:function(x,y){
            if(this.elem==null){
				
	        	this.createElem();
	        	this.Manager.push(this.elem.id,this);
	        	this.eventElem();	
			}
			this.Manager.hide(this.elem.id);
			if(x&&y){
		    this.elem.style.top=y+"px";
			 
		    if(this.options.location=="left"){
		        this.elem.style.left=x+"px";
		    }else{
		    	this.elem.style.right=x+"px";
		    }
			}
			this.elem.style.display="block";
		},

		getSubmitButton:function(){
			return this.$$("submit"+this.id);
		},
		inputMonthClick:function(e){
			var elem = e.target || e.srcElement;
			this.clearInput();
			elem.style.border="3px solid #07C";
		},
		inputMinuteClick:function(e){
			var elem = e.target || e.srcElement;
			this.clearInput();
			elem.style.border="3px solid #86BE2B";
		},
		submitClick:function(){
			this.$$(this.options.inputElem).innerHTML=this.getRange();
			this.options.onOk();
			this.hide();
		},
		eventElem:function(){
			this._stopPropagation=this.bind(this,this.stopPropagation);
			$(this.elem).on('click',this._stopPropagation);
			this._submitClick=this.bind(this,this.submitClick);
			this._hide=	this.bind(this,this.hide);
			$("#submit"+this.id).on("click",this._submitClick);
			$("#cancel"+this.id).on("click",this._hide);		
		},
		getRange:function(){
			return this.$$("startmonth"+this.id).value+" - "+this.$$("endmonth"+this.id).value;
		},
		getStartTime:function(){
			return this.$$("startmonth"+this.id).value;
		},
		getEndTime:function(){
			return this.$$("endmonth"+this.id).value;
		},
        createElem:function(){
        	this.id=this.randomId();
        	this.elem = document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
        	this.elem.id=this.id;
        	this.elem.className="panel panel-info _song_choosetime";
        	this.elem.style.display="none";
        	this.flag=true;
        	this.panelBody=document.createElement("div");
        	this.panelBody.className="panel-body";
        	this.elem.appendChild(this.panelBody);
			this.panelBody.innerHTML=this.Modle.getElemEx({
				id:this.id
			});
			var startTimeYearArr=this.options.startTime.split("-");
			var endTimeYearArr= this.options.endTime.split("-");
			
			this.calendarGroupObj=new this.options.CalendarGroup({
				inputElem:this.options.inputElem,
				caleNum:this.options.caleNum,
				papa:this,
			    Start:{
		            year:parseInt(startTimeYearArr[0], 10),
		            month:parseInt(startTimeYearArr[1], 10),
		            day:parseInt(startTimeYearArr[2], 10)
	            },
	            End:{
		            year:parseInt(endTimeYearArr[0], 10),
		            month:parseInt(endTimeYearArr[1], 10),
		            day:parseInt(endTimeYearArr[2], 10)        	
	            },
                StartElem:this.$$("startmonth"+this.id),
                EndElem:this.$$("endmonth"+this.id),
				Container:this.$$("choose"+this.id)
			});
		
			if(this.options.inputElem){this.options.inputElem.innerHTML=this.getRange();}
			
        },
        initialize : function(options) {
        	this.elem=null;
			this.setOptionsValue();
			this.setOptions(options);
			if(this.Manager.sign){
				this.Manager.initialize();
			}
			if (this.Modle.sign) {	
				this.Modle.initialize(this.template());
			}
			this._documentClick=this.bind(this,this.documentClick);
			this._inputElemClick=this.bind(this,this.inputElemClick);
			$(this.options.triggerElem).on('click',this._inputElemClick);
			this.flag=true;

	    },
	    destroy:function(){
	    	if(this.elem!=null){
	    		 this.calendarGroupObj.destroy();
		    	 this.calendarGroupObj=null;
		    	
				 $(this.elem).off('click',this._stopPropagation);
				 
				 $("#submit"+this.id).off("click",this._submitClick);
				 $("#cancel"+this.id).off("click",this._hide);
				 
				 this.Manager.remove(this.elem.id);
				 document.body.removeChild(this.elem);
				 this.elem=null;
				 this.panelBody=null;
	    	}
	    }
	});
	module.exports=ChooseTime;
});