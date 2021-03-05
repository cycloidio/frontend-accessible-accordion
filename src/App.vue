<template>
	<Hibou class="logo" height="32" width="32" />
	<div class="container">
		<accordion class="accordion" :collapsible="false" :expandable="true">
			<accordion-panel id="personalInfo">
				<accordion-panel-header v-slot="{ isActive }">
					<span :class="[{ 'font-weight-bold': isActive }, 'accordion-title']">Personal Information</span>
				</accordion-panel-header>
				<accordion-panel-content>
					<p><input v-model="personalInfo.name" type="text" placeholder="Name" /></p>
					<p><input v-model="personalInfo.email" type="text" placeholder="Email" /></p>
					<p><input v-model="personalInfo.phone" type="text" placeholder="Phone" /></p>
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
						<p><input v-model="billing.country" type="text" placeholder="Country" /></p>
					</fieldset>
				</accordion-panel-content>
			</accordion-panel>
			<accordion-panel id="billingAddress">
				<accordion-panel-header>
					<span class="accordion-title">Summary</span>
				</accordion-panel-header>
				<accordion-panel-content>
					<p>Thank you for filling in the form.</p>
					<button class="button button--red" @click="clearInputs(billing, personalInfo)">
						Clear
					</button>
					<button class="button" @click="submit(billing, personalInfo, $toast)">Submit</button>
				</accordion-panel-content>
			</accordion-panel>
		</accordion>
	</div>
</template>

<script>
import { ref } from 'vue';
import Hibou from './Hibou';

export default {
	name: 'App',
	components: {
		Hibou,
	},
	setup() {
		const active_panel = ref([0]);
		const personalInfo = ref({
			name: '',
			email: '',
			phone: '',
		});

		const billing = ref({
			address: '',
			city: '',
			zipCode: '',
			country: '',
		});

		const clearInputs = (...inputGroups) => {
			inputGroups.forEach(inputGroup => {
				Object.keys(inputGroup).forEach(input => {
					inputGroup[input] = '';
				});
			});
		};

		const validate = (...inputGroups) =>
			inputGroups.reduce((acc, inputGroup) => Object.values(inputGroup).every(input => !!input) && acc, true);

		const submit = (billing, personalInfo, toast) => {
			validate(billing, personalInfo)
				? toast('Form submitted successfully! 🎉')
				: toast(`Oh no, an issue! 🥺`, {
						styles: {
							backgroundColor: '#E6213C',
						},
				  });
		};
		return {
			active_panel,
			billing,
			clearInputs,
			personalInfo,
			validate,
			submit,
		};
	},
};
</script>

<style lang="scss">
$white: #ffffff;
$primary: #131a25;
$primary-light: #253449;
$secondary: #1c9797;
$secondary-light: #d2eaea;
$error: #e6213c;
$error-light: #f07a8a;

html,
body {
	height: 100%;
	margin: 0;
}

#app {
	min-height: 100%;
	font-family: 'Montserrat', sans-serif;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container {
	margin: 8px 0;
}

.accordion {
	margin: 8px;
	padding: 0;
	border: 2px solid $secondary;
	border-radius: 7px;
	width: 20em;

	&__panel-content {
		color: $primary;
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
				border-bottom: 1px solid $secondary;
			}
		}
	}

	&__panel-header-toggle {
		color: $primary;
		border-style: none;
		background: none;
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
			background: $secondary-light;

			.accordion-icon,
			.accordion-title {
				border-color: $secondary;
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
		border-color: $secondary;

		h3 {
			background-color: hsl(0, 0%, 97%);
		}
	}
}

.accordion > * + * {
	border-top: 1px solid $secondary;
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
	border: solid $primary;
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
		border: 1px solid $secondary;
		outline: none !important;
	}
}

.button {
	margin-top: 16px;
	margin-right: 8px;
	min-width: auto;
	height: 32px;
	padding: 0 16px;
	font-size: 14px;
	font-weight: 400;
	border-radius: 4px;
	color: $secondary;
	border: 1px solid $secondary;
	background-color: $white;
	transition: all 150ms ease;
	outline: none !important;

	&:hover {
		background-color: $secondary-light;
	}

	&--red {
		color: $error;
		border: 1px solid $error;

		&:hover {
			background-color: $error-light;
		}
	}
}

.dk {
	&__toast-section {
		grid-area: top-center !important;
		justify-content: flex-start !important;
	}

	&__toast {
		padding: 8px 16px !important;
	}
}

.logo {
	position: absolute;
	top: 8px;
	left: 8px;
}
</style>
