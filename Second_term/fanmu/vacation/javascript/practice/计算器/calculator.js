window.onload = function() {
    //  获取框中的值
    var oInput = document.getElementsByTagName("input")[0];

    //  获取按钮中的值
    var oKey = document.getElementsByClassName("keyboard")[0];
    var oBtn = oKey.getElementsByTagName("button");

    //  运算中的值  以后存值运算
    var first = "";
    var second = "";

    //  运算符  以后存值判断    
    var operator = "";

    for (var i = 0; i < oBtn.length; i++) {
        oBtn[i].onclick = function() {
            if ((!isNaN(this.lastChild.nodeValue)) && ((oInput.value == "0") || (isNaN(oInput.value)))) {

                oInput.value = this.lastChild.nodeValue;                              /*当输入框是0或是符号时 替代输入*/

            } else if (isNaN(this.lastChild.nodeValue) && isNaN(oInput.value)) { 

                oInput.value = "0";                                        /*不能输入两个符号，清零*/

            } else if ( oInput.value.indexOf(".")>0 && this.lastChild.nodeValue == ".") { 

                oInput.value = "0";                                        /*不能输入两个小数点，清零*/

            } else if ((!isNaN(this.lastChild.nodeValue) && !isNaN(oInput.value)) || (this.lastChild.nodeValue == ".")) {

                oInput.value += this.lastChild.nodeValue;                             /*数字或点连接输入*/

            } else if (this.lastChild.nodeValue == "AC") {                            /*AC清零*/
                                              
                    oInput.value = "0";                                     //框清零
                    first = 0;                                              //变量清零
                    second = 0;
                    operator = "";

            } else if (this.lastChild.nodeValue == "←") {                             /*退格*/

                if (oInput.value.length == 1) {                             //如果框中长度为1
                    oInput.value = "0";                                     //框值变为0

                } else {                                                    //如果框中长度大于1
                    oInput.value = oInput.value.substring(0, oInput.value.length - 1);//截取第一位到倒数第二位的字符
                }
            } else if ((this.lastChild.nodeValue == "+") || (this.lastChild.nodeValue == "-") || (this.lastChild.nodeValue == "×") || (this.lastChild.nodeValue == "÷")) { //运算方法
                if (operator === "") {                                      /*如果不是连算————到等号时进行运算*/
                    first = oInput.value;                                   //把框赋值给first
                    operator = this.getAttribute("value");                  //提取运算符并保存

                    oInput.value = this.getAttribute("value");              //提取运算符赋值给框

                } else {                                                    /*如果时连算————直接进行运算*/
                    second = oInput.value;                                  //把框赋值给second
                    calculate(operator, oInput, first, second);             //进行运算
                    alert(first + operator + second + "=" + oInput.value);  //弹框提示用户进行的运算
                    first = oInput.value;                                   //把结果赋值给first，以进行下次运算

                    oInput.value = this.getAttribute("value");              //提取运算符赋值给框
                    operator = this.getAttribute("value");                  //提取运算符并保存
                }

            } else if (this.lastChild.nodeValue == "=") {                             /*正常运算*/

                second = oInput.value;                                      //把框值保存到second
                alert(first + operator + second);                           //弹框提示用户进行的运算
                calculate(operator, oInput, first, second);                 //进行运算
                operator = "";                                              //运算后将符号清零

            }
        }
    }
}


function calculate(operator, oInput, first, second) {
    /*运算方法判定及运算*/
    switch (operator) {
        case "+":
            oInput.value = parseFloat(first) + parseFloat(second);
            break;
        case "-":
            oInput.value = parseFloat(first) - parseFloat(second);
            break;
        case "*":
            oInput.value = parseFloat(first) * parseFloat(second);
            break;
        case "/":
            oInput.value = parseFloat(first) / parseFloat(second);
            break;
    }
}
