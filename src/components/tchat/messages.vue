<template>
	<div v-if="messages" id="messages">
		<div class="messages" v-for="message in messages" :key="message.id" v-linkified>
			<p v-html="message.content" :class="[ message.name === me ? 'me' : 'other' ]" v-linkified	></p>
		</div>
	</div>
</template>


<script>
import { watch } from 'fs';
export default {
	name: 'Messages',
	props: ['messages'],
	data () {
		return {
			me: 'aaaaaaaa'
		}
	},
    mounted () {
		this.scrollTo()
	},
	methods: {
		scrollTo(){
			let element = document.getElementById('messages')
			element.scrollTop = element.scrollHeight
			console.log('height : ', element.scrollHeight)
			console.log(document.getElementById('messages').scrollTop)
		}
	},
	watch: {
        messages () {
			this.scrollTo()	
        }
    }
}
</script>


<style scoped>

	.messages {
		overflow-wrap: break-word;
		text-align: left
	}

	.messages p {
		clear:both;
		max-width: 75%;
		margin: 5px;
		padding: 15px;
		border-radius: 5px;
	} 

	.messages .me {
		background: white;
		float: right;
	}

	.messages .other {
		background: lightgrey;
		float: left;
	}

</style>