import { defineComponent, h, inject, ref } from 'vue'

export default defineComponent({
  name: 'accordion-panel-header',

  inheritAttrs: false,

  props: {
    index: { type: Number, required: true },
    panel_id: { type: String, required: true }
  },

  setup (props, { slots, attrs }) {
    const activeIndexes = inject('activeIndexes', ref(0))
    const headerTag = inject('headerTag')
    const collapsible = inject('collapsible')
    const expandable = inject('expandable')

    const handleClick = () => {
      if (!activeIndexes.value.includes(props.index)) {
        if (!expandable) {
          activeIndexes.value = []
        }

        activeIndexes.value.push(props.index)
      } else {
        if (collapsible || (!collapsible && activeIndexes.value.length > 1)) {
          activeIndexes.value = activeIndexes.value.filter((i) => i !== props.index)
        }
      }
    }

    const handleKeydown = (event) => {
      const currentIndex = event.target.getAttribute('data-index')
      const accordion = event.target.closest('.accordion')
      let newChildForFocus

      if (event.key === 'ArrowDown') {
        const nextChild = accordion.querySelector(
          `.accordion__panel-header-toggle[data-index="${parseInt(currentIndex) + 1}"]`
        )

        if (nextChild) {
          newChildForFocus = nextChild
        } else {
          newChildForFocus = accordion.querySelector(
            '.accordion__panel:first-child .accordion__panel-header-toggle'
          )
        }
      } else if (event.key === 'ArrowUp') {
        const previousChild = accordion.querySelector(
          `.accordion__panel-header-toggle[data-index="${parseInt(currentIndex) - 1}"]`
        )

        if (previousChild) {
          newChildForFocus = previousChild
        } else {
          newChildForFocus = accordion.querySelector(
            '.accordion__panel:last-child .accordion__panel-header-toggle'
          )
        }
      } else if (event.key === 'Home') {
        newChildForFocus = accordion.querySelector(
          '.accordion__panel:first-child .accordion__panel-header-toggle'
        )
      } else if (event.key === 'End') {
        newChildForFocus = accordion.querySelector(
          '.accordion__panel:last-child .accordion__panel-header-toggle'
        )
      }

      if (newChildForFocus) {
        newChildForFocus.focus()
      }
    }

    return () => {
      const isActive = activeIndexes.value.includes(props.index)

      return h(
        'div',
        { class: 'accordion__panel-header' },
        h(
          headerTag,
          { class: 'accordion__panel-header-heading' },
          h(
            'button',
            {
              ...attrs,
              class: ['accordion__panel-header-toggle', attrs.class || ''].join(' ').trim(),
              id: `${props.panel_id}-toggle`,
              'aria-expanded': isActive,
              'aria-controls': `${props.panel_id}-content`,
              'aria-disabled': isActive && (!collapsible),
              'data-index': props.index,
              onClick: handleClick,
              onKeydown: handleKeydown
            },
            h('span', {
              class: 'accordion__icon'
            }),
            slots.default ? slots.default({ isActive: isActive }) : ['Panel Toggle']
          )
        )
      )
    }
  }
})
