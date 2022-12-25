<template>
	<div class="product-edit-form">
		<div class="product-edit-form__left">
			<label>
				<img v-if="previewImage" :src="previewImage" alt="" />
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
				<input
					type="file"
					accept="image/gif, image/jpeg, image/png"
					@change="handleFileUpload($event)"
				/>
				<div>Загрузить изображение</div>
			</label>
		</div>
		<div class="product-edit-form__right">
			<input
				v-model="newProduct.title"
				type="text"
				placeholder="Название товара"
			/>
			<input
				v-model="newProduct.price"
				type="number"
				placeholder="Цена товара (руб.)"
			/>
			<select v-model="currentCategory">
				<option selected value="">Без категории</option>
				<option
					v-for="category of getCategories"
					:key="category._id"
					:value="category._id"
				>
					{{ category.title }}
				</option>
			</select>
			<div class="product-edit-form__type">
				<label>
					<input v-model="newProduct.burial" type="checkbox" />
					Захоронение
				</label>
				<label>
					<input v-model="newProduct.cremation" type="checkbox" />
					Кремирование
				</label>
			</div>
		</div>
	</div>
	<div class="product-edit-form__footer">
		<simple-button :disabled="isEmpty" @click="sendEditForm()"
			>Сохранить</simple-button
		>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		product: {
			type: Object,
		},
		shopId: {
			type: String,
		},
	},
	data() {
		return {
			currentCategory: '',
			newProduct: {
				category: '',
			},
			image: '',
			previewImage: '',
		}
	},
	methods: {
		...mapActions(['uploadPicture', 'getPicture', 'removePicture']),
		async sendEditForm() {
			if (this.image) {
				let formData = new FormData()
				formData.append('image', this.image)
				const res = await this.uploadPicture(formData)
				await this.removePicture(this.newProduct.image)
				this.newProduct.image = res
			}
			this.newProduct.category = this.currentCategory
			this.$emit('send-form', this.newProduct)
		},
		handleFileUpload(e) {
			this.image = e.target.files[0]
			this.previewImage = URL.createObjectURL(this.image)
		},
	},
	computed: {
		getImageSrc() {
			return this.newProduct.image
				? 'http://localhost:3000/files/' + this.newProduct.image
				: ''
		},
		isEmpty() {
			if (!this.newProduct.title || !this.newProduct.price) return true
			return false
		},
		getCategories() {
			return this.$store.state.categories.categoriesList.filter(
				category => !category.forServices && category.shopId === this.shopId
			)
		},
	},
	mounted() {
		this.newProduct = Object.assign({}, this.product)
		this.previewImage = this.getImageSrc
		if (this.newProduct.category) {
			this.currentCategory = this.newProduct.category
		}
	},
}
</script>

<style lang="scss" scoped>
.product-edit-form {
	display: flex;
	margin-top: 20px;
	margin-bottom: 40px;

	&__left {
		width: 35%;

		img {
			width: 83%;
		}
		svg {
			width: 83%;
			height: auto;
		}
		label {
			cursor: pointer;
			input {
				position: absolute;
				opacity: 0;
				left: -500px;
			}
			div {
				font-size: 12px;
				background: #302e2e;
				width: 141px;
				color: #fff;
				text-align: center;
				border-radius: 5px;
				padding: 5px 10px;
				line-height: 16px;
				cursor: pointer;
			}
		}
	}

	&__right {
		width: 65%;
	}

	input[type='text'],
	input[type='number'] {
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid;
	}
	select {
		width: 100%;
		height: 40px;
		border: 1px solid;
		border-radius: 5px;
		padding: 5px 10px;
	}

	&__type {
		margin-top: 20px;
		label {
			margin-right: 10px;
		}
		input[type='checkbox'] {
			margin-right: 5x;
		}
	}
	&__footer {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
