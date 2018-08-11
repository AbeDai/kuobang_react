import React from 'react'
import { notification, Icon } from 'antd'

/**
 * 错误通知
 * @param title 标题
 * @param desc 描述
 */
export function notificationError(title, desc) {
    notification['error']({
        message: title,
        description: desc,
        duration: 6,
        icon: <Icon type="frown-o" style={{ color: '#ff112e' }} />,
    })
}

/**
 * 消息通知
 * @param title 标题
 * @param desc 描述
 */
export function notificationInfo(title, desc) {
    notification['info']({
        message: title,
        description: desc,
        duration: 6,
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    })
}
