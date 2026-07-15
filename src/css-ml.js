/**
Copyright (C) 2026  <Your Name or Organization>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://gnu.org>.

 * CSS-ML is a lightweight CSS framework that allows for easy alignment and layout of HTML elements using custom tags and attributes.
 * This JavaScript file provides the necessary functionality to process these custom tags and apply the appropriate CSS styles to achieve the desired layout.
 */

//Pull in the CSS-ML stylesheet from the CDN if it hasn't been added yet
const cssUrl = "https://cdn.jsdelivr.net/gh/CodeKing710/css-ml@main/css-ml.min.css"
if(!document.querySelector(`link[href*="css-ml"][href$=".css"]`)) {
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.media = "screen"
  link.href = cssUrl
  document.head.appendChild(link)
}

(async () => {
  let loadedJs;
  try {
    loadedJs = await import('/js/loaded.js')
  } catch (e) {
    // Try again from relative pathing
    try {
      loadedJs = await import('./loaded.js')
    } catch (e) {
      console.warn('Loading "loaded.js" from CDN...')
      loadedJs = await import('https://cdn.jsdelivr.net/gh/CodeKing710/loaded.js@main/loaded.js')
    }
  }
})();
// import { installDeps, addDeps, createDep } from ""

export function cssML() {
  //Run attribute checks on containers for extra alignment info
  flexContainers()
  gridContainers()
  stickyNavs()
  sidebarButtons()
  noWrapperAdjustments()
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

  function stickyNavs() {
    const navs = document.querySelectorAll("nav[sticky]")

    if(navs.length === 0) return

    navs.forEach(nav => {
      let stickyPoint = 0
      let isStuck = false

      const calcPos = () => {
        const wasStuck = nav.classList.contains("sticky")
        if(wasStuck) nav.classList.remove("sticky")

        const rect = nav.getBoundingClientRect()
        stickyPoint = rect.top + window.scrollY

        if(wasStuck) nav.classList.add("sticky")
      }

      calcPos()

      let scrollTimeout
      const handleScroll = () => {
        if(!scrollTimeout) {
          window.requestAnimationFrame(() => {
            const shouldStick = window.scrollY >= stickyPoint
            if(shouldStick && !isStuck) {
              nav.classList.add("sticky")
              isStuck = true
            } else if(!shouldStick && isStuck) {
              nav.classList.remove("sticky")
              isStuck = false
            }
            scrollTimeout = null
          })
          scrollTimeout = true
        }
      }
      
      window.addEventListener("scroll", handleScroll, {passive: true})
      window.addEventListener("resize", calcPos)
    })
  }

  function sidebarButtons() {
    const sidebars = document.querySelectorAll("sidebar[collapsed], sidebar[buttons]")

    if(sidebars.length === 0) return

    sidebars.forEach(sidebar => {
      // Create sidebar toggle button
      const toggleItem = document.createElement("item")
      const toggleButton = document.createElement("a")
      toggleButton.href = "javascript:void(0)"
      toggleButton.textContent = "☰" // Hamburger icon
      toggleItem.classList.add("sidebar-toggle")
      toggleItem.appendChild(toggleButton)
      sidebar.insertBefore(toggleItem, sidebar.firstChild)

      // Toggle sidebar visibility on button click
      toggleButton.addEventListener("click", () => {
        // sidebar.classList.toggle("collapsed")
        if(sidebar.hasAttribute('collapsed')) {
          sidebar.removeAttribute('collapsed')
        } else {
          sidebar.setAttribute('collapsed','')
        }
      })
    })
  }

  function noWrapperAdjustments() {
    const bodyElements = Array.from(document.querySelectorAll('body > *'))
    const sidebar = document.querySelector('sidebar') || null

    console.log(sidebar === null)
    console.log(bodyElements)

    if(sidebar !== null) {
      if (bodyElements.includes(sidebar)) {
        // Set margin and padding classes to each item
        bodyElements.forEach(element => {
          if(element !== sidebar) element.classList.add('no-wrapper-sidebar-pos')
        })
      }
    }
  }
}

//Add dependency to list
addDeps(createDep(cssML, true))

//Run installDeps
installDeps()
