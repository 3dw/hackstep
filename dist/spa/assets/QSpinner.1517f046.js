import { b as useSizeDefaults } from "./use-size.cd9ed164.js";
import { c as computed, k as createComponent, h } from "./index.f08ad2f1.js";
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props) {
  return {
    cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
    classes: computed(
      () => "q-spinner" + (props.color ? ` text-${props.color}` : "")
    )
  };
}
var QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
export { QSpinner as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNwaW5uZXIuMTUxN2YwNDYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci91c2Utc3Bpbm5lci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVNpemVEZWZhdWx0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogJzFlbSdcbiAgfSxcbiAgY29sb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VTcGlubmVyIChwcm9wcykge1xuICByZXR1cm4ge1xuICAgIGNTaXplOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zaXplIGluIHVzZVNpemVEZWZhdWx0c1xuICAgICAgICA/IGAkeyB1c2VTaXplRGVmYXVsdHNbIHByb3BzLnNpemUgXSB9cHhgXG4gICAgICAgIDogcHJvcHMuc2l6ZVxuICAgICkpLFxuXG4gICAgY2xhc3NlczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXNwaW5uZXInICsgKHByb3BzLmNvbG9yID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU3Bpbm5lciwgeyB1c2VTcGlubmVyUHJvcHMgfSBmcm9tICcuL3VzZS1zcGlubmVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTcGlubmVyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVNwaW5uZXJQcm9wcyxcblxuICAgIHRoaWNrbmVzczoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMpIHtcbiAgICBjb25zdCB7IGNTaXplLCBjbGFzc2VzIH0gPSB1c2VTcGlubmVyKHByb3BzKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ3N2ZycsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlICsgJyBxLXNwaW5uZXItbWF0JyxcbiAgICAgIHdpZHRoOiBjU2l6ZS52YWx1ZSxcbiAgICAgIGhlaWdodDogY1NpemUudmFsdWUsXG4gICAgICB2aWV3Qm94OiAnMjUgMjUgNTAgNTAnXG4gICAgfSwgW1xuICAgICAgaCgnY2lyY2xlJywge1xuICAgICAgICBjbGFzczogJ3BhdGgnLFxuICAgICAgICBjeDogJzUwJyxcbiAgICAgICAgY3k6ICc1MCcsXG4gICAgICAgIHI6ICcyMCcsXG4gICAgICAgIGZpbGw6ICdub25lJyxcbiAgICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHByb3BzLnRoaWNrbmVzcyxcbiAgICAgICAgJ3N0cm9rZS1taXRlcmxpbWl0JzogJzEwJ1xuICAgICAgfSlcbiAgICBdKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR08sTUFBTSxrQkFBa0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsSUFDSixNQUFNLENBQUUsUUFBUSxNQUFRO0FBQUEsSUFDeEIsU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUNELE9BQU87QUFDVDtBQUVlLFNBQVMsV0FBWSxPQUFPO0FBQ3pDLFNBQU87QUFBQSxJQUNMLE9BQU8sU0FBUyxNQUNkLE1BQU0sUUFBUSxrQkFDVixHQUFJLGdCQUFpQixNQUFNLFlBQzNCLE1BQU0sSUFDWDtBQUFBLElBRUQsU0FBUztBQUFBLE1BQVMsTUFDaEIsZUFBZSxNQUFNLFFBQVEsU0FBVSxNQUFNLFVBQVc7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFDSDtBQ2pCQSxJQUFBLFdBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFFRCxNQUFPLE9BQU87QUFDWixVQUFNLEVBQUUsT0FBTyxZQUFZLFdBQVcsS0FBSztBQUUzQyxXQUFPLE1BQU0sRUFBRSxPQUFPO0FBQUEsTUFDcEIsT0FBTyxRQUFRLFFBQVE7QUFBQSxNQUN2QixPQUFPLE1BQU07QUFBQSxNQUNiLFFBQVEsTUFBTTtBQUFBLE1BQ2QsU0FBUztBQUFBLElBQ2YsR0FBTztBQUFBLE1BQ0QsRUFBRSxVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsUUFDSixHQUFHO0FBQUEsUUFDSCxNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixnQkFBZ0IsTUFBTTtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLE1BQzdCLENBQU87QUFBQSxJQUNQLENBQUs7QUFBQSxFQUNGO0FBQ0gsQ0FBQzs7In0=
