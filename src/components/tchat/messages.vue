<template>
	<div class="messages" id="messages" v-if="messages">
		<p v-for="message in messages" :key="message.index" :class="[ message.user.toString() == user._id.toString() ? 'me' : 'other' ]" v-linkified>{{message.content}}<span class="hour">{{ getDate(message.createdAt) }}</span></p>
	</div>
</template>


<script>
import moment from 'moment'
import 'moment/locale/fr'

export default {
	name: 'Messages',
	props: ['messages', 'user'],
    updated () {
		this.initscroll()
	},
	methods: {
		initscroll() {
			let element = document.getElementById('messageContainer')
			element.scrollTop =  element.scrollHeight
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

		},
		getDate(date) {
			let newDate = moment(date).format('LT')
			
			return newDate
		},
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
		display: flex;
		flex-direction: column;
		justify-content: center;
	} 

	.messages .me {
		background: #FD8C30;
		float: right;
		align-items: flex-end;
		color: white;
	}

	.messages .other {
		background: #eee;
		float: left;
		align-items: flex-start;
	}

	.messages .me .hour {
		color: #eee;
		font-size: 10px;
	}
	.messages .other .hour {
		color: #111;
		font-size: 10px;
	}

</style>