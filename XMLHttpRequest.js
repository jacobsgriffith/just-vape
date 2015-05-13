// JavaScript Document
function SendDataToSP(GetUrlData,CallBackSuccessFunc)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(CallBackSuccessFunc!="" && CallBackSuccessFunc!=null){
				CallBackSuccessFunc(xmlhttp.responseText);			
			}
		}
	}
	xmlhttp.open("GET",GetUrlData,true);
	xmlhttp.send();
}
