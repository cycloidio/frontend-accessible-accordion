import { defineComponent, h, inject, onMounted, ref, watch } from 'vue'
import { focusableElements } from '@/utils'

export default defineComponent({
  name: 'accordion-panel-content',

  props: {
    index: { type: Number, required: true },
    panel_id: { type: String, required: true }
  },

  setup (props, { slots, attrs }) {
    const activeIndexes = inject('activeIndexes', ref(0))
    const panelRef = ref()

    const setNegativeTabindexOnFocusableChildren = () => {
      const focusableElementsInPanel = panelRef.value.querySelectorAll(focusableElements)

      Array.from(focusableElementsInPanel).forEach((el) => el.setAttribute('tabindex', '-1'))
    }

    const restoreTabindexOnFocusableChildren = () => {
      const previouslyFocusableElementsInPanel = panelRef.value.querySelectorAll('[tabindex="-1"]')

      Array.from(previouslyFocusableElementsInPanel).forEach((el) => el.setAttribute('tabindex', '0'))
    }

    onMounted(() => {
      if (!activeIndexes.value.includes(props.index) && panelRef.value) {
        setNegativeTabindexOnFocusableChildren()
      }
    })

    watch(
      () => activeIndexes.value,
      (newValue, oldValue) => {
        if (newValue.includes(props.index)) {
          restoreTabindexOnFocusableChildren()
        } else if (oldValue.includes(props.index)) {
          setNegativeTabindexOnFocusableChildren()
        }
      }
    )

    return () =>
      h(
        'div',
        {
          ...attrs,
          class: ['accordion__panel-content', attrs.class || ''].join(' ').trim(),
          hidden: !activeIndexes.value.includes(props.index),
          role: 'region',
          'aria-labelledby': `${props.panel_id}-toggle`,
          id: `${props.panel_id}-content`,
          ref: panelRef
        },
        slots.default ? slots.default() : []
      )
  }
})
