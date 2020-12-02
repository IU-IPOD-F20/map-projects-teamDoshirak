import { mount } from '@vue/test-utils'
import Home from './../../src/views/Home.vue'

describe('Mounted Home', () => {
  const wrapper = mount(Home);

  it('button click with correct answer', () => {
    wrapper.setData({ answ: "15" })
    wrapper.setData({ userAnsw: "15" })
    // const button = wrapper.find("#answerbutton")
    // button.trigger('click')
    wrapper.vm.answer()
    // expect(wrapper.vm.quizlist).toBe('Correct!')
    expect(wrapper.vm.$data.final).toBe('Correct!')
  });

  it('button click with incorrect answer', async () => {
    wrapper.setData({ answ: "17" })
    wrapper.setData({ userAnsw: "15" })
    // const button = wrapper.find("#answerbutton")
    // const xxx = await button.trigger('click')
    wrapper.vm.answer()
    expect(wrapper.vm.$data.final).toBe('Wrong! Correct answer is: 17')
  })
})
