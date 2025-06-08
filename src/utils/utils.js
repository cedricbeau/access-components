export function defineComponent(name, cb) {
  document.addEventListener("alpine:init", () => {
    Alpine.data(name, cb);
  });
}
