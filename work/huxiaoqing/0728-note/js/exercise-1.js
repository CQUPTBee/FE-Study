window.onload=function ()
{
	var  oImag=document.getElementsTagName('img');
	var oInf=document.getElementsTagName('inf');

	oInf.onclick=function ()
	{	
		console.log(oInf);
		oInf.style.display='block';
	};
};