<script lang="ts">
	import { prayerStore } from "$lib/service";
	import type { Prayer } from "$lib/types";
	import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";

	// Screensaver
	const screenSaverStore: Writable<boolean> = getContext("screenSaver");
	let isScreenSaver: boolean = true;
	screenSaverStore.subscribe(val => {
		isScreenSaver = val;
	});

	// Clock
	let date: Date = new Date();
	let time: number = 0;
	let stringTime: string = "";
	$: time = (date.getHours() * 60) + date.getMinutes();
	$: time && evaluateActiveItems();
	$: stringTime = (new Date(`1/1/1970 ${date.getHours()}:${date.getMinutes()}`)).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", hour12: true })

	// Clock
	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	// Prayer Data
	let data: Prayer[] = [];
	prayerStore.subscribe(val => {
		data = val!;
	});


	let activeItem: string = "";
	let activeSubtractedTime: number = 0;
	let activeType: "Iqamah" | "Athan" = "Athan";

	function evaluateActiveItems() {
		if (data !== null) {
			data.forEach(item => {
				const startDate = new Date("1/1/1970 " + item.start);
				const iqamahDate = new Date("1/1/1970 " + item.iqamah);
				const startSeconds = (startDate.getHours() * 60) + startDate.getMinutes();
				const iqamahSeconds = (iqamahDate.getHours() * 60) + iqamahDate.getMinutes();

				const timeToStart = time - startSeconds;
				const timeToIqamah = time - iqamahSeconds;

				if (timeToIqamah === 0) {
					setAsActive(item.id, timeToIqamah, "Iqamah");
				} else if (timeToStart === 0) {
					setAsActive(item.id, timeToStart, "Athan");
				} else if (timeToStart <= 0 && timeToStart >= -15) {
					setAsActive(item.id, timeToStart, "Athan");
				} else if (timeToIqamah <= 15 && timeToIqamah >= -30) {
					setAsActive(item.id, timeToIqamah, "Iqamah");
				} else if (activeItem === item.id) {
					activeItem = "";
					activeSubtractedTime = 0;
				}
			});

			if (activeItem === "")
				screenSaverStore.set(true);
		}
	}

	function setAsActive(id: string, subTime: number, type: "Athan" | "Iqamah") {
		const day = new Date().getDay();
		if (id.toLowerCase() === "duhr" && day === 5)
			return;
		if (id.toLowerCase() === "jumuah" && day !== 5)
			return;

		activeType = type;
		activeItem = id;
		activeSubtractedTime = subTime;
		screenSaverStore.set(false);
	}

</script>


<div class="card" class:saver={ isScreenSaver }>
	<div class="header-section">
		<div class="header">
			<div class="wrapper">
				<h1>{ stringTime.replace("AM","").replace("PM","") }</h1>
			</div>
			<div class="wrapper date-wrapper">
				{#if date}
					{@const gregDate = new Intl.DateTimeFormat('en-US', { dateStyle: "long", timeZone: "America/Vancouver" }).format(date)}
					{@const islamicDate = new Intl.DateTimeFormat('en-US', { calendar: "islamic", dateStyle: "long", timeZone: "America/Vancouver" }).format(date)}
					<p>{ gregDate }</p>
					<p>{ islamicDate }</p>
				{/if}
			</div>
		</div>
		<div class="wrapper">
			<div class="alert-wrapper" class:hidden={activeItem === ""} class:active={ activeSubtractedTime === 0 }>
				<div class="alert">
					{#if activeSubtractedTime === 0}
						It is time for { activeItem } { activeType }
					{:else if activeSubtractedTime > 0}
						{ activeItem } { activeType } was { activeSubtractedTime } minute{ activeSubtractedTime === 1 ? "" : "s"} ago
					{:else}
						{ activeItem } { activeType } is in { activeSubtractedTime*-1 } minute{ activeSubtractedTime === -1 ? "" : "s"}
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="prayer-container">
		<div class="item first">
			<div class="wrapper name">
				<p class="label">Prayer</p>
			</div>
			<div class="wrapper">
				<p class="label">Athan</p>
			</div>
			<div class="wrapper">
				<p class="label">Iqamah</p>
			</div>
		</div>
		{#if data !== null}
			{#each data as item}
				<div class="item" class:active={ item.id === activeItem && activeSubtractedTime !== 0 } class:pulse={ item.id === activeItem && activeSubtractedTime === 0 }>
					<div class="wrapper name">
						<p>{ item.name }</p>
					</div>
					<div class="wrapper">
						<p>{ item.start }</p>
					</div>
					<div class="wrapper">
						<p>{ item.iqamah }</p>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.card
	width: 100%
	height: 100%
	background-color: #27272A
	border-radius: 2vh
	padding: 3.5vh
	box-sizing: border-box
	transition: background-color 0.5s ease

	&.saver
		background-color: black !important
	
	.header-section
		display: flex
		flex-direction: column
		justify-content: center
		gap: 1vh
		margin-bottom: 5vh

		.header
			display: flex
			flex-direction: row
			justify-content: space-between

			h1
				font-size: 7vh

			.date-wrapper p
				font-size: 2.8vh
				text-transform: uppercase

		.alert-wrapper
			display: inline-flex
			flex-direction: row
			justify-content: center
			background-color: black
			box-shadow: -5px 7px 30px rgba(0, 0, 0, 0.3)
			padding: 1.2vh 2.5vh
			box-sizing: border-box
			border-radius: 5vh
			text-transform: uppercase
			font-weight: bold
			font-size: 3.5vh
			letter-spacing: 0.1vh
			transition: background-color 0.2s ease
			-webkit-transition: background-color 0.2s ease

			&.active
				background-color: #a3350a

			&.hidden
				display: none

			&::before
				content: "schedule"
				font-family: 'Material Symbols Outlined'
				font-weight: normal
				font-style: normal
				font-size: 3.5vh
				line-height: 1.1
				margin-right: 1.7vh
				letter-spacing: normal
				text-transform: none
				display: inline-block
				-moz-font-feature-settings: 'liga'
				-moz-osx-font-smoothing: grayscale

	
	.prayer-container
		display: flex
		flex-direction: column

		.item
			display: flex
			flex-direction: row
			justify-content: space-between
			padding: 2.2vh 2vh

			&.first
				padding: 0vh 2vh
				padding-bottom: 1vh

			&.active, &.pulse
				background: url("$lib/assets/pattern.png"), -webkit-linear-gradient(left, #128c3f 0%, #109e8e 100%)
				background: url("$lib/assets/pattern.png"), linear-gradient(left, #128c3f 0%, #109e8e 100%)
				border-radius: 1vh
				overflow: hidden
				box-shadow: -3px 6px 25px rgba(35, 191, 92, 0.4)
				text-shadow: 0px 0px 35px rgba(0,0,0,1)

			&.pulse
				animation: pulse 0.4s infinite alternate

			.wrapper.name
				width: 45%

			p
				font-size: 3.8vh

			.label
				text-transform: uppercase
				color: #adadad
				font-size: 2.5vh

@keyframes pulse
	0%
		opacity: 0.7
		transform: scale(1.04)
		-webkit-transform: scale(1.04)
	
	100%
		opacity: 1
		transform: scale(1)
		-webkit-transform: scale(1)

</style>