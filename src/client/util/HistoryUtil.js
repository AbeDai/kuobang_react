import createHistory from 'history/createHashHistory'

const history = createHistory();

/**
 * 跳转到指定页面
 * @param path 相对路径
 */
export function goToPath(path) {
    history.push(path)
}