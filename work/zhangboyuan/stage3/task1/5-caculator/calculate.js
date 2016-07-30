/*
 *     Created by Boyuan on 2016.7.29
 */

window.onload = function () {
    activeCalculator();
};

function activeCalculator() {
    var result = 0;
    var val = "";
    var output_box = document.getElementsByClassName("output-box")[0];

    //获取按钮
    var ca_index = 0;

    var add = document.getElementById("add");   //1
    var sub = document.getElementById("sub");   //2
    var mult = document.getElementById("multiple");
    var div = document.getElementById("division");
    var to_percent = document.getElementById("to-percent");
    var not = document.getElementById("not");
    var AC = document.getElementById("AC");
    var dot = document.getElementById("dot");
    var equal = document.getElementById("equal");
    var nums = new Array(10);
    (function () {
        for (var i = 0; i < 10; i++) {
            nums[i] = document.getElementById("num-" + String(i));
        }
    })();

    //绑定按钮事件
    add.onclick = function () {
        result = val;
        val = "";
        ca_index = 1;
    };
    sub.onclick = function () {
        result = val;
        val = "";
        ca_index = 2;
    };
    mult.onclick = function () {
        result = val;
        val = "";
        ca_index = 3;
    };

    div.onclick = function () {
        result = val;
        val = "";
        ca_index = 4;
    };
    to_percent.onclick = function () {
        val = val._toPercent();
        output(val);
        val = parseFloat(val);
        result = val;
    };
    not.onclick = function () {
        val = -val;
        result = val;
        output(result);
    };
    AC.onclick = function () {
        result = 0;
        val = "";
        output(result);
    };
    dot.onclick = function () {
        val = val + ".";
        output(val);
    };
    equal.onclick = function () {
        switch (ca_index) {
            case 1:
                result = result + val;
                val = result;
                output(result);
                break;
            case 2:
                result = result - val;
                val = result;
                output(result);
                break;
            case 3:
                result=Number(result);
                result = result._mult(val);
                val = result;
                output(result);
                break;
            case 4:
                result=Number(result);
                result = result._div(val);
                val = result;
                output(result);
                break;
        }
    };

    // (function () {
    //     for (var i = 0; i < nums.length; i++) {
    //         nums[i].onclick = function (_i) {
    //             return function () {
    //                 val = val + _i.toString();
    //                 val = Number(val);
    //                 output(val);
    //             }
    //         }(i)
    //     }
    // })();

    (function () {
        for (var i = 0; i < nums.length; i++) {
            nums[i].onclick = function (_i) {
                return function () {
                    if (val.toString().split(".")) {
                        //判断为浮点数
                        val = val + _i.toString();
                    }
                    else {
                        val = val + _i.toString();
                        val = Number(val);
                    }
                    output(val);
                }
            }(i)
        }
    })();

    //除法
    Number.prototype._div = function (arg) {
        var r = this / arg;


        if (typeof (r.toString().split(".")[1]) == "undefined")
            return r;
        if (r.toString().split(".")[1].length > 12) {
            r = r.toFixed(12);
            return r;
        }
        return r;
    };

    //乘法
    Number.prototype._mult = function (arg) {
        var r = this * arg;

        if (typeof (r.toString().split(".")[1]) == "undefined")
            return r;
        if (r.toString().split(".")[1].length > 12) {
            r = r.toFixed(12);
            return r;
        }
        return r;
    };


    //百分数转换
    Number.prototype._toPercent = function () {
        var r = this / 100;

        if (typeof (r.toString().split(".")[1]) == "undefined")
            return r + "%";
        if (r.toString().split(".")[1].length > 12) {
            r = r.toFixed(12);
            return r + "%";
        }
        return r + "%";
    };
//     var nummm=90;
// alert(nummm._toPercent());
    function output(something) {
        output_box.innerHTML = String(something);
    }
}






















