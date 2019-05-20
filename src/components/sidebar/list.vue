<template>
	<div style="height: 80%">
		<div v-if="lists">
			<div v-for="list in this.lists"  :key="list.id" class="list" @click="openTchat(list)">
				<img :src="list.imageSrc" :alt="list.name" class="list__image">
				<div class="list__details">
					<div class="list__head">
						<span class="list__head__name">
							{{ list.name }}
						</span>
						<span class="list__head__date">
							{{ list.date }}
						</span>
					</div>
					<span class="list__content">
						{{ list.content }}
					</span>
				</div>
			</div>
		</div>
		<div v-if="!lists" class="no-list">
			<h4>Pas encore de message ?</h4>
			<p>Commencer par contacter un musicien !</p>
		</div>
	</div>
</template>


<script>
  export default {
    name: 'List',
    props: ['lists'],
		data() {
			return {}
		},
    methods: {
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