


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
    }else {
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
    }else {
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
    }else {
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
    }else {
        callback("用户名应为2~10位之间");
    }
}