import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')
app!.innerHTML = 'tes'

interface ModuleType {
  name: string

}
const value = import.meta.globNext<ModuleType>('./fixture/*.ts')
console.log(value.keys())
