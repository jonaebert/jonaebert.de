<script>
  export let words = ["Queer", "Solidarisch", "Gerecht", "Sozial", "Fair", "Stark", "Klar"];

  let currentWord = words[3];
  let nextWord = "";
  let isTransitioning = false;
  const timeout = 1750;
  let i = 0;

  function updateWords() {
    isTransitioning = true;
    nextWord = words[i];
    setTimeout(() => {
      currentWord = nextWord;
      i++;
      if (i === words.length) {
        i = 0;
      }
      isTransitioning = false;
      setTimeout(updateWords, timeout); // Dauer, wie lange jedes Wort angezeigt wird
    }, 750); // Dauer der Übergangszeit
  }
  
  setTimeout(updateWords, timeout);
</script>
  
<style lang="postcss">
  .fade {
    transition: opacity 1s ease-in-out;
  }
  .fade-in {
    opacity: 1;
  }
  .fade-out {
    opacity: 0;
  }
</style>
  
<h2 class="text-xl xl:text-2xl font-semibold text-primary-600 text-nowrap">
  Grün<span class="text-neutral-600">.</span> Gemeinsam<span class="text-neutral-600">.</span> <span class="fade text-sun-600" class:fade-in={!isTransitioning} class:fade-out={isTransitioning}>{currentWord}</span><span class="text-primary-600">.</span>
</h2>