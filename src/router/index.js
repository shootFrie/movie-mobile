import Vue from 'vue'
import Router from 'vue-router'
import MovieRouter from './movie'
import MineRouter from './mine'
import CinemaRouter from './cinema'

Vue.use(Router)

export default new Router({
			mode: 'history',
			base: process.env.BASE_URL,
			// base: 'Mm',
			routes: [
					MovieRouter,
					MineRouter,
					CinemaRouter,
					{
						path: '/*',
						redirect: '/movie'
					}
				]
			})
