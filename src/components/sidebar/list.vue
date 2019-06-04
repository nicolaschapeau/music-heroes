<template>
	<div style="height: 80%">
		<div class="list" @click="openTchat(tchat)" v-show="!loading">
			<img :src="avatar" :alt="tchat.name" class="list__image">
			<div class="list__details">
				<div class="list__head">
					<span class="list__head__name">
						{{ name }}
					</span>
					<span v-if="tchat.message" class="list__head__date">{{ date }}</span>
					<span v-if="!tchat.message" class="list__head__date"></span>
				</div>
				<span v-if="tchat.message" class="list__content">
					<span v-if="tchat.message.user === user._id">
						Vous:
					</span>
					{{ tchat.message.content }}
				</span>
			</div>
		</div>
		<div class="cs-loader" v-show="loading">
			<div class="cs-loader-inner">
				<label>●</label>
				<label>●</label>
				<label>●</label>
				<label>●</label>
				<label>●</label>
				<label>●</label>
			</div>
		</div>
	</div>
</template>


<script>
import api from '@/api/api'
import moment from 'moment'
import 'moment/locale/fr'

export default {
	name: 'List',
	props: ['tchat', 'user'],
	data () {
		return {
			avatar: null,
			date: null,
			name: null,
			loading: false
		}
	},
	mounted () {
		this.initData()
	},
	methods: {
		async initData () {
			this.loading = true
			await this.getAvatar(this.tchat)
			await this.getName(this.tchat)
			await this.getDate(this.tchat)
			this.loading = false
		},
		getAvatar(chat) {
			const response = chat.users.find(user => user.avatar !== false)

			if (response.avatar !== true){
				this.avatar = String("data:image/png;base64," + response.avatar)
			}else{
				this.avatar = String("https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg")
			}
			
		},
		getName(chat) {
			let userInfo = this.user
			const response = chat.users.find(data => data.user !== userInfo._id)

			this.name = response.name
			
		},
		getDate(date) {
			let newDate = moment(date.message.createdAt).format('LL à LT')
			
			this.date = newDate
		},
		openTchat(tchat) {
			this.$emit('open-tchat', tchat)
		}
	},
	watch: {
		"tchat": function (){
			this.initData()
		}
	}
}
</script>


<style scoped>

	.list{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
        /* margin-bottom: 20px; */
		transition: 0.3s;
		padding: 10px 15px 10px 15px;
		cursor: pointer;
	}

	.list:hover{
		transition: 0.3s;
		background: #eee
	}

	.list__image{
		width: 48px;
		border-radius: 64px;
	}

	.list__details{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items:  flex-start;
		width: 100%;
		padding-left: 15px;
	}

	.list__head{
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.list__head__name{
		font-size: 16px;
		font-weight: normal;
	}

	.list__head__date{
		color: lightgrey;
		font-size: 10px;
	}

	.list__content{  
		font-size: 14px;
		white-space: nowrap;
  		overflow: hidden;
		max-width: 300px;
		text-overflow: ellipsis;
		color: #999;
	}



	@keyframes lol {
		0% {
		opacity: 0;
		transform: translateX(-100px);
		}
		33% {
		opacity: 1;
		transform: translateX(0px);
		}
		66% {
		opacity: 1;
		transform: translateX(0px);
		}
		100% {
		opacity: 0;
		transform: translateX(100px);
		}
	}

	@-webkit-keyframes lol {
		0% {  
		opacity: 0;
		-webkit-transform: translateX(-100px);
		}
		33% {
		opacity: 1;
		-webkit-transform: translateX(0px);
		}
		66% {
		opacity: 1;
		-webkit-transform: translateX(0px);
		}
		100% {
		opacity: 0;
		-webkit-transform: translateX(100px);
		}
	}
</style>