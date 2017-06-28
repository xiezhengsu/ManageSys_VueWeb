import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/common/login'
import UserAdd from '@/components/user/useradd'
import Userlist from '@/components/user/userlist'
import CustomerList from '@/components/customer/customerlist'
import CustomerAdd from '@/components/customer/customeradd'
import Houselist from '@/components/house/houselist'
import HouseAdd from '@/components/house/houseadd'
import Loglist from '@/components/log/loglist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
	    redirect: '/login'
    },
	  {
		  path: '/login',
		  component: Login
	  },
	  {
		  path: '/index',
		  component: resolve => require(['../components/common/index.vue'], resolve),
		  children:[
			  {
				  path: '/cuslist',
				  component: CustomerList
			  },
			  {
				  path: '/cusAdd',
				  component: CustomerAdd
			  },
			  {
				  path: '/houselist',
				  component: Houselist
			  },
			  {
				  path: '/houseAdd',
				  component: HouseAdd
			  },
			  {
				  path: '/userlist',
				  component: Userlist
			  },
			  {
				  path: '/userAdd',
				  component: UserAdd
			  },
			  {
				  path: '/loglist',
				  component: Loglist
			  }
		  ]
	  },
	  {
		  path: '/logout',
		  component: resolve => require(['../components/common/login.vue'], resolve)
	  }
  ]
})
