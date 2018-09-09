/**
 * 表单校验条件-验证手机号
 */
export function checkRuleTel(rule, value, callback) {
    let regex = /^1[34578]\d{9}$/;
    if (value) {
        //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
        if (regex.test(value)) {
            callback();
        } else {
            callback('请输入正确的手机号码！');
        }
    } else {
        callback('请输入正确的手机号码！');
    }
}

/**
 * 表单校验条件-密码校验
 */
export function checkRulePassword(rule, value, callback) {
    if (value) {
        let passwordLength = value.length;
        if (passwordLength >= 6 && passwordLength <= 18) {
            callback();
        } else {
            callback("密码长度应为6~18位之间");
        }
    } else {
        callback("密码长度应为6~18位之间");
    }
}

/**
 * 表单校验条件-密码校验
 */
export function checkRulePasswordWithEmpty(rule, value, callback) {
    if (value) {
        let passwordLength = value.length;
        if (passwordLength >= 6 && passwordLength <= 18) {
            callback();
        } else {
            callback("密码长度应为6~18位之间");
        }
    } else {
        callback();
    }
}

/**
 * 表单校验条件-用户名校验
 */
export function checkRuleNickName(rule, value, callback) {
    if (value) {
        let userNameLength = value.length;
        if (userNameLength >= 2 && userNameLength <= 10) {
            callback();
        } else {
            callback("用户名应为2~10位之间");
        }
    } else {
        callback("用户名应为2~10位之间");
    }
}

/**
 * 表单校验条件-编号校验
 */
export function checkRuleBianHao(rule, value, callback) {
    if (checkStringLength(value, 5, 15)) {
        callback();
    } else {
        callback("编号长度应为5~15位之间");
    }
}

/**
 * 表单校验条件-品种校验
 */
export function checkRulePinZhong(rule, value, callback) {
    if (checkStringLength(value, 5, 15)) {
        callback();
    } else {
        callback("品种描述长度应为5~15位之间");
    }
}

/**
 * 表单校验条件-纱织校验
 */
export function checkRuleShaZhi(rule, value, callback) {
    if (checkStringLength(value, 5, 15)) {
        callback();
    } else {
        callback("纱织描述长度应为5~15位之间");
    }
}

/**
 * 表单校验条件-成分校验
 */
export function checkRuleChenFeng(rule, value, callback) {
    if (checkStringLength(value, 5, 15)) {
        callback();
    } else {
        callback("成分描述长度应为5~15位之间");
    }
}

/**
 * 表单校验条件-克重校验
 */
export function checkRuleKeZhong(rule, value, callback) {
    if (checkFloat(value)) {
        callback();
    } else {
        callback("克重应为数字");
    }
}

/**
 * 表单校验条件-门幅校验
 */
export function checkRuleMenFu(rule, value, callback) {
    if (checkFloat(value)) {
        callback();
    } else {
        callback("门幅应为浮点数");
    }
}

/**
 * 表单校验条件-价格校验
 */
export function checkRuleJiaGe(rule, value, callback) {
    if (checkFloat(value)) {
        callback();
    } else {
        callback("价格应为浮点数");
    }
}

/**
 * 表单校验条件-总米数校验
 */
export function checkRuleTotalMiShu(rule, value, callback) {
    if (checkFloat(value)) {
        callback();
    } else {
        callback("总米数应为浮点数");
    }
}

/**
 * 验证内容长度
 */
function checkFloat(value) {
    const number = parseFloat(value);
    return !isNaN(number);
}

/**
 * 验证内容长度
 */
function checkStringLength(value, minLength, maxLength) {
    if (value) {
        let passwordLength = value.length;
        return passwordLength >= minLength && passwordLength <= maxLength;
    } else {
        return false;
    }
}
