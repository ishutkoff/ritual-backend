<template>
	<nav class="top-navigation">
		<div>
			<router-link
				v-if="$route.name !== 'shop-list'"
				:to="{ name: 'shop-list' }"
				>← Список сайтов</router-link
			>
		</div>
		<!-- <div>
			<router-link to="/">Товары</router-link>
			<router-link to="/">Услуги</router-link>
			<router-link to="/">Категории</router-link>
		</div> -->
	</nav>
</template>

<script>
export default {
	name: 'top-navigation',
}
</script>

<style lang="scss" scoped>
.top-navigation {
	position: sticky;
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	justify-content: space-between;
	z-index: 5;
	padding: 0 20px;
	top: 0;
	left: 0;
	right: 0;
	background: #1a1a1a;
	height: 40px;

	a {
		margin-right: 5px;
		margin-left: 14px;
	}
}
</style>
