import { defineComponent, h, inject, ref } from 'vue'

export default defineComponent({
  name: 'accordion-panel',

  props: {
    index: { type: Number, required: true }
  },

  setup (props, { slots, attrs }) {
    const activeIndexes = inject('activeIndexes', ref(0))

    const children = []

    const panelHeader = slots.default
      ? slots
        .default()
        .filter((node) => node.type.name === 'accordion-panel-header')
        .shift()
      : null
    if (panelHeader) {
      children.push(panelHeader)
    }

    const panelContent = slots.default
      ? slots
        .default()
        .filter((node) => node.type.name === 'accordion-panel-content')
        .shift()
      : null

    if (panelContent) {
      children.push(panelContent)
    }

    return () => {
      const id =
        attrs.id ||
        `tab-${Math.random()
          .toString(36)
          .substr(2, 9)}`

      return h(
        'div',
        {
          ...attrs,
          class: [
            'accordion__panel',
            activeIndexes.value.includes(props.index) ? 'is-active' : '',
            attrs.class
          ]
            .join(' ')
            .trim(),
          id: id
        },
        children.map((child) =>
          h(child, {
            index: props.index,
            panel_id: id,
            'data-index': props.index
          })
        )
      )
    }
  }
})
