<script lang="ts">
  import { onMount } from "svelte";

  const androidUrl = "https://play.google.com/store/apps/details?id=com.kelownamasjid.android.app&hl=en-US";
  const iosUrl = "https://apps.apple.com/us/app/kelowna-islamic-center/id1479503537";

  onMount(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/android/i.test(ua)) {
      // Android
      window.location.href = androidUrl;
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      // iOS
      window.location.href = iosUrl;
    }
  });
</script>

<h1>Get the Kelowna Islamic Center App</h1>
<p>If you are not redirected automatically, click one of the links below to download the app:</p>
<a href={androidUrl} target="_blank" rel="noopener noreferrer">Download for Android</a><br>
<a href={iosUrl} target="_blank" rel="noopener noreferrer">Download for iOS</a>

