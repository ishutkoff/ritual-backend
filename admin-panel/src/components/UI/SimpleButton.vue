<template>
	<button class="simple-button"><slot /></button>
</template>

<script>
export default {
	name: 'simple-button',
}
</script>

<style lang="scss" scoped>
.simple-button {
	border-radius: 8px;
	display: flex;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	background-color: #1a1a1a;
	color: #fff;
	cursor: pointer;
	transition: border-color 0.25s;

	&:hover {
		border-color: #646cff;
	}
	&:focus,
	button,
	&:focus-visible {
		outline: 4px auto -webkit-focus-ring-color;
	}
	&:disabled {
		cursor: auto;
		background-color: #302e2e;
		color: #545353;
		border: none;
	}
}
</style>
