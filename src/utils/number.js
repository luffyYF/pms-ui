/**
 * Created by jiachenpan on 16/11/18.
 */


/**
 * 四舍五入，对原生的toFixed精度丢失问题修复
 * @param num 值
 * @param s 精度
 * @returns {string}
 */
export function MyToFixed(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des;
}

/**
 * js计算解决精度丢失,常用于金额计算
 *
 * 用例：calcOperation.add(a,b,digits) ：加
 *      calcOperation.subtract(a,b,digits) ：减
 *      calcOperation.multiply(a,b,digits) ：乘
 *      calcOperation.divide(a,b,digits)  ：除
 * 参数说明：
 *      a {number} 运算数1
 *      b {number} 运算数2
 *      digits {number} 精度(可选)，保留的小数点数，比如 2, 即保留为两位小数
 */
export class CalcOperation {
    /*
     * 判断obj是否为一个整数
     */
    isInteger(obj) {
        return Math.floor(obj) === obj
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    toInteger(floatNum) {
        var ret = {times: 1, num: 0}
        if (this.isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi  = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len    = strfi.substr(dotPos+1).length
        var times  = Math.pow(10, len)
        var intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times  = times
        ret.num    = intNum
        return ret
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    operation(a, b, op) {
        var o1 = this.toInteger(a)
        var o2 = this.toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                result = (n1 / n2) * (t2 / t1)
                return result
        }
    }

    // 加减乘除的四个接口
    add(a, b, digits) {
        if(digits === undefined || digits === null || digits === ''){
            return this.operation(a, b, 'add');
        }else{
            return MyToFixed(this.operation(a, b, 'add'),digits);
        }
    }
    subtract(a, b, digits) {
        if(digits === undefined || digits === null || digits === ''){
            return this.operation(a, b, 'subtract');
        }else{
            return MyToFixed(this.operation(a, b, 'subtract'),digits);
        }
    }
    multiply(a, b, digits) {
        if(digits === undefined || digits === null || digits === ''){
            return this.operation(a, b, 'multiply');
        }else{
            return MyToFixed(this.operation(a, b, 'multiply'),digits);
        }
    }
    divide(a, b, digits) {
        if(digits === undefined || digits === null || digits === ''){
            return this.operation(a, b, 'divide');
        }else{
            return MyToFixed(this.operation(a, b, 'divide'),digits);
        }
    }

    // exports
    // return {
    //     add: add,
    //     subtract: subtract,
    //     multiply: multiply,
    //     divide: divide
    // }
}
