import _ from "lodash";
import "./style.css";
import Icon from "./test_logo.png";
import Data from "./data.xml";
import { cube } from "./math";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

function component() {
  var element = document.createElement("div");
  var btn = document.createElement("button");
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me and check the console!";
  // btn.onclick = printMe;
  element.appendChild(btn);

  element.classList.add("hello");
  btn.onclick = e =>
    import(/* webpackChunkName: "print" */"./print.js").then(module => {
      var print = module.default;
      print();
    });

  //添加图片
  // var myIcon = new Image();
  // myIcon.src = Icon;

  // element.appendChild(myIcon);

  // console.log(Data);

  return element;
}

// function getComponent() {//动态加载
//   return import(/* webpackChunkName: "lodash"*/ "lodash")
//     .then(_ => {
//       var element = document.createElement("div");
//       element.innerHTML = _.join(["Hello", "webpack"], " ");
//       return element;
//     })
//     .catch(error => "An error occurred while loading the component");
// }

// getComponent().then(component => {
//   document.body.appendChild(component);
// })

document.body.appendChild(component());
