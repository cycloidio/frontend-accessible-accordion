<template>
	<div class="container">
		<accordion class="accordion" :collapsible="false" :expandable="false">
			<accordion-panel id="personalInfo">
				<accordion-panel-header v-slot="{ isActive }">
					<span :class="[{ 'font-weight-bold': isActive }, 'accordion-title']">Personal Information</span>
				</accordion-panel-header>
				<accordion-panel-content>
					<p><input type="text" placeholder="Name" /></p>
					<p><input type="text" placeholder="Email" /></p>
					<p><input type="text" placeholder="Phone" /></p>
					<p><input type="text" placeholder="Country" /></p>
				</accordion-panel-content>
			</accordion-panel>

			<accordion-panel id="billingAddress">
				<accordion-panel-header>
					<span class="accordion-title">Billing Address</span>
				</accordion-panel-header>
				<accordion-panel-content>
					<fieldset>
						<p><input v-model="billing.address" type="text" placeholder="Address" /></p>
						<p><input v-model="billing.city" type="text" placeholder="City" /></p>
						<p><input v-model="billing.zipCode" type="text" placeholder="Zip Code" /></p>
					</fieldset>
					<button class="button" @click.stop="clearAllInputs(billing)">Clear Billing Info</button>
				</accordion-panel-content>
			</accordion-panel>
		</accordion>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'App',

	setup() {
		const active_panel = ref([0]);
		const billing = ref({
			address: '',
			city: '',
			zipCode: '',
		});

		const clearAllInputs = inputsGroup =>
			Object.keys(inputsGroup).forEach(input => {
				inputsGroup[input] = '';
			});

		return {
			active_panel,
			billing,
			clearAllInputs,
		};
	},
};
</script>

<style lang="scss">
$white: #ffffff;
$teal: #1c9797;
$teal-light: #d2eaea;

.container {
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
}

.accordion {
	margin: 0;
	padding: 0;
	border: 2px solid $teal;
	border-radius: 7px;
	width: 20em;

	&__panel-content {
		margin: 0;
		padding: 1em 1.5em;
	}

	/* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */
	&__panel[hidden] {
		display: none;
	}

	&__panel {
		&:first-child {
			.accordion__panel-header-toggle {
				border-radius: 5px 5px 0 0;
			}
		}

		&.is-active {
			.accordion__panel-header {
				border-bottom: 1px solid $teal;
			}
		}
	}

	&__panel-header-toggle {
		border-style: none;
		background: none;
		color: hsl(0, 0%, 13%);
		display: block;
		font-size: 1rem;
		font-weight: normal;
		margin: 0;
		padding: 1em 1.5em;
		position: relative;
		text-align: left;
		width: 100%;
		outline: none;

		&:hover,
		&:focus {
			background: $teal-light;

			.accordion-icon,
			.accordion-title {
				border-color: $teal;
			}
		}

		&[aria-expanded='true'] {
			.accordion-icon {
				transform: translateY(-50%) rotate(-135deg);
			}
		}

		&::-moz-focus-inner {
			border: 0;
		}
	}

	h3 {
		margin: 0;
		padding: 0;
	}

	&:focus {
		border-color: $teal;

		h3 {
			background-color: hsl(0, 0%, 97%);
		}
	}
}

.accordion > * + * {
	border-top: 1px solid $teal;
}

.accordion-title {
	display: block;
	pointer-events: none;
	border: transparent 2px solid;
	border-radius: 5px;
	padding: 0.25em;
	outline: none;
}

.accordion-icon {
	border: solid hsl(0, 0%, 62%);
	border-width: 0 2px 2px 0;
	height: 0.5rem;
	pointer-events: none;
	position: absolute;
	right: 2em;
	top: 50%;
	transform: translateY(-60%) rotate(45deg);
	width: 0.5rem;
}

fieldset {
	border: 0;
	margin: 0;
	padding: 0;
}

input {
	border: 1px solid hsl(0, 0%, 62%);
	border-radius: 0.3em;
	display: block;
	font-size: inherit;
	padding: 0.3em 0.5em;

	&:focus {
		border: 1px solid $teal;
		outline: none !important;
	}
}

.button {
	margin-top: 16px;
	min-width: auto;
	height: 32px;
	padding: 0 16px;
	font-size: 14px;
	font-weight: 400;
	border-radius: 4px;
	color: $teal;
	border: 1px solid $teal;
	background-color: $white;
	transition: all 150ms ease;
	outline: none !important;

	&:hover {
		background-color: $teal-light;
	}
}
</style>
