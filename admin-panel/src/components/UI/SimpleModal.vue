<template>
	<div @click="closeModal()" class="simple-modal" v-if="show === true">
		<div @click.stop class="simple-modal__wrapper">
			<div class="simple-modal__header">
				<div class="simple-modal__title">{{ title }}</div>
				<span @click.stop="closeModal()" class="simple-modal__close-btn"
					>&times;</span
				>
			</div>
			<div class="simple-modal__body">
				<slot name="body"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'simple-modal',
	props: {
		title: {
			type: String,
			required: true,
		},
		show: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			showModal: true,
		}
	},
	computed: {},
	methods: {
		closeModal() {
			this.$emit('update:show', false)
		},
	},
}
</script>

<style lang="scss" scoped>
.simple-modal {
	background: rgb(28 27 27 / 74%);
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	color: #1f1d1d;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 55;

	&__wrapper {
		width: 90%;
		max-width: 500px;
		background-color: #fff;
		min-height: 50vh;
		border-radius: 10px;
		padding: 15px 20px;
	}

	&__title {
		color: #000;
		font-size: 21px;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgb(190, 190, 190);
		padding-bottom: 10px;
		margin-bottom: 10px;
	}

	&__close-btn {
		cursor: pointer;
		color: #000;
		font-size: 35px;
	}
}
</style>
