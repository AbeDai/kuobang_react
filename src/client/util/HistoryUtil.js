import createHistory from 'history/createHashHistory'


const history = createHistory();

/**
 * 跳转到指定页面
 * @param path 绝对路径
 */
export function goToPath(path) {
    history.push(path)
}

/**
 * 获取当前URL
 * @returns {*} 当前URL
 */
export function getCurrentPath() {
    return history.location.pathname;
}