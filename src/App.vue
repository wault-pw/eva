<template>
  <StatusThrobberBus />
  <DialogBus />
  <router-view/>
</template>

<style lang="scss">
@import "assets/css/theme.scss";
@import "assets/css/scaffold.scss";
@import "assets/css/components.scss";
</style>

<script>
import StatusThrobberBus from "@/components/Shared/StatusThrobberBus"
import DialogBus from "@/components/Shared/DialogBus"

export default {
  components: {DialogBus, StatusThrobberBus}
}
</script>
