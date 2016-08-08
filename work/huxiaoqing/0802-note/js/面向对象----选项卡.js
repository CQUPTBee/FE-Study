var aBtn=null;
var aDiv=null;

window.onload=function () {

	var oTab=new TableSwitch('div1');
}
function TableSwitch()
		{
			var oDiv=document.getElementById('div1')
			this.aBtn=oDiv.getElementsByTagName('input');
			this.aDiv=oDiv.getElementsByTagName('div');
			var i=0;
			var _this=this;

			for (var i = 0;i<this.aBtn.length; i++) 
			{
					this.aBtn[i].index=i;
					this.aBtn[i].onclick=function () {

						 _this.tab(this);
					}
				}	
		};

TableSwitch.prototype.tab = function (aBtn)
			{
				for(i=0; i<this.aBtn.length; i++)
				{
					aBtn[i].className=' ';
					aDiv[i].style.display='none';
				}
				aBtn.className='active';
				this.aDiv[aBtn.index].style.display='block';
			};
		