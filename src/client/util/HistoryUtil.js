import {history} from "../index/index"
import createHistory from 'history/createHashHistory'

/**
 * 跳转到指定页面
 * @param path 绝对路径
 */
export function goToPath(path) {
    let finalPath;
    if (typeof path === "string"){
        finalPath = {
            pathname: path,
        };
    }else {
        finalPath = path;
    }
    history.push(finalPath)
}

export function goToPathWithNewHistory(path) {
    createHistory().push(path);
}

/**
 * 获取当前URL
 * @returns {*} 当前URL
 */
export function getCurrentPath() {
    return history.location.pathname;
}