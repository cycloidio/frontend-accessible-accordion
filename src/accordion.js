import { defineComponent, h, provide, ref, watch } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Array, required: false, default: () => [] },
    headerTag: { type: String, required: false, default: 'h3' },
    collapsible: { type: Boolean, required: false, default: true },
    expandable: { type: Boolean, required: false, default: false }
  },

  setup (props, { emit, slots, attrs }) {
    const activeIndexes = ref(props.modelValue.slice())

    provide('activeIndexes', activeIndexes)
    provide('headerTag', props.headerTag)
    provide('collapsible', props.collapsible)
    provide('expandable', props.expandable)

    watch(
      () => activeIndexes.value,
      (newValue, oldValue) => {
        if (newValue && newValue.join('') !== oldValue.join('') && newValue.join('') !== props.modelValue.join('')) {
          emit('update:modelValue', newValue.slice())
        }
      }
    )

    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        if (
          newValue &&
          oldValue &&
          newValue.join('') !== oldValue.join('') &&
          newValue.join('') !== activeIndexes.value.join('')
        ) {
          activeIndexes.value = newValue
        }
      },
      {
        immediate: true
      }
    )

    const getAccordionGroups = () => {
      const defaultSlot = slots.default ? slots.default() : []

      let accordionGroups = []

      defaultSlot
        .filter(
          (node) =>
            node.type.name === 'accordion-panel' ||
            (typeof node.type === 'symbol' && node.type.description === 'Fragment')
        )
        .forEach((node) => {
          if (typeof node.type === 'symbol' && node.type.description === 'Fragment') {
            accordionGroups = accordionGroups.concat(
              node.children.filter((vnode) => vnode.type.name === 'accordion-panel')
            )
          } else {
            accordionGroups.push(node)
          }
        })

      return accordionGroups
    }

    return () => {
      const accordionGroups = getAccordionGroups()

      return h(
        'div',
        {
          ...attrs,
          class: 'accordion'
        },
        accordionGroups.map((child, childIndex) =>
          h(child, { index: childIndex, 'data-index': childIndex })
        )
      )
    }
  }
})
