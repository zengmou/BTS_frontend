import Vue from 'vue'
import Router from 'vue-router'
import ApplyMeeting from '@/components/meeting/ApplyMeeting'
import Login from '@/components/universal/Login'
import Register from '@/components/universal/Register'
import Home from '@/components/universal/Home'
import Meeting from '@/components/meeting/Meeting'
import MyMeetings from '@/components/meeting/MyMeetings'
import AllMeetings from '@/components/meeting/AllMeetings'
import Submit from '@/components/author/Submit'
import Author from '@/components/author/Author'
import Papers from '@/components/author/MyPapers'
import PaperRevise from '@/components/author/PaperRevise'
import PCMember from '@/components/pc/PCMember'
import Chair from '@/components/chair/Chair'
import Search from '@/components/chair/Search'
import AllPapers from '@/components/chair/AllPapers'
import SentInvitation from '@/components/chair/SentInvitation'
import Application from '@/components/meeting/Application'
import ReceivedInvitation from '@/components/pc/ReceivedInvitation'
import Admin from '@/components/admin/Admin'
import Audit from '@/components/admin/Audit'
import HelloWorld from '@/components/universal/HelloWorld'
import Review from '@/components/pc/Review'
import Mark from '@/components/pc/Mark'
import Remark from '@/components/pc/Remark'
import PCRebuttal from '@/components/pc/Rebuttal'
import Discuss from '@/components/pc/Discuss'
import Results from '@/components/author/PaperResults'
import Rebuttal from '@/components/author/Rebuttal'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/apply',
      name: 'ApplyMeeting',
      component: ApplyMeeting,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/meeting',
      name: 'Meeting',
      component: Meeting,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/joining',
      name:'MyMeetings',
      component:MyMeetings,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/submitting',
      name:'AllMeetings',
      component:AllMeetings,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/author',
      name:'Author',
      component:Author,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/papers',
      name:'MyPapers',
      component:Papers,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/papers/results',
      name:'Results',
      component:Results,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/papers/rebuttal',
      name:'Rebuttal',
      component:Rebuttal,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/papers/revise',
      name:'PaperRevise',
      component:PaperRevise,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/PC',
      name:'PCMember',
      component:PCMember,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/review',
      name:'Review',
      component:Review,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/review/mark',
      name:'Mark',
      component:Mark,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/review/remark',
      name:'Remark',
      component:Remark,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/review/rebuttal',
      name:'PCRebuttal',
      component:PCRebuttal,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/review/discuss',
      name:'Discuss',
      component:Discuss,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/chair',
      name:'Chair',
      component:Chair,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/chair/papers',
      name:'AllPapers',
      component:AllPapers,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/meeting/chair/search',
      name:'Search',
      component:Search,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/chair/invitation',
      name:'SentInvitation',
      component:SentInvitation,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/meeting/application',
      name:'Application',
      component:Application,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/message',
      name:'ReceivedInvitation',
      component:ReceivedInvitation,
      // meta: {
      //   requireAuth: true // 需要登录权限
      // }
    },
    {
      path:'/admin/home',
      name:'Admin',
      component:Admin,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/admin/audit',
      name:'Audit',
      component:Audit,
      meta: {
        requireAuth: true // 需要登录权限
      }
    },
    {
      path:'/',
      name:'HelloWorld',
      component:HelloWorld,
    }
  ]
});


// 前端登录拦截
router.beforeEach(function (to, from ,next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (window.localStorage.hasOwnProperty('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      })
    }
  } else {
    next()
  }
});

// router.beforeEach(function (to, from ,next) {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     this.$axios.post(to.fullPath).then(res =>{
//       if(res.status===200){
//         next();
//       }
//       else {
//         next({
//           path: '/login',
//           query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
//         })
//       }
//     }) 
//   } 
//   else {
//     next()
//   }
// });

