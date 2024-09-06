<script lang="ts">
	import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { quintOut } from "svelte/easing";
    import { fly } from "svelte/transition";
	import { announcementStore } from "$lib/service";
	import type { Announcement } from "$lib/types";

	// Screensaver
	const screenSaverStore: Writable<boolean> = getContext("screenSaver");
	let isScreenSaver: boolean = false;
	screenSaverStore.subscribe(val => {
		isScreenSaver = val;
	});

	let data: Announcement[] = [];
	announcementStore.subscribe(val => {
		if (val !== null) 
			data = val;
	});

	let outroAnimation: boolean = true;
	let activeIndex: number = 0;
	let activeItem: Announcement;
	let duration: number = 8000;

	$: activeItem = (activeIndex < data.length) ? data[activeIndex] : activeItem;

	onMount(() => animationCycle());

	function animationCycle() {
		setTimeout(() => {
			if (data !== null) {
				if ((activeIndex+1) >= data.length)
					activeIndex = 0;
				else
					activeIndex++;
				duration = (data[activeIndex].description!.length*50 < duration) ? 8000 : (data[activeIndex].description!.length*50);
			}
			animationCycle();
		}, duration);
	}

	function parseDescription(text: string) {
		let parsedText = text;

		// Links
		const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
		parsedText = parsedText.replace(urlRegex, (url) => {
			const link = (url.match('^https?:\/\/')) ? url : 'http://' + url;
			const strippedUrl = url.replace(/(^\w+:|^)\/\//, '');
			return `<a href="${link}" target="_blank">${strippedUrl}</a>`;
		});

		return parsedText;
	}

	function scrollDescription(node: HTMLElement) {
		if (node.offsetHeight > node.parentElement!.offsetHeight) {
			node.style.transition = `transform ${duration - 6000}ms linear 3000ms`;
			node.style.transform = `translate3d(0px, -${node.clientHeight - node.parentElement!.clientHeight}px, 0px)`;
		}
	}

</script>


<div class="card" class:saver={isScreenSaver}>
	{#if data.length < 1}
		<div class="overflow centered">
			<div class="icon">campaign</div>
			<h1>There are currently no announcements. Future announcements will appear here.</h1>
		</div>
	{/if}
	<div class="overflow">
		{#if activeItem}
			{#key activeItem}
				<div class="announcement" 
					in:fly={{ x: "-100%", duration: 1000, easing: quintOut }} 
					out:fly={{ x: "100%", duration: 1000, easing: quintOut }}
					on:outrostart={() => outroAnimation = true}
					class:out={ outroAnimation }
					>
					<h1>{ activeItem.title }</h1>
					<div class="date-wrapper">
						{#if activeItem.timeStamp !== undefined} 
							{@const timeStamp = new Date(activeItem.timeStamp.seconds*1000)}
							{@const dateString = timeStamp.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}
							<div class="date">{ dateString }</div>
						{/if}
					</div>
					<div class="scroll-wrapper">
						{#if activeItem.description !== undefined}
							<p use:scrollDescription>{ @html parseDescription(activeItem.description) }</p>
						{/if}
					</div>
				</div>
			{/key}
		{/if}
	</div>
	<div class="dot-wrapper">
		{#if data}
			{#each data as _, i}
				<div class="dot" class:active={i === activeIndex}></div>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.card
	height: 100%
	background-color: #27272A
	border-radius: 2vh
	overflow: hidden
	display: flex
	flex-direction: column
	justify-content: space-between
	padding: 4.5vh
	box-sizing: border-box
	transition: background-color 0.5s ease

	&.saver
		background-color: black !important

	.dot-wrapper
		display: flex
		flex-direction: row
		margin-top: 2.8vh
		gap: 1.5vh

		.dot
			border-radius: 100%
			padding: 0.6vh
			background-color: rgba(255,255,255,0.2)
			transition: background-color 0.2s ease

			&.active
				background-color: rgba(255,255,255, 1)
	
	.overflow
		position: relative
		width: 100%
		flex-grow: 1
		display: flex
		flex-direction: row
		overflow: hidden

		&.centered
			height: 100%
			flex-direction: column
			align-items: center
			justify-content: center
			text-align: center
			gap: 2vh

			.icon
				font-family: 'Material Symbols Outlined'
				font-weight: normal
				font-style: normal
				font-size: 10vh
				line-height: 1
				margin-right: 1.7vh
				letter-spacing: normal
				text-transform: none
				display: inline-block
				-moz-font-feature-settings: 'liga'
				-moz-osx-font-smoothing: grayscale
				color: #9D9D9D
			h1
				color: #9D9D9D

	.announcement
		height: 100%
		width: 100%
		display: flex
		flex-direction: column
		align-items: flex-start

		&.out
			position: absolute

		h1
			font-size: 6vh

		.date-wrapper
			display: inline-flex
			flex-direction: row
			justify-content: center
			box-sizing: border-box
			text-transform: uppercase
			font-size: 2.3vh
			margin: 2vh 0

			&::before
				content: "today"
				font-family: 'Material Symbols Outlined'
				font-weight: normal
				font-style: normal
				font-size: 3vh
				line-height: 1
				margin-right: 1.7vh
				letter-spacing: normal
				text-transform: none
				display: inline-block
				-moz-font-feature-settings: 'liga'
				-moz-osx-font-smoothing: grayscale

		.scroll-wrapper
			width: 100%
			margin-top: 2vh
			overflow: hidden
			flex-grow: 1

			p
				font-size: 3vh
				line-height: 135%
				white-space: pre-wrap

				:global(a)
					color: #14B8A6 !important

	
</style>