export default{
	path:'/movie',
	component: () =>import('@/views/Movie'),
	children :[
		{
			path : 'city',
			component : () => import('@/components/City')
		},
		{
			path : 'nowPlaying',
			component : () => import('@/components/NowPlaying')
		},
		{
			path : 'comingSoon',
			component : () => import('@/components/ComingSoon')
		},
		{
			path : 'search',
			component : () => import('@/components/Search')
		},
		{
			path: 'detail/:movieId',
			components : {
				detail : ()=> import('@/views/Movie/detail')
			},
			props :{   //components对应多个，所以需要{}
				detail : true //触发 可以在详情页直接接收movieId
			}
		},
		{
			path:"/movie",
			redirect:'/movie/nowPlaying'
		}
	]
}