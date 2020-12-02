import { mount } from '@vue/test-utils'
import Home from './../../src/views/Home.vue'

describe('Mounted Home', () => {
  const wrapper = mount(Home);

  it('button click with correct answer', () => {
    wrapper.setData({ answ: "15" })
    wrapper.setData({ userAnsw: "15" })
    const button = wrapper.find("#answerbutton")
    button.trigger('click')
    expect(wrapper.vm.final).toBe('Correct!')
  });

  it('button click with incorrect answer', () => {
    wrapper.setData({ answ: "17" })
    wrapper.setData({ userAnsw: "15" })
    const button = wrapper.find("#answerbutton")
    button.trigger('click')
    expect(wrapper.vm.final).toBe('Wrong! Correct answer is: 17')
  })
})
