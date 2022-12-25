<template>
	<div class="product-item">
		<div @click="deleteProduct()" class="product-item__remove-btn">&times;</div>
		<div class="product-item__picture">
			<a @click.prevent="getProduct(product)" href="#">
				<img
					v-if="product.image"
					:src="`http://127.0.0.1:3000/files/${product.image}`"
					alt=""
				/>
				<svg
					v-else
					version="1.0"
					xmlns="http://www.w3.org/2000/svg"
					width="416.000000pt"
					height="416.000000pt"
					viewBox="0 0 416.000000 416.000000"
					preserveAspectRatio="xMidYMid meet"
				>
					<g
						transform="translate(0.000000,416.000000) scale(0.100000,-0.100000)"
						fill="#3e3e3e"
						stroke="none"
					>
						<path
							d="M280 2080 l0 -1800 1800 0 1800 0 0 1800 0 1800 -1800 0 -1800 0 0
-1800z m3445 485 c0 -635 -2 -1155 -5 -1154 -3 0 -68 70 -145 154 -77 84 -145
153 -151 152 -6 -1 -210 -217 -454 -480 -355 -383 -446 -475 -456 -465 -11 12
-1150 1386 -1297 1566 -33 39 -61 72 -62 72 -1 0 -53 -62 -116 -138 -62 -75
-223 -269 -356 -430 l-243 -293 0 1086 0 1085 1643 0 1642 0 0 -1155z"
						/>
						<path
							d="M1952 3299 c-64 -25 -139 -96 -172 -164 -34 -69 -36 -207 -3 -277 30
-66 96 -133 162 -165 47 -23 69 -27 141 -28 73 0 93 4 142 28 72 35 140 110
168 185 29 76 24 186 -10 258 -34 69 -108 138 -175 163 -74 28 -180 27 -253 0z"
						/>
					</g>
				</svg>
			</a>
		</div>
		<div class="product-item__title">
			<a @click.prevent="getProduct(product)" href="#">{{ product.title }}</a>
			<p>Цена: {{ product.price }}</p>
			<p>Захоронение: {{ product.burial ? 'Да' : 'Нет' }}</p>
			<p>Кремирование: {{ product.cremation ? 'Да' : 'Нет' }}</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	methods: {
		...mapActions(['removeProduct']),
		getProduct(product) {
			this.$emit('product-click', product)
		},
		deleteProduct() {
			if (confirm('Вы действительно хотите удалить товар?')) {
				this.removeProduct(this.product._id)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.product-item {
	display: flex;
	width: 289px;
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
		height: auto;
		width: 90px;
		margin-right: 20px;

		img {
			width: 100%;
			height: auto;
		}
		svg {
			width: 100%;
			height: auto;
		}
	}
}
</style>
