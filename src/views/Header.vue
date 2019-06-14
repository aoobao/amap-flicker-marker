<template>
  <div class="header-container">
    <div class="logo">
      logo
    </div>
    <div class="menu">
      <span class="menu-item">隐患监测</span>
      <span class="menu-item">研判分析</span>
      <span class="menu-item">统计报表</span>
      <span class="menu-item">数据管理</span>
      <span class="menu-item">系统设置</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5rem;
    background-color: red;
  }
  .menu {
    .menu-item {
      margin: 0 20px;
    }
  }
}
</style>
