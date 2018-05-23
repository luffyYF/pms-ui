<template>
  <div class="tinymce-container editor-container">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <editorImage color="#20a0ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
  // Import TinyMCE
  import tinymce from 'tinymce'
  import editorImage from './components/editorImage'

  // A theme is also required
  import 'tinymce/themes/modern/theme'
  import '../../../static/tinymce/langs/zh_CN'
  import 'tinymce/skins/lightgray/skin.min.css'
  import 'tinymce/skins/lightgray/content.min.css'
  import 'tinymce/plugins/codesample/css/prism.css'

  // Any plugins you want to use has to be imported
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/anchor'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/autoresize'
  import 'tinymce/plugins/autosave'
  import 'tinymce/plugins/bbcode'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/directionality'
  import 'tinymce/plugins/emoticons'
  import 'tinymce/plugins/fullpage'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/help'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/imagetools'
  import 'tinymce/plugins/importcss'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/legacyoutput'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/nonbreaking'
  import 'tinymce/plugins/noneditable'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/print'
  import 'tinymce/plugins/save'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/spellchecker'
  import 'tinymce/plugins/tabfocus'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/template'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/textpattern'
  import 'tinymce/plugins/toc'
  import 'tinymce/plugins/visualblocks'
  import 'tinymce/plugins/visualchars'
  import 'tinymce/plugins/wordcount'

  export default {
    name: 'tinymce',
    components: {editorImage},
    props: {
      id: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default () {
          return ['removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright']
        }
      },
      menubar: {
        default: ''
      },
      height: {
        type: Number,
        required: false,
        default: 700
      }
    },
    data () {
      return {
        hasChange: false,
        hasInit: false,
        tinymceId: this.id || 'vue-tinymce-' + +new Date()
      }
    },
    watch: {
      value (val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() => tinymce.get(this.tinymceId).setContent(val))
        }
      }
    },
    mounted () {
      this.initTinymce()
    },
    activated () {
      this.initTinymce()
    },
    deactivated () {
      this.destroyTinymce()
    },
    methods: {
      initTinymce () {
        const _this = this
        tinymce.init({
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          // toolbar: this.toolbar,
          toolbar: 'formatselect fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
          theme: 'modern',
          plugins: // 'print preview fullpage powerpaste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
            ['advlist',
              'anchor',
              'autolink',
              'autoresize',
              'autosave',
              'bbcode',
              'charmap',
              'code',
              'codesample',
              'colorpicker',
              'contextmenu',
              'directionality',
              'emoticons',
              'fullpage',
              'fullscreen',
              'help',
              'hr',
              'image',
              'imagetools',
              'importcss',
              'insertdatetime',
              'legacyoutput',
              'link',
              'lists',
              'media',
              'nonbreaking',
              'noneditable',
              'pagebreak',
              'paste',
              'preview',
              'print',
              'save',
              'searchreplace',
              'spellchecker',
              'tabfocus',
              'table',
              'template',
              'textcolor',
              'textpattern',
              'toc',
              'visualblocks',
              'visualchars',
              'wordcount'].join(' '),
          image_advtab: true,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          // imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
          imagetools_toolbar: 'watermark',
          default_link_target: '_blank',
          link_title: false,
          language: 'zh_CN',
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value)
            }
            _this.hasInit = true
            editor.on('NodeChange Change KeyUp', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent({format: 'raw'}))
            })
          },
          templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
          ],
          importcss_append: false,
          content_css: [
            'skin.min.css',
            'content.min.css'
          ]
        })
      },
      destroyTinymce () {
        if (tinymce.get(this.tinymceId)) {
          tinymce.get(this.tinymceId).destroy()
        }
      },
      setContent (value) {
        tinymce.get(this.tinymceId).setContent(value)
      },
      getContent () {
        tinymce.get(this.tinymceId).getContent()
      },
      imageSuccessCBK (arr) {
        const _this = this
        arr.forEach(v => {
          tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
        })
      }
    },
    destroyed () {
      this.destroyTinymce()
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative
  }

  .tinymce-textarea {
    /*visibility: hidden;*/
    z-index: -1;
  }

  .editor-custom-btn-container {
    position: absolute;
    right: 15px;
    /*z-index: 2005;*/
    top: 18px;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>
