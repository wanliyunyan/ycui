import { defineComponent, PropType, unref, computed } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";

let scriptUrls = [];
let MyIconFont: any;

export default defineComponent({
  name: "IconFont",
  props: {
    type: {
      type: String as PropType<string>,
      default: "",
    },
    prefix: {
      type: String,
      default: "icon-",
    },
    color: {
      type: String as PropType<string>,
      default: "unset",
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 14,
    },
    scriptUrl: {
      // 阿里图库字体图标路径
      type: String as PropType<string | string[]>,
      default: "",
    },
  },
  setup(props, { attrs }) {
    // 如果外部传进来字体图标路径，则覆盖默认的
    if (props.scriptUrl) {
      scriptUrls = [...new Set(props.scriptUrl)];
      MyIconFont = createFromIconfontCN({
        scriptUrl: scriptUrls,
      });
    }

    const wrapStyleRef = computed(() => {
      const { color, size } = props;

      const fs = Number(size);

      return {
        color,
        fontSize: `${fs}px`,
      };
    });

    return () => {
      const { type, prefix } = props;

      return type ? (
        <MyIconFont
          type={type.startsWith(prefix) ? type : `${prefix}${type}`}
          {...attrs}
          style={unref(wrapStyleRef)}
        />
      ) : null;
    };
  },
});
