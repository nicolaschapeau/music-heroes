<template>
	<div>
		<div class="messages" v-for="message in messages" :key="message.id">
			<p v-if="me === message.name" class="me">{{ message.content }}</p>
			<p v-if="me !== message.name" class="other">{{ message.content }}</p>
		</div>
	</div>
</template>


<script>
	export default {
		name: 'Messages',
		props: ['messages'],
		data () {
			return {
				me: 'aaaaaaaa'
			}
		}
	}
</script>


<style scoped>

	.messages {
		overflow-wrap: break-word;
		text-align: left
	}

	p {
		clear:both;
	} 

	.messages .me {
		background: white;
		max-width: 75%;
		float: right;
	}

	.messages .other {
		background: lightgrey;
		max-width: 75%;	
		float: left;
	}

</style>