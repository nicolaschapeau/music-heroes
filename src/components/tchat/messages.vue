<template>
	<div class="messages" id="messages" v-if="messages">
		<p v-html="message.content" v-for="message in messages" :key="message.id" :class="[ message.name === me ? 'me' : 'other' ]" v-linkified></p>
	</div>
</template>


<script>
import { watch } from 'fs';
import { setTimeout } from 'timers';
export default {
	name: 'Messages',
	props: ['messages'],
	data () {
		return {
			me: 'aaaaaaaa'
		}
	},
    mounted () {
		this.initscroll()
	},
	methods: {
		initscroll() {
			let element = document.getElementById('messageContainer')
			element.scrollTop = element.scrollHeight
		},
		scrollTo(){
			setImmediate(() => {
				let $messages = document.getElementById('messages')
				let $messagesContainer = document.getElementById('messageContainer')

				const $newMessage = $messages.lastElementChild

				// Height of the new message
				const newMessageStyles = getComputedStyle($newMessage)
				const newMessageMargin = parseInt(newMessageStyles.marginBottom)
				const newMessageHeight = $newMessage.offsetHeight + (newMessageMargin * 2)

				// Visible height
				const visibleHeight = $messagesContainer.offsetHeight

				// Height of messages container
				const containerHeight = $messages.scrollHeight

				// How far have I scrolled?
				const scrollOffset = $messagesContainer.scrollTop + visibleHeight

				if (containerHeight - newMessageHeight <= scrollOffset) {
					$messagesContainer.scrollTop = $messagesContainer.scrollHeight
				}
			})

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
		text-align: left;
		width: 100%;
		display: inline-block;
	}

	.messages p {
		clear: both;
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