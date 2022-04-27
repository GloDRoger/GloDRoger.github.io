const modules = require('./exportModules')

export const dynamicImportComponents = (componentName) => {
    if (!modules.components[componentName]) {
        return null
    }
    return modules.components[componentName]().default
}

export const dynamicImportView = (viewName) => {
    return modules.view[viewName]
}

/**
 * 配置参数说明
 */
export const config = {
    BasicTemplate_x22: {
        userBg: true,
    },
}
