    function Calculator(){
        
        this.calculation=function(num1,num2,operation){
            var res=0;
            switch(operation){
                case "+":
                    res=num1+num2;
                    break;
                case "-":
                    res=num1-num2;
                    break;
                case "*":
                    res=num1*num2;
                    break;
                case "/":
                    res=num1/num2;
                    break;
                case "%":
                    res=num1%num2;
                    break;
            }
            return res;
        }
    }
    var calculator=new Calculator();
    var val=0; 
    var num=0;
    var temp=0;     
    var operation="";

    
    function inputEvent(e){
    
        val=e.value
        var inputScreen=document.getElementById("caculator_screen");       
        inputScreen.value+=val; 
        
        num=parseFloat(inputScreen.value);
        
    }

    function inputPCB(e){
        var inputScreen=document.getElementById("caculator_screen");
        if(e.value=="AC"){
            inputScreen.value="";
        }
    }

    
    function inputoperation(e){

        operation=e.value;
        if (e.value=="+"){
            var inputScreen=document.getElementById("caculator_screen");
            temp=parseFloat(inputScreen.value);
            inputScreen.value="";                        
        }else if(e.value=="-"){
            var inputScreen=document.getElementById("caculator_screen");
            temp=parseFloat(inputScreen.value);
            inputScreen.value="";
        }else if(e.value=="*"){
            var inputScreen=document.getElementById("caculator_screen");
            temp=parseFloat(inputScreen.value);
            inputScreen.value="";
        }else if(e.value=="/"){
            var inputScreen=document.getElementById("caculator_screen");
            temp=parseFloat(inputScreen.value);
            inputScreen.value="";
        }
        else if(e.value=="%"){
            var inputScreen=document.getElementById("caculator_screen");
            temp=parseFloat(inputScreen.value);
            inputScreen.value="";
        }
    }

    function inputEquel(e){

        var inputScreen=document.getElementById("caculator_screen");        
        if(e.value=="="){
            inputScreen.value=calculator.calculation(temp,num,operation);
        }
    }