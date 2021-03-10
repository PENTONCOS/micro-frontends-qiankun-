import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

let install = null;
function render(props = {}) {
  console.log("props",props)
  const { container, routerBase, getGlobalState, onGlobalStateChange } = props;
  onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
    console.log("getGlobalState",getGlobalState("userName"))

    const router = new VueRouter({
      base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
      mode: "history",
      routes
    });
    install = new Vue({
      router,
      render: h => h(App, { props: props }) // 将主应用传过来的props传递进App.vue中
    }).$mount(container ? container.querySelector("#app") : "#app");
  });

  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: "history",
    routes
  });
  install = new Vue({
    router,
    render: h => h(App, { props: props }) // 将主应用传过来的props传递进App.vue中
  }).$mount(container ? container.querySelector("#app") : "#app");
}
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render();
}

export async function bootstrap() {}

export async function mount(props) {
  render(props);
}
export async function unmount() {
  install.$destroy();
  install.$el.innerHTML = ""; // 子项目内存泄露问题
  install = null;
}