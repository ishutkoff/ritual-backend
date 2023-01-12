<template>
	<div class="product-item">
		<div @click="deleteProduct()" class="product-item__remove-btn">&times;</div>
		<!-- <div class="product-item__picture"> -->
		<!-- <img
				v-if="product.image"
				:src="`http://127.0.0.1:3000/files/${product.image}`"
				alt=""
			/> -->
		<!-- </div> -->
		<div class="product-item__title">
			<a @click.prevent="getService(service)" href="#">{{ service.title }}</a>
			<p>Цена: {{ service.price > 0 ? service.price : 'Бесплатно' }}</p>
			<p>Захоронение: {{ service.burial ? 'Да' : 'Нет' }}</p>
			<p>Кремирование: {{ service.cremation ? 'Да' : 'Нет' }}</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		service: {
			type: Object,
			required: true,
		},
	},
	methods: {
		...mapActions(['removeService']),
		getService(service) {
			this.$emit('service-click', service)
		},
		deleteProduct() {
			if (confirm('Вы действительно хотите удалить услугу?')) {
				this.removeService(this.service._id)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.product-item {
	display: flex;

	width: 212px;
	position: relative;
	padding: 21px 20px;
	border: 1px solid #4a4848;
	background: #1a1a1a;
	margin: 10px;
	border-radius: 10px;

	&:hover {
		border-color: #646cff;

		.product-item__remove-btn {
			display: block;
		}
	}

	&__remove-btn {
		position: absolute;
		color: red;
		font-size: 21px;
		top: 0;
		right: 6px;
		cursor: pointer;
		display: none;
	}

	&__title {
		font-size: 16px;
		line-height: 137%;

		a {
			display: flex;
			margin-bottom: 5px;
		}

		p {
			font-size: 12px;
		}
	}

	&__picture {
		height: 40px;
		width: 31px;
		margin-right: 20px;

		img {
			width: 100%;
			height: auto;
		}
	}
}
</style>
