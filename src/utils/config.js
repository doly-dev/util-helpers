const config = {
  // 禁用warning提示
  disableWarning: true
}

/**
 * 设置禁止warning提示
 * @static
 * @alias module:Debug.formatBankCard
 * @since 3.6.1
 * @param {boolean} bool 是否禁止warning提示
 */
function setDisableWarning(bool) {
  config.disableWarning(!!bool);
}

export {
  config,
  setDisableWarning
}