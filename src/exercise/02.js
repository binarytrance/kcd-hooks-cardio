// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(entry, initialName) {
  const getItemFromLS = entry => {
    // state update happens first
    return window.localStorage.getItem(entry)
  }
  const [state, setState] = React.useState(
    () => getItemFromLS(entry) ?? initialName,
  )

  React.useEffect(() => {
    // use effect comes after state update
    // every time the state changes, we update the localstorage
    window.localStorage.setItem(entry, state)
  }, [state, entry])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = useLocalStorage('name', initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Ganeshan" />
}

export default App
