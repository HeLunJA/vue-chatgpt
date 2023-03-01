<script setup>
import navBar from '@/components/navBar.vue'
import { ref } from 'vue'
const activeName = ref(1)
</script>
<template>
  <navBar title="使用教程" />
  <van-collapse v-model="activeName" accordion>
    <van-collapse-item title="回答字数不够?" name="1">
      可以回复【继续】，AI机器人就会接着继续回答了哦。
    </van-collapse-item>
    <van-collapse-item title="对当前内容不是很满意怎么办?" name="2">
      您可以用更具体的需求和关键词再次尝试。
    </van-collapse-item>
    <van-collapse-item title="为什么上下文失效了?" name="3">
      上下文单次会话有效，退出聊天页后再次进入，可以看到历史记录，但上下文会清空。需要重新聊天建立上下文哦。
    </van-collapse-item>
    <van-collapse-item title="有时候为什么回复速度较慢?" name="4">
      当问题复杂或者答案文字较多时，回复时间甚至超过1分钟，当长时间未收到AI回复时，可以尝试“新建”一个对话，过一会再返回查看是否有答案回复。
    </van-collapse-item>
    <van-collapse-item title="为什么出现提示接口请求异常？" name="5">
      有时当前用户使用量较大时，可能会出现错误，可以稍后再试，如果相同问题一直出现错误，可以截图和我们反馈。
    </van-collapse-item>
  </van-collapse>
</template>
<style lang="less" scoped></style>
