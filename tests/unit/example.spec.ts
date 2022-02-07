import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import flushPromises from "flush-promises"

describe('Home.vue', () => {
  it('renders when passed', () => {
    const msg = 'Welcome to pokeapi explorer'
    const wrapper = mount(Home)
    expect(wrapper.text()).to.include(msg)
  })
})

describe('Home.vue', () => {
  it('displays message when not found', async () => {
    const name = 'Invalid Name'
    const wrapper = mount(Home)

    await wrapper.find("[data-pokemon-name]").setValue(name)
    await wrapper.find("form").trigger("submit.prevent")
    
    expect(wrapper.text()).to.include(`Could not find a pokemon with the name ${name}`)
  })
})
