import { action } from "./action.js";
// console.log(1)
action();

if (module.hot) {
    // console.log(2)
    module.hot.accept('./action.js', () => {
        // console.log(3)
        action();
    })
}