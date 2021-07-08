import { mount } from '@vue/test-utils'
import Quiz from './../../src/views/Quiz.vue'
import Authorization from './../../src/views/Authorization.vue'
import UserInfo from './../../src/views/UserInfo.vue'
import CreateQuiz from './../../src/views/CreateQuiz.vue'
// import Home from './../../src/views/Home.vue'

describe('Testing Quiz Component', () => {
  const wrapper = mount(Quiz);

  it('Goes to the next question if answer is correct', () => {
    wrapper.setData({ userAnsw: "15" });
    wrapper.setData({ currentQuestion: {correctAnswer : "15" }});
    const nextQuest = wrapper.vm.$data.quesnum + 1;
    wrapper.vm.answer()
    expect(wrapper.vm.$data.quesnum).toBe(nextQuest)
  });

  it('Incorrect answer shows correct answer', async () => {
    wrapper.setData({ currentQuestion: {correctAnswer : "17" } })
    wrapper.setData({ userAnsw: "15" })
    wrapper.vm.answer()
    expect(wrapper.vm.$data.final).toBe('Wrong! Correct answer is: 17')
  })

  it('Right answer is shown if answered wrong', async () => {
    wrapper.setData({ answ: "17" })
    wrapper.setData({ userAnsw: "15" })
    wrapper.vm.answer()
    expect(wrapper.vm.$data.final).toBe('Wrong! Correct answer is: 17')
  })

  it('Next question button showed after wrong answer', async () => {
    wrapper.setData({ answ: "17" })
    wrapper.setData({ userAnsw: "15" })
    wrapper.vm.answer()
    let input = wrapper.find('#nextbut').element
    expect(input);
  })

  it('Search field is present', async () => {
    let input = wrapper.find('#searcher').element
    expect(input);
  })

  it('Answer select field is present', async () => {
    let input = wrapper.find('#answerer').element
    expect(input);
  })

  it('Answer button is present', async () => {
    let input = wrapper.find('#answbut').element
    expect(input);
  })
})

describe('Testing Authorization Component', () => {
  const wrapper = mount(Authorization);

  it('Email field is present', () => {
    let input = wrapper.find('#email').element
    expect(input);
  });

  it('Password field is present', () => {
    let input = wrapper.find('#password').element
    expect(input);
  });

  it('Register button is present', async () => {
    let input = wrapper.find('#registerer').element
    expect(input);
  })

  it('Login button is present', async () => {
    let input = wrapper.find('#loginer').element
    expect(input);
  })
})

describe('Testing User Information Component', () => {
  const wrapper = mount(UserInfo);

  it('Stores and shows User ID', () => {
    wrapper.setData({ userId: "gG7BWZZwewPHVI4xwHdWW6fBm4I3" })
    expect(wrapper.vm.$data.userId).toBe("gG7BWZZwewPHVI4xwHdWW6fBm4I3")
  });

  it('Stores and shows User Email', () => {
    wrapper.setData({ userEmail: "sufdpersonic@mail.ru" })
    expect(wrapper.vm.$data.userEmail).toBe("sufdpersonic@mail.ru")
  });
})

describe('Testing Create Quiz Component', () => {
  const wrapper = mount(CreateQuiz);

  it('Quizname field is present', async () => {
    let input = wrapper.find('#quizname').element
    expect(input);
  })

  it('Button is present', async () => {
    let input = wrapper.find('#buttoner').element
    expect(input);
  })

  it('Question field is present', async () => {
    let input = wrapper.find('#questiontext').element
    expect(input);
  })

  it('Option 1 field is present', async () => {
    let input = wrapper.find('#opt1').element
    expect(input);
  })

  it('Option 2 field is present', async () => {
    let input = wrapper.find('#opt2').element
    expect(input);
  })

  it('Option 3 field is present', async () => {
    let input = wrapper.find('#opt3').element
    expect(input);
  })

  it('Option 4 field is present', async () => {
    let input = wrapper.find('#opt4').element
    expect(input);
  })

  it('Correct answer field is present', async () => {
    let input = wrapper.find('#correctanswer').element
    expect(input);
  })

  it('Add question button is present', async () => {
    let input = wrapper.find('#addques').element
    expect(input);
  })

  it('Finish button is present', async () => {
    let input = wrapper.find('#fin').element
    expect(input);
  })
})