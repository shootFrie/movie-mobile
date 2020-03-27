import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox =(function(){
	
	var defaults = { //默认值
		title :'',
		content :'',
		cancel: '',
		ok :'',
		handleCancel:null,
		handleOk:null	
	};
	
	var Mycomponent = Vue.extend(MessageBox);

	return function( opts ){  //配置参数
	
		for(var attr in opts){
			defaults[attr] = opts[attr];
		}
		
		var vm = new Mycomponent ({
			el: document.createElement('div'),
			data :{
				title : defaults.title,
				content :defaults.content,
				cancel : defaults.cancel,
				ok :defaults.ok
			},
			methods:{
				handleCancel(){
					defaults.handleCancel && defaults.handleCancel.call(this); //判断是否存在,获取vm对象
					document.body.removeChild( vm.$el );  //点击后删除
				},
				handleOk(){
					defaults.handleOk && defaults.handleOk.call(this); //改变this指向问题 bind()要再次调用才能触发Movie的mouted
					document.body.removeChild( vm.$el );  
				}
			}
		});
		
		document.body.appendChild( vm.$el ); //添加位置
	}
})()