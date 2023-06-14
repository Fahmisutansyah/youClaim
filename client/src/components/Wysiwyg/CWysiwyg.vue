<template>
  <QuillEditor 
    @editorChange="onChange"
    ref="myEditor"
    :options="options"
    />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  data(){
    return {
      options: {
        theme: 'snow',
      }
    }
  },
  methods:{
    onChange(){
      this.$emit('getHtml', this.$refs.myEditor.getHTML())
    }
  }
}
</script>

<style>

</style>