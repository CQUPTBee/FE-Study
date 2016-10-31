//加法
function add(a, b) {
    var c, d, e,g;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    finally{
    	e = Math.pow(10, Math.max(c,d));
    }
    return	(mul(a,e) + mul(b,e))/e;
	}

	//减法
function sub(a, b) {
    var c, d, e;
    try {
        c=a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d=b.toString().split(".")[1].length;
    } catch (f) {
        d=0;
    }
    finally{
    	e=Math.pow(10, Math.max(c, d));
    }
    return  (mul(a, e)-mul(b, e)) / e;
}
//乘法
function mul(a,b) {
    var c=0,d=a.toString(),e=b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//除法
function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
	}