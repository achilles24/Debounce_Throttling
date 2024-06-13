const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")
const defaultTextCount = document.getElementById("default-count")
const debounceTextCount = document.getElementById("debounce-count")
const throttleTextCount = document.getElementById("throttle-count")

let defaultCount = 0;
let debounceCount = 0;
let throttleCount = 0;

const updateDebounceText = debounce((text) => {
  incrementCount("debounce")
  debounceText.textContent = text;
}, 1000)

const updateThrottleText = throttle((text) => {
  incrementCount("throttle")
  throttleText.textContent = text;
}, 1000)

function debounce(cb, delay = 1000) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

input.addEventListener("input", e => {
  defaultText.textContent = e.target.value;
  incrementCount("default");
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
})

function incrementCount(type) {
  switch (type) {
    case "default":
      defaultCount++;
      defaultTextCount.textContent = defaultCount;
      break;
    case "debounce":
      debounceCount++;
      debounceTextCount.textContent = debounceCount;
      break;
    case "throttle":
      throttleCount++;
      throttleTextCount.textContent = throttleCount;
      break;
    default:
      break;
  }
}
