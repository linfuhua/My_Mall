<template>
    <div>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <slot name="bread"></slot>
          </nav>
        </div>
      </div>
    </div>
</template>
<style>
</style>
<script>
    export default {
        data() {
            return {
                msg: 'hello world'
            }
        }
    }
</script>
