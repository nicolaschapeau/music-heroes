<template>
	<div style="height: 80%">
		<div v-if="lists">
			<div v-for="list in lists" :key="list.id" class="list" @click="openTchat(list)">
				<img :src="getAvatar(list)" :alt="list.name" class="list__image">
				<div class="list__details">
					<div class="list__head">
						<span class="list__head__name">
							{{ getName(list) }}
						</span>
						<span class="list__head__date">
							{{ list.message.createdAt | moment("calendar") }}
						</span>
					</div>
					<span class="list__content">
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
	props: ['lists'],
	data() {
		return {}
	},
	mounted () {
	},
	methods: {
		getAvatar(chat) {
			const response = chat.users.find(user => user.avatar !== undefined)

			if (!response.avatar){
				return String("http://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg")
			}else{
				return String("data:image/png;base64," + response.avatar)
			}
			
		},
		getName(chat) {
			let userInfo = this.$store.getters['getUser']
			const response = chat.users.find(data => data.user !== userInfo._id)

			return response.name
			
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
		align-items: center;
        /* margin-bottom: 20px; */
		transition: 0.3s;
		padding: 10px 15px 10px 15px;
		cursor: pointer;
	}

	.list:hover{
		transition: 0.3s;
		background: #fd8c30;
	}

	.list__image{
		width: 60px;
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
		font-weight: bold;
	}

	.list__head__date{
		color: lightgrey;
		font-size: 10px;
	}

	.list__content{  
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