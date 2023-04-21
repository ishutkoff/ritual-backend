<template>
	<div class="shops-list__item">
		<div class="shops-list__item-title">
			<div @click="editShop()" class="shops-list__item__edit-btn">✎</div>
			<div @click="deleteShop()" class="shops-list__item__remove-btn">
				&times;
			</div>
			<router-link :to="`/shop/${shop._id}/products`">
				{{ shop.name }}
			</router-link>
		</div>
		<p>{{ shop.domain }}</p>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		shop: {
			type: Object,
			required: true,
		},
	},

	methods: {
		...mapActions(['removeShop']),
		deleteShop() {
			if (confirm('Вы действительно хотите удалить магазин?')) {
				this.removeShop(this.shop._id)
			}
		},
		editShop() {
			this.$emit('updateShop', this.shop)
		},
	},
}
</script>

<style lang="scss" scoped>
.shops-list__item {
	display: flex;
	position: relative;
	flex-direction: column;
	background: #1c1b1b;
	border: 1px solid transparent;
	transition: border-color 0.25s;
	border-radius: 10px;
	height: 206px;
	padding: 10px 20px;
	width: calc(50% - 10px);
	margin-bottom: 5px;
	justify-content: center;
	align-items: center;

	&:hover {
		.shops-list__item__remove-btn {
			display: flex;
		}

		.shops-list__item__edit-btn {
			display: flex;
		}
	}

	@media (max-width: 768px) {
		width: 100%;
	}

	&-title {
		font-size: 30px;
		margin-bottom: 10px;
	}

	p {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.87);
	}

	&:hover {
		border-color: #646cff;
	}

	&__remove-btn {
		position: absolute;
		right: 15px;
		top: 15px;
		z-index: 2;
		color: red;
		cursor: pointer;
		display: none;
	}

	&__edit-btn {
		position: absolute;
		right: 48px;
		top: 15px;
		z-index: 2;
		color: #d3bd24;
		font-size: 20px;
		cursor: pointer;
		display: none;
	}
}
</style>
