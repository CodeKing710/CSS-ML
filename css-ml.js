/**
 * CSS-ML is a lightweight CSS framework that allows for easy alignment and layout of HTML elements using custom tags and attributes.
 * This JavaScript file provides the necessary functionality to process these custom tags and apply the appropriate CSS styles to achieve the desired layout.
 */

//Pull in the CSS-ML stylesheet from the CDN if it hasn't been added yet
const cssUrl = "https://cdn.jsdelivr.net/gh/CodeKing710/css-ml@main/css-ml.css"
if(!document.querySelector(`link[href="${cssUrl}"]`)) {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.media = "screen"
  link.href = cssUrl
  document.head.appendChild(link)
}

import { installDeps, addDeps, createDep } from "https://cdn.jsdelivr.net/gh/CodeKing710/loaded.js@main/loaded.js"

export function cssML() {
  //Run attribute checks on containers for extra alignment info
  flexContainers()
  gridContainers()
  /**PRIVATE FUNCTIONS */
  /**
   * Processes <flex> containers and applies the appropriate CSS styles based on the v-align and h-align attributes.
   */
  function flexContainers() {
    const containers = document.querySelectorAll('flex')
    const vProps = ["start","end","center","baseline","space-between","space-around","space-evenly"]
    const hProps = ["start","end","center","stretch","baseline"]
    
    for(let i = 0; i < containers.length; i++) {
      const current = containers[i]
      

      if(current.hasAttribute("v-align")) {
        // console.log("Vertical Align: ", current.getAttribute("v-align"));
        const value = current.getAttribute("v-align")

        //Precheck value for two different values or just single value
        if(value.includes(" ")) {
          //The space exists assign properties separate
          const [align, justify] = value.split(/\s+/)
          current.style.alignContent = align
          current.style.justifyContent = justify
        } else if(vProps.includes(value)) {
          //Check for the double-assignment properties
          current.style.alignContent = value
          current.style.justifyContent = value
        }
      }
      //Accepts single or double argument via spaces
      //Horizontally aligns the sub items of the containers first
      //Horizontally aligns the containers themselves second
      if(current.hasAttribute("h-align")) {
        // console.log("Horizontal Align: ", current.getAttribute("h-align"));
        //Supported single arg properties (it'll dup the property values for use in CSS no repeated typing)
        const value = current.getAttribute("h-align")

        //Precheck value for two different values or just single value
        if(value.includes(" ")) {
          //The space exists assign properties separate
          const [align, justify] = value.split(/\s+/)
          current.style.alignItems = align
          current.style.justifyItems = justify
        } else if(hProps.includes(value)) {
          //Check for the double-assignment properties
          current.style.alignItems = value
          current.style.justifyItems = value
        }
      }

      //Children container attribute processing
      const children = current.querySelectorAll(":scope > *")
      for(let j = 0; j < children.length; j++) {
        const child = children[j]

        if(child.hasAttribute("order")) {
          child.style.order = child.getAttribute("order")
        }
        if(child.hasAttribute("grow")) {
          child.style.flexGrow = child.getAttribute("grow")
        }
        if(child.hasAttribute("shrink")) {
          child.style.flexShrink = child.getAttribute("shrink")
        }
        if(child.hasAttribute("flex-size")) {
          child.style.flex = child.getAttribute("flex-size")
        }
      }
    }
  }

  function gridContainers() {
    const containers = document.querySelectorAll("grid")

    for(let i = 0;i < containers.length; i++) {
      const current = containers[i]
      const children = current.children
      if(children.length === 0) continue

      //Run attribute checks for grid element
      if(current.hasAttribute("cols")) {
        const value = current.getAttribute("cols").trim()
        // console.log("Attr cols: ", current.getAttribute("cols"));
        if(value === "auto") {
          current.style.gridTemplateColumns = `repeat(${children.length}, auto)`
        } else {
          current.style.gridTemplateColumns = value
        }
      }
      if(current.hasAttribute("rows")) {
        const value = current.getAttribute("rows").trim()
        // console.log("Attr rows: ", current.getAttribute("rows"));
        if(value === "auto") {
          current.style.gridTemplateRows = `repeat(${children.length}, auto)`
        } else {
          current.style.gridTemplateRows = value
        }
      }
    }
  }
}

//Add dependency to list
addDeps(createDep(cssML, true))

//Run installDeps
installDeps()