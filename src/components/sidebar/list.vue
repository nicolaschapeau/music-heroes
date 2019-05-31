<template>
	<div style="height: 80%">
		<div v-if="lists">
			<div v-for="list in lists" :key="list.index" class="list" @click="openTchat(list)">
				<img :src="getAvatar(list)" :alt="list.name" class="list__image">
				<div class="list__details">
					<div class="list__head">
						<span class="list__head__name">
							{{ getName(list.users) }}
						</span>
						<span v-if="list.message" class="list__head__date">{{ getDate(list.message.createdAt) }}</span>
						<span v-if="!list.message" class="list__head__date"></span>
					</div>
					<span v-if="list.message" class="list__content">
						<span v-if="list.message.user === user._id">
							Vous:
						</span>
						{{ list.message.content }}
					</span>
				</div>
			</div>
		</div>
		<div v-if="!lists || lists.length <= 0" class="no-list">
			<h4>Pas encore de message ?</h4>
			<p>Commencez par contacter un musicien !</p>
		</div>
	</div>
</template>


<script>
import api from '@/api/api'
import moment from 'moment'
import 'moment/locale/fr'

export default {
	name: 'List',
	props: ['lists', 'user'],
	mounted () {
		moment.locale('fr')
	},
	methods: {
		getAvatar(chat) {
			const response = chat.users.find(user => user.avatar !== false)

			if (response.avatar !== true){
				return String("data:image/png;base64," + response.avatar)
			}else{
				return String("https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg")
			}
			
		},
		getName(chat) {
			let userInfo = this.user
			const response = chat.find(data => data.user !== userInfo._id)

			return response.name
			
		},
		getDate(date) {
			let newDate = moment(date).format('LL à LT')
			
			return newDate
		},
		openTchat(tchat) {
			this.$emit('open-tchat', tchat)
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
	}

	.no-list{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>