<script lang="ts">

    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

	import DownloadAppImage from "$lib/assets/promo-banners/get-app-banner.png";
	import ContributeAppImage from "$lib/assets/promo-banners/contribute.png";
	import PhoneSilentImage from "$lib/assets/promo-banners/phones-off.png";

    const images: string[] = [
        DownloadAppImage,
        ContributeAppImage,
        PhoneSilentImage
    ];

    let activeItem: string;
	let activeIndex: number = 0;
    let outroAnimation: boolean;
	const duration: number = 10000;

	$: activeItem = (activeIndex < images.length) ? images[activeIndex] : activeItem;

	onMount(() => animationCycle());

	function animationCycle() {
		setTimeout(() => {
			if (images !== null) {
				if ((activeIndex+1) >= images.length)
					activeIndex = 0;
				else
					activeIndex++;
			}
			animationCycle();
		}, duration);
	}

</script>

<div class="overflow">
    {#key activeItem}
         <div class="wrapper"
            in:fly={{ y: "-80%", duration: 1000, easing: quintOut }} 
            out:fly={{ y: "80%", duration: 1000, easing: quintOut }}
            on:outrostart={() => outroAnimation = true}
			class:out={ outroAnimation }>

            <!-- svelte-ignore a11y_missing_attribute -->
            <img src={ activeItem } />
         </div>
    {/key}
    <!-- {#if activeItem}
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
    {/if} -->
</div>

<style lang="sass">
.overflow
    width: 100%
    height: 170px
    overflow: hidden
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    position: relative

    .wrapper
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        position: absolute

        img
            width: 100%
            height: auto
            object-fit: contain
            object-position: center

        &.out
            position: absolute
</style>