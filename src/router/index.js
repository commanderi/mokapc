import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import help from '@/components/help'
import user from '@/components/user'
import betcenter from '@/components/betcenter'
import lotteryInformation from '@/components/lotteryInformation'
import mobileBetting from '@/components/mobileBetting'
import gameRules from '@/components/gameRules'
import turntable from '@/components/turntable'
import promotions from '@/components/promotions'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/turntable',
      name: 'turntable',
      component: turntable
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/betcenter',
      name: 'betcenter',
      component: betcenter
    },
    {
      path: '/lotteryInformation',
      name: 'lotteryInformation',
      component: lotteryInformation
    },
    {
      path: '/MobileBetting',
      name: 'MobileBetting',
      component: mobileBetting
    },
    {
      path: '/gameRules',
      name: 'gameRules',
      component: gameRules
    },
    {
      path: '/promotions',
      name: 'promotions',
      component: promotions
    }
  ],
  // mode: 'history',
})
