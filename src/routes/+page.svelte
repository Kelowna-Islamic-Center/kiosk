<script lang="ts">
	import { FirebaseService } from "$lib/service";
	import { onMount, setContext } from "svelte";

	import Prayer from "./Prayer.svelte";
	import Announcements from "./Announcements.svelte";
    import { writable } from "svelte/store";

	import DownloadAppImage from "$lib/assets/icon_stores.png";

	const screenSaverStore = writable(true);
    setContext("screenSaver", screenSaverStore);

	let isScreenSaver: boolean = true;
	screenSaverStore.subscribe(val => {
		isScreenSaver = val;
	});

	onMount(() => {
		new FirebaseService();
	});

</script>

<svelte:head>
	<title>Kelowna Islamic Center - Web KIOSK</title>
</svelte:head>

<div class="scaler" class:saver={ isScreenSaver }>
	<div class="page">
		<div class="wrapper">
			<Prayer/>
		</div>
		<div class="wrapper">
			<Announcements />
			<img src="{ DownloadAppImage }" alt="Download KIC App">
		</div>
	</div>
</div>

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap')
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200")

:global(*)
	color: white
	margin: 0
	padding: 0
	font-family: "Roboto", sans-serif
	font-weight: 400 !important

:global(h1)
	font-weight: 300 !important

:global(body)
	background-color: black

.scaler
	transition: transform 0.8s ease

	.page
		display: flex
		flex-direction: row
		justify-content: stretch
		padding: 2vh
		box-sizing: border-box
		gap: 3vh

		.wrapper
			flex-grow: 1
			flex-basis: 0
			display: flex
			flex-direction: column
			justify-content: stretch
			align-items: stretch

			img
				width: 85%

	&.saver
		transform: scale(0.85)

		.page
			animation: screen-saver-ambient-movement 300s linear infinite alternate
			-webkit-animation: screen-saver-ambient-movement 300s linear infinite alternate

@keyframes screen-saver-ambient-movement
	0%
		transform: translate3d(0, 0, 0)

	25%
		transform: translate3d(-7vw, 0, 0)

	75%
		transform: translate3d(7vw, 0, 0)

	100%
		transform: translate3d(0, 0, 0)

</style>