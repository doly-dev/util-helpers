const config = {
  // 禁用警告
  disableWarning: false
}

// 设置禁止警告提示
function setDisableWarning(bool) {
  config.disableWarning(!!bool);
}

export {
  config,
  setDisableWarning
}