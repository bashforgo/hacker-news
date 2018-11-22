import reactDom from 'react-dom'
import { App } from './App'

it('renders without crashing', () => {
  const div: HTMLElement = document.createElement('div')
  reactDom.render(<App />, div)
  reactDom.unmountComponentAtNode(div)
})