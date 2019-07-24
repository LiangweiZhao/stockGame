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
import gameHomePage from '@/components/game/gameHome';
import usrOperPage from '@/components/game/usrOperPage';
/*
  指引
 */
import guidePage from '@/components/guide/guide';

/*
  用户
 */
import usr from '@/components/usrInfo/usrMainPage';
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
      component: gameCenter,
      children: [
        {
          path: '/',
          name: 'gameHomePage',
          component: gameHomePage
        },
        {
          path: 'usrOperPage/:mode',
          name: 'usrOperPage',
          component: usrOperPage
        }
      ]
    },
    {
      path: '/guidePage',
      name: 'guide',
      component: guidePage
    },
    {
      path: '/usr',
      name: 'usrPage',
      component: usr
    }
  ]
})
