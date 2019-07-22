import Vue from 'vue'
import Router from 'vue-router'


/*
  欢迎界面
 */
import welcome from '@/components/Welcome';

/*
  游戏界面
 */
import gameCenter from '@/components/game/gameCenter';

/*
  指引
 */
import guidePage from '@/components/guide/guide';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcomePage',
      component: welcome
    },
    {
      path: '/gameCenter',
      name: 'gameCenterPage',
      component: gameCenter
    },
    {
      path: '/guidePage',
      name: 'guide',
      component: guidePage
    }
  ]
})
