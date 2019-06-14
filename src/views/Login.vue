<template>
  <div class="login-container">
    <button @click="login">登录</button>
  </div>
</template>
<script>
import { setItem } from '@/assets/js/utils'
export default {
  methods: {
    login () {
      setItem('Authorization', 'xxx')

      this.$router.push('/')
    }
  }
}
</script>
